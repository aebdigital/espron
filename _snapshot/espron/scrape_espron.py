from __future__ import annotations

import json
import os
import re
from collections import deque
from datetime import datetime, timezone
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse, urlunparse
import xml.etree.ElementTree as ET

BASE = "https://www.espron.sk"
OUT = Path(__file__).resolve().parent
HTML_DIR = OUT / "html"
TEXT_DIR = OUT / "text"

IMAGE_EXTS = (".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".avif")
SKIP_PREFIXES = ("mailto:", "tel:", "javascript:", "#")
SKIP_EXTS = {
    ".css",
    ".js",
    ".json",
    ".xml",
    ".txt",
    ".pdf",
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".svg",
    ".gif",
    ".avif",
    ".mp4",
    ".mov",
    ".webm",
}
NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}


def ensure_dirs() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    HTML_DIR.mkdir(parents=True, exist_ok=True)
    TEXT_DIR.mkdir(parents=True, exist_ok=True)
def normalize_url(url: str | None) -> str | None:
    if not url:
        return None
    url = url.strip()
    if not url or url.startswith(SKIP_PREFIXES):
        return None
    full = urljoin(BASE + "/", url)
    parsed = urlparse(full)
    if parsed.scheme not in ("http", "https"):
        return None
    if parsed.netloc not in ("www.espron.sk", "espron.sk"):
        return None
    path = parsed.path or "/"
    if path != "/" and path.endswith("/"):
        path = path[:-1]
    return urlunparse(("https", "www.espron.sk", path, "", "", ""))


def should_crawl(url: str) -> bool:
    parsed = urlparse(url)
    _, ext = os.path.splitext(parsed.path)
    return not ext or ext.lower() not in SKIP_EXTS


def clean_text(text: str) -> str:
    text = unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    # Tidy spaces before common punctuation inserted by joining inline fragments.
    text = re.sub(r"\s+([,.;:!?])", r"\1", text)
    return text


def unique_keep_order(items: list[str]) -> list[str]:
    seen = set()
    out: list[str] = []
    for item in items:
        if not item:
            continue
        if item not in seen:
            seen.add(item)
            out.append(item)
    return out


def is_image_url(url: str) -> bool:
    parsed = urlparse(url)
    low = parsed.path.lower()
    if "siteassets.parastorage.com/pages/pages/thunderbolt" in url.lower():
        return False
    return any(ext in low for ext in IMAGE_EXTS)


