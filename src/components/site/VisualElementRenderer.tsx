import type { CSSProperties } from "react";
import type { VisualElement } from "@/lib/cms-visual-pages";
import BuilderContactForm, {
  type BuilderContactField,
} from "./BuilderContactForm";

const NUMERIC_STYLE_KEYS = new Set([
  "fontSize",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "borderRadius",
  "borderWidth",
  "gap",
  "minHeight",
  "height",
]);

function toCssStyle(
  style: Record<string, string> | undefined,
): CSSProperties {
  if (!style) return {};
  const out: Record<string, string | number> = {};
  for (const [key, raw] of Object.entries(style)) {
    if (raw === "" || raw === undefined || raw === null) continue;
    if (key === "blockAlign") continue; // handled below
    if (NUMERIC_STYLE_KEYS.has(key)) {
      const num = Number(raw);
      if (!Number.isNaN(num)) {
        out[key] = `${num}px`;
        continue;
      }
    }
    out[key] = raw;
  }

  // Apply block alignment via horizontal auto margins.
  // center → both auto; right → left auto only; left → default (no-op).
  const blockAlign = style.blockAlign;
  if (blockAlign === "center") {
    out.marginLeft = "auto";
    out.marginRight = "auto";
  } else if (blockAlign === "right") {
    out.marginLeft = "auto";
  }

  return out as CSSProperties;
}

function renderElement(el: VisualElement): React.ReactNode {
  const style = toCssStyle(el.style);

  switch (el.type) {
    case "heading": {
      const Tag = (el.level ?? "h2") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return (
        <Tag key={el.id} style={style}>
          {el.content ?? ""}
        </Tag>
      );
    }
    case "paragraph":
      return (
        <p key={el.id} style={style}>
          {el.content ?? ""}
        </p>
      );
    case "button": {
      const wrapAlign =
        el.style?.blockAlign === "center"
          ? "center"
          : el.style?.blockAlign === "right"
            ? "right"
            : undefined;
      return (
        <div
          key={el.id}
          style={{ marginTop: style.marginTop, marginBottom: style.marginBottom, textAlign: wrapAlign }}
        >
          <button
            style={{ ...style, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, display: "inline-block" }}
            type="button"
          >
            {el.content ?? ""}
          </button>
        </div>
      );
    }
    case "badge": {
      const wrapAlign =
        el.style?.blockAlign === "center"
          ? "center"
          : el.style?.blockAlign === "right"
            ? "right"
            : undefined;
      return (
        <div
          key={el.id}
          style={{ marginTop: style.marginTop, marginBottom: style.marginBottom, textAlign: wrapAlign }}
        >
          <span style={{ ...style, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, display: "inline-block" }}>
            {el.content ?? ""}
          </span>
        </div>
      );
    }
    case "image":
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <img
          key={el.id}
          src={el.src ?? ""}
          alt={el.alt ?? ""}
          style={style}
        />
      );
    case "divider":
      return <hr key={el.id} style={style} />;
    case "spacer":
      return <div key={el.id} style={style} aria-hidden="true" />;
    case "container":
      return (
        <div key={el.id} style={style}>
          {(el.children ?? []).map(renderElement)}
        </div>
      );
    case "contactForm": {
      const cf = el as VisualElement & {
        fields?: BuilderContactField[];
        subject?: string;
        buttonText?: string;
        successTitle?: string;
        successMessage?: string;
      };
      return (
        <BuilderContactForm
          key={el.id}
          fields={Array.isArray(cf.fields) ? cf.fields : []}
          subject={cf.subject}
          buttonText={cf.buttonText}
          successTitle={cf.successTitle}
          successMessage={cf.successMessage}
          style={style}
        />
      );
    }
    default:
      return null;
  }
}

export function VisualElementTree({ elements }: { elements: VisualElement[] }) {
  return <>{elements.map(renderElement)}</>;
}