BLOCK_TAGS = {"p", "h1", "h2", "h3", "h4", "h5", "h6", "li", "blockquote"}


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ignore_depth = 0
        self.title_parts: list[str] = []
        self.title_depth = 0
        self.header_depth = 0
        self.footer_depth = 0
        self.nav_depth = 0
        self.links: list[dict[str, str]] = []
        self.images: list[dict[str, str]] = []
        self.text_chunks: list[str] = []
        self.nav_text_chunks: list[str] = []
        self.current_link: dict[str, str | list[str]] | None = None
        self.meta_description = ""
        self.og_title = ""
        self.og_description = ""
        self.canonical = ""
        self.block_stack: list[list[str]] = []

    def region(self) -> str:
        if self.nav_depth:
            return "nav"
        if self.header_depth:
            return "header"
        if self.footer_depth:
            return "footer"
        return "body"

    def flush_block(self) -> None:
        if not self.block_stack:
            return
        parts = self.block_stack.pop()
        joined = clean_text(" ".join(parts))
        if not joined or len(joined) < 2:
            return
        region = self.region()
        if region == "nav":
            self.nav_text_chunks.append(joined)
        elif region == "body":
            self.text_chunks.append(joined)

    def append_text(self, text: str) -> None:
        if self.block_stack:
            self.block_stack[-1].append(text)
            return
        region = self.region()
        if region == "nav":
            self.nav_text_chunks.append(text)
        elif region == "body":
            self.text_chunks.append(text)

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = dict(attrs)
        if tag in {"script", "style", "noscript", "svg"}:
            self.ignore_depth += 1
            return
        if tag == "title":
            self.title_depth += 1
            return
        if tag == "header":
            self.header_depth += 1
        elif tag == "footer":
            self.footer_depth += 1
        elif tag == "nav":
            self.nav_depth += 1

        if tag == "meta":
            name = (attr_map.get("name") or "").lower()
            prop = (attr_map.get("property") or "").lower()
            content = clean_text(attr_map.get("content") or "")
            if name == "description" and content:
                self.meta_description = content
            elif prop == "og:title" and content:
                self.og_title = content
            elif prop == "og:description" and content:
                self.og_description = content
            return

        if tag == "link":
            rel = (attr_map.get("rel") or "").lower()
            href = attr_map.get("href") or ""
            if "canonical" in rel and href:
                self.canonical = href.strip()
            return

        if tag == "br" and self.block_stack:
            self.block_stack[-1].append("\n")
            return

        if tag in BLOCK_TAGS:
            self.block_stack.append([])

        if tag == "a":
            self.current_link = {
                "href": normalize_url(attr_map.get("href")),
                "text_parts": [],
                "region": self.region(),
            }
            return

        if tag in {"img", "source"}:
            candidates: list[str] = []
            for key in ("src", "data-src", "data-image", "content", "poster"):
                value = attr_map.get(key)
                if value:
                    candidates.append(value)
            alt = clean_text(attr_map.get("alt") or "")
            for candidate in candidates:
                if candidate:
                    self.images.append({"url": candidate.strip(), "alt": alt})

    def handle_endtag(self, tag: str) -> None:
        if tag in {"script", "style", "noscript", "svg"}:
            if self.ignore_depth:
                self.ignore_depth -= 1
            return
        if tag == "title":
            if self.title_depth:
                self.title_depth -= 1
            return
        if tag == "a" and self.current_link is not None:
            href = self.current_link["href"]
            text_parts = self.current_link["text_parts"]
            text = clean_text(" ".join(text_parts)) if isinstance(text_parts, list) else ""
            if isinstance(href, str) and href:
                self.links.append(
                    {
                        "href": href,
                        "text": text,
                        "region": str(self.current_link["region"]),
                    }
                )
            self.current_link = None

        if tag in BLOCK_TAGS:
            self.flush_block()

        if tag == "header" and self.header_depth:
            self.header_depth -= 1
        elif tag == "footer" and self.footer_depth:
            self.footer_depth -= 1
        elif tag == "nav" and self.nav_depth:
            self.nav_depth -= 1

    def handle_data(self, data: str) -> None:
        if self.ignore_depth:
            return
        text = clean_text(data)
        if not text:
            return
        if self.title_depth:
            self.title_parts.append(text)
            return
        if self.current_link is not None:
            text_parts = self.current_link["text_parts"]
            if isinstance(text_parts, list):
                text_parts.append(text)
        self.append_text(text)


def extract_image_urls(raw_html: str) -> list[str]:
    urls = re.findall(r"https?://[^\"'\s<>]+", raw_html)
    out: list[str] = []
    for url in urls:
        cleaned = url.rstrip(")>,")
        if is_image_url(cleaned):
            out.append(cleaned)
    return unique_keep_order(out)


def page_id_from_url(url: str) -> str:
    parsed = urlparse(url)
    path = parsed.path.strip("/")
    return path.replace("/", "__") if path else "home"


def parse_sitemap(xml_text: str) -> tuple[list[str], dict[str, str]]:
    root = ET.fromstring(xml_text)
    urls: list[str] = []
    lastmods: dict[str, str] = {}
    for node in root.findall("sm:url", NS):
        loc = node.findtext("sm:loc", default="", namespaces=NS).strip()
        lastmod = node.findtext("sm:lastmod", default="", namespaces=NS).strip()
        normalized = normalize_url(loc)
        if normalized:
            urls.append(normalized)
            lastmods[normalized] = lastmod
    return unique_keep_order(urls), lastmods


def load_manifest(path: Path) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    if not path.exists():
        raise FileNotFoundError(f"Manifest not found: {path}")
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        if not raw_line.strip():
            continue
        parts = raw_line.split("\t")
        if len(parts) < 3:
            continue
        rows.append({"page_id": parts[0], "url": parts[1], "lastmod": parts[2]})
    return rows


def build_report() -> dict:
    ensure_dirs()

    robots_path = OUT / "robots.txt"
    sitemap_index_path = OUT / "sitemap.xml"
    pages_sitemap_path = OUT / "pages-sitemap.xml"
    manifest_path = OUT / "url-manifest.tsv"

    robots_txt = robots_path.read_text(encoding="utf-8")
    sitemap_index_xml = sitemap_index_path.read_text(encoding="utf-8")
    pages_sitemap_xml = pages_sitemap_path.read_text(encoding="utf-8")

    sitemap_urls, lastmods = parse_sitemap(pages_sitemap_xml)
    manifest_rows = load_manifest(manifest_path)
    visited: dict[str, dict] = {}
    crawl_order: list[str] = []
    all_image_urls: list[str] = []
    errors: list[dict[str, str]] = []

    for row in manifest_rows:
        url = normalize_url(row["url"])
        if not url or url in visited or not should_crawl(url):
            continue
        html_path = HTML_DIR / f"{row['page_id']}.html"
        if not html_path.exists():
            errors.append({"url": url, "error": f"Missing HTML file: {html_path}"})
            continue
        html = html_path.read_text(encoding="utf-8")

        parser = PageParser()
        parser.feed(html)
        parser.close()

        page_images: list[str] = []
        for item in parser.images:
            candidate = item["url"]
            if candidate.startswith("//"):
                candidate = "https:" + candidate
            elif candidate.startswith("/"):
                candidate = urljoin(BASE, candidate)
            if is_image_url(candidate):
                page_images.append(candidate)
        page_images.extend(extract_image_urls(html))
        page_images = unique_keep_order(page_images)
        all_image_urls.extend(page_images)

        internal_links = unique_keep_order([link["href"] for link in parser.links if link["href"]])

        page_id = row["page_id"]
        text_path = TEXT_DIR / f"{page_id}.txt"

        text_lines = unique_keep_order(
            [
                chunk
                for chunk in parser.text_chunks
                if chunk.lower() not in {"top of page", "bottom of page"} and len(chunk) > 1
            ]
        )
        text_path.write_text(
            "\n".join(text_lines) + ("\n" if text_lines else ""),
            encoding="utf-8",
        )

        visited[url] = {
            "url": url,
            "page_id": page_id,
            "title": clean_text(" ".join(parser.title_parts)),
            "meta_description": parser.meta_description,
            "og_title": parser.og_title,
            "og_description": parser.og_description,
            "canonical": parser.canonical,
            "lastmod": row["lastmod"] or lastmods.get(url, ""),
            "internal_links": internal_links,
            "nav_text": unique_keep_order(parser.nav_text_chunks),
            "link_texts": unique_keep_order([link["text"] for link in parser.links if link["text"]]),
            "images": page_images,
            "text_file": str(text_path),
            "html_file": str(html_path),
            "text_line_count": len(text_lines),
            "image_count": len(page_images),
        }
        crawl_order.append(url)

    all_image_urls = unique_keep_order(all_image_urls)
    (OUT / "images-all.txt").write_text(
        "\n".join(all_image_urls) + ("\n" if all_image_urls else ""),
        encoding="utf-8",
    )

    homepage = visited.get("https://www.espron.sk/") or visited.get("https://www.espron.sk")
    home_nav_text = homepage["nav_text"] if homepage else []
    home_nav_links = homepage["internal_links"] if homepage else []
    home_nav_link_texts = homepage["link_texts"] if homepage else []
    discovered_internal_urls = unique_keep_order(
        [
            link
            for url in crawl_order
            for link in visited[url]["internal_links"]
            if should_crawl(link)
        ]
    )

    header_nav = {
        "Domov": ["https://www.espron.sk/"],
        "O nás": ["https://www.espron.sk/o-nas"],
        "Stavebné práce": [
            "https://www.espron.sk/zateplenie-fasady",
            "https://www.espron.sk/sadrokartonove-prace",
            "https://www.espron.sk/rucne-omietky",
        ],
        "Architektonické služby": ["https://www.espron.sk/interierovy-dizajn"],
        "Čistiace práce": [
            "https://www.espron.sk/tepovanie",
            "https://www.espron.sk/cistenie-fasady",
            "https://www.espron.sk/cistenie-dlazby",
        ],
        "Kontakt": ["https://www.espron.sk/kontakt"],
    }
    header_nav_urls = {url for urls in header_nav.values() for url in urls}
    extra_vs_header = [url for url in crawl_order if url not in header_nav_urls]
    extra_not_in_sitemap = [url for url in discovered_internal_urls if url not in sitemap_urls]
    (OUT / "extra-discovered-urls.txt").write_text(
        "\n".join(extra_not_in_sitemap) + ("\n" if extra_not_in_sitemap else ""),
        encoding="utf-8",
    )

    summary = {
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "base_url": BASE,
        "robots_path": str(robots_path),
        "sitemap_index_path": str(sitemap_index_path),
        "pages_sitemap_path": str(pages_sitemap_path),
        "manifest_path": str(manifest_path),
        "total_pages_crawled": len(visited),
        "sitemap_page_count": len(sitemap_urls),
        "extra_pages_not_in_header_nav": extra_vs_header,
        "extra_pages_not_in_sitemap": extra_not_in_sitemap,
        "unique_image_count": len(all_image_urls),
        "unique_image_list_path": str(OUT / "images-all.txt"),
        "homepage_nav_text_order": home_nav_text,
        "homepage_nav_link_texts": home_nav_link_texts,
        "homepage_nav_urls": home_nav_links,
        "header_navigation_confirmed": header_nav,
        "errors": errors,
        "pages": [visited[url] for url in crawl_order],
    }
    (OUT / "espron-scrape.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    markdown_lines = [
        "# ESPRON.sk scrape report",
        "",
        f"- Generated UTC: {summary['generated_at_utc']}",
        f"- Base URL: {BASE}",
        f"- Sitemap pages: {len(sitemap_urls)}",
        f"- Total crawled same-domain pages: {len(visited)}",
        f"- Unique image URLs found: {len(all_image_urls)}",
        "",
        "## Header navigation",
        "- Domov -> https://www.espron.sk",
        "- O nás -> https://www.espron.sk/o-nas",
        "- Stavebné práce -> Zatepľovacie práce, Sadrokartónové práce, Ručné omietky",
        "- Architektonické služby -> Interiérový dizajn",
        "- Čistiace práce -> Tepovanie, Čistenie fasády, Čistenie dlažby",
        "- Kontakt -> https://www.espron.sk/kontakt",
        "",
        "## Extra pages beyond the header navigation",
    ]

    if extra_vs_header:
        for url in extra_vs_header:
            page = visited.get(url, {})
            markdown_lines.append(f"- {url} :: {page.get('title', '')}")
    else:
        markdown_lines.append("- None found.")

    markdown_lines.extend(
        [
            "",
            "## Same-domain pages found that are not in pages-sitemap.xml",
        ]
    )
    if extra_not_in_sitemap:
        for url in extra_not_in_sitemap:
            page = visited.get(url, {})
            markdown_lines.append(f"- {url} :: {page.get('title', '')}")
    else:
        markdown_lines.append("- None found in the crawl beyond the pages sitemap URLs.")

    markdown_lines.extend(["", "## Page inventory"])
    for url in crawl_order:
        page = visited[url]
        markdown_lines.append(f"### {url}")
        if page["title"]:
            markdown_lines.append(f"- Title: {page['title']}")
        if page["meta_description"]:
            markdown_lines.append(f"- Meta description: {page['meta_description']}")
        if page["lastmod"]:
            markdown_lines.append(f"- Last modified (sitemap): {page['lastmod']}")
        markdown_lines.append(f"- Images found: {page['image_count']}")
        markdown_lines.append(f"- Internal links found: {len(page['internal_links'])}")
        markdown_lines.append(f"- Text extract: {page['text_file']}")
        markdown_lines.append(f"- Raw HTML: {page['html_file']}")
        if page["images"]:
            markdown_lines.append("- First image URLs:")
            for image in page["images"][:25]:
                markdown_lines.append(f"  - {image}")
            if len(page["images"]) > 25:
                markdown_lines.append(f"  - ... and {len(page['images']) - 25} more")
        markdown_lines.append("")

    (OUT / "espron-report.md").write_text(
        "\n".join(markdown_lines).rstrip() + "\n",
        encoding="utf-8",
    )

    return {
        "pages_crawled": len(visited),
        "sitemap_pages": len(sitemap_urls),
        "extra_not_in_header_nav": extra_vs_header,
        "extra_not_in_sitemap": extra_not_in_sitemap,
        "unique_image_count": len(all_image_urls),
        "errors": errors,
        "report_path": str(OUT / "espron-report.md"),
        "json_path": str(OUT / "espron-scrape.json"),
    }


if __name__ == "__main__":
    print(json.dumps(build_report(), ensure_ascii=False, indent=2))
