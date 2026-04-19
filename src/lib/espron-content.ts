import "server-only";

import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  CONTACT_INFO,
  PAGE_OVERRIDES,
  type PageFamily,
} from "@/lib/site-navigation";

type ScrapedPage = {
  url: string;
  title: string;
  meta_description: string;
  images: string[];
  text_file: string;
  lastmod: string;
};

type ScrapeSnapshot = {
  pages: ScrapedPage[];
};

export type ContentPair = {
  title: string;
  body: string;
};

export type ContentStep = {
  title: string;
  body?: string;
  details?: string[];
};

export type ContentBlock =
  | {
      type: "paragraphs";
      title: string;
      paragraphs: string[];
    }
  | {
      type: "raw";
      title: string;
      items: string[];
    }
  | {
      type: "pairs";
      title: string;
      items: ContentPair[];
    }
  | {
      type: "steps";
      title: string;
      items: ContentStep[];
    }
  | {
      type: "facts";
      title: string;
      items: Array<{
        label: string;
        value: string;
      }>;
    }
  | {
      type: "faq";
      title: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
    };

export type SitePage = {
  path: string;
  label: string;
  eyebrow: string;
  family: PageFamily;
  title: string;
  metaTitle: string;
  description: string;
  lastmod: string;
  heroImage?: string;
  galleryImages: string[];
  highlights: string[];
  blocks: ContentBlock[];
  related: Array<{
    href: string;
    label: string;
    description: string;
  }>;
};

const SNAPSHOT_PATH = path.join(
  process.cwd(),
  "_snapshot",
  "espron",
  "espron-scrape.json",
);

const CMS_PAGES_DIR = path.join(process.cwd(), "_cms_pages");

const SHAPE_IMAGE_PATTERN = /\/shapes\//i;

const NOISE_LINES = new Set([
  "Chcem nezáväznú cenovú ponuku",
  "Hodnotenie na google",
  "Napíšte nám",
  "Naše kontaktné informácie",
  "Domov",
]);

const FAQ_ANSWERS: Record<string, string> = {
  "Realizujete zateplenie fasád po celom Slovensku?":
    "Áno. Zo source obsahu vyplýva, že ESPRON realizuje zateplenia po celom Slovensku a pri viacerých lokalitách výslovne uvádza dochádzanie bez príplatkov.",
  "Môžem si zateplenie realizovať svojpomocne, alebo je lepšie najať firmu?":
    "Svojpomoc je možná, ale firma odporúča profesionálnu realizáciu kvôli záruke, správnemu technologickému postupu a nižšiemu riziku tepelných mostov alebo prasklín.",
  "Za ako dlho zateplíte rodinný dom?":
    "Presný termín závisí od plochy, materiálu a počasia. V obsahu sa opakovane uvádza, že najskôr sa spracuje cenová ponuka a následne sa dohodne konkrétny realizačný termín.",
  "Zatepľujete aj staršie domy? Aké sú obmedzenia?":
    "Áno. Viaceré realizácie pracujú práve so staršími domami. Treba však rátať s tým, že sa môžu objaviť dodatočné opravy omietky, balkónov, striešok alebo iných detailov.",
  "Prečo je zateplenie staršieho domu často drahšie ako pri novostavbe?":
    "Staršie stavby často vyžadujú sanáciu podkladu, opravy poškodených prvkov a viac času na prípravu. Práve tieto neviditeľné práce navýšia rozsah realizácie.",
  "Aké materiály používate pri zateplení fasády?":
    "Na starom webe sa opakujú dva hlavné varianty: EPS polystyrén a minerálna vlna. Výber závisí od požiadaviek na tepelnú izoláciu, požiarnu odolnosť, priestor a rozpočet.",
  "Ako prebieha zatepľovanie krok za krokom?":
    "Zjednodušene ide o prípravu podkladu, lepenie izolantu, kotvenie, profily a rohy, sieťku s lepidlom, penetráciu a finálnu omietku.",
  "Je nutná príprava fasády pred zateplením?":
    "Áno. V pôvodnom obsahu sa veľký dôraz kladie na kontrolu pôvodnej omietky, opravu podkladu, čistenie stien a odstránenie nesúdržných vrstiev.",
  "Ako sa meria plocha fasády pre určenie ceny?":
    "Firma si pri cenovej ponuke pýta orientačnú plochu fasády, lokalitu, typ izolácie a fotografie. Presné nacenenie sa následne dolaďuje podľa konkrétneho domu.",
  "Čo všetko je zahrnuté v cene prác?":
    "Na hlavnej stránke zateplenia sú v cene uvedené lešenie, zakrytie okien a dlažby, odvoz odpadu, lepenie izolantu, kotvenie, profily, sieťka, penetrácie aj finálna omietka.",
  "Môžem nalepiť nový polystyrén na starý?":
    "Obsah opakovane zdôrazňuje, že najprv treba preveriť stav pôvodnej vrstvy. Ak podklad nie je pevný a súdržný, stará vrstva sa musí odstrániť až na zdravý podklad.",
  "Bojím sa, že ma cena za zateplenie zruinuje. Koľko to bude stáť?":
    "Na webe sa objavujú orientačné ceny od približne 94 €/m² pri EPS a vyššie pri minerálnej vlne alebo rozšírených balíkoch. Presná suma závisí od domu, plochy a rozsahu prác.",
  "Robíte aj podhľady (tzv. štablóny)?":
    "Áno. V prípadovej štúdii z Hlohovca sa výslovne spomína vyhotovenie a zateplenie drevenej konštrukcie označenej ako štablón.",
};

const getSnapshot = cache(async (): Promise<ScrapeSnapshot> => {
  try {
    const raw = await fs.readFile(SNAPSHOT_PATH, "utf8");
    return JSON.parse(raw) as ScrapeSnapshot;
  } catch {
    return { pages: [] };
  }
});

const getTextLines = cache(async (filePath: string): Promise<string[]> => {
  // Fix local absolute paths from the scrape JSON to work in any environment
  const safePath = filePath.includes("_snapshot")
    ? path.join(process.cwd(), "_snapshot", filePath.split("_snapshot")[1])
    : filePath;

  const raw = await fs.readFile(safePath, "utf8");
  return normalizeLines(raw.split(/\r?\n/));
});

function normalizeLines(lines: string[]): string[] {
  const cleaned = lines
    .map((line) =>
      line
        .replace(/\u200b/g, "")
        .replace(/​​/g, "")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean)
    .filter((line) => !NOISE_LINES.has(line));

  const merged: string[] = [];
  for (const line of cleaned) {
    const previous = merged.at(-1);
    if (!previous) {
      merged.push(line);
      continue;
    }

    if (line === ":") {
      merged[merged.length - 1] = `${previous}:`;
      continue;
    }

    if (
      previous.length <= 4 &&
      /[A-Za-zÀ-ž]$/.test(previous) &&
      /^[a-zà-ž]/.test(line)
    ) {
      merged[merged.length - 1] = `${previous}${line}`;
      continue;
    }

    merged.push(line);
  }

  return merged;
}

function routeFromUrl(url: string): string {
  const pathname = new URL(url).pathname;
  return pathname === "" ? "/" : pathname;
}

function collapseLines(lines: string[]): string {
  return lines.join(" ").replace(/\s+/g, " ").trim();
}

function stripFooter(lines: string[]): string[] {
  const footerIndex = lines.findIndex((line) => line === "Adresa");
  return footerIndex >= 0 ? lines.slice(0, footerIndex) : lines;
}

function sectionIndex(lines: string[], matcher: string | RegExp): number {
  if (typeof matcher === "string") {
    return lines.findIndex((line) => line.includes(matcher));
  }
  return lines.findIndex((line) => matcher.test(line));
}

function firstImage(images: string[]): string | undefined {
  return images.find(
    (image) => !SHAPE_IMAGE_PATTERN.test(image) && !image.endsWith(".svg"),
  );
}

function galleryImages(images: string[]): string[] {
  return images
    .filter((image) => !SHAPE_IMAGE_PATTERN.test(image))
    .slice(0, 6);
}

function isTopLevelStep(line: string): boolean {
  return /^\d+\.\s/.test(line);
}

function parseTopLevelSteps(lines: string[]): ContentStep[] {
  const items: ContentStep[] = [];
  let current: ContentStep | null = null;

  for (const line of lines) {
    if (isTopLevelStep(line)) {
      if (current) {
        items.push(current);
      }
      current = {
        title: line.replace(/^\d+\.\s*/, "").trim(),
        details: [],
      };
      continue;
    }

    if (!current) {
      continue;
    }

    current.details ??= [];
    current.details.push(line);
  }

  if (current) {
    items.push(current);
  }

  return items.map((item) => ({
    title: item.title,
    body: item.details?.length ? item.details[0] : undefined,
    details: item.details?.slice(1) ?? [],
  }));
}

function parseFacts(lines: string[]): Array<{ label: string; value: string }> {
  const items: Array<{ label: string; value: string }> = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const next = lines[index + 1];

    if (!next) {
      continue;
    }

    if (next.startsWith(":")) {
      items.push({
        label: line.replace(/:$/, "").trim(),
        value: next.replace(/^:\s*/, "").trim(),
      });
      index += 1;
    }
  }
  return items;
}

function isStandaloneTitle(line: string): boolean {
  return (
    line.length < 72 &&
    !/[.!?]$/.test(line) &&
    !line.includes("EUR") &&
    !line.includes("€/") &&
    !line.startsWith("–") &&
    !line.startsWith("•") &&
    !line.startsWith("✅")
  );
}

function pairGrouped(lines: string[]): ContentPair[] {
  const items: ContentPair[] = [];
  let index = 0;

  while (index < lines.length) {
    const title = lines[index];
    const body: string[] = [];
    index += 1;

    while (index < lines.length) {
      const candidate = lines[index];
      if (body.length > 0 && isStandaloneTitle(candidate)) {
        break;
      }
      body.push(candidate);
      index += 1;
      if (body.length === 1 && index < lines.length && isStandaloneTitle(lines[index])) {
        break;
      }
    }

    items.push({
      title,
      body: collapseLines(body),
    });
  }

  return items.filter((item) => item.title && item.body);
}

function parseCityChecks(lines: string[]): ContentPair[] {
  const items: ContentPair[] = [];
  let current: ContentPair | null = null;

  for (const line of lines) {
    if (line.startsWith("✅")) {
      if (current) {
        items.push(current);
      }

      const cleaned = line.replace(/^✅\s*/, "");
      const [title, body] = cleaned.split("–");
      current = {
        title: title.trim(),
        body: body ? body.trim() : "",
      };
      continue;
    }

    if (!current) {
      continue;
    }

    current.body = current.body
      ? `${current.body} ${line}`.trim()
      : line.trim();
  }

  if (current) {
    items.push(current);
  }

  return items;
}

function parseInlineFaq(lines: string[]): Array<{ question: string; answer: string }> {
  return lines
    .map((line) => {
      const separator = line.indexOf("?");
      if (separator < 0) {
        return null;
      }
      const question = `${line.slice(0, separator + 1).trim()}`;
      const answer = line.slice(separator + 1).trim();
      if (!question || !answer) {
        return null;
      }
      return { question, answer };
    })
    .filter((item): item is { question: string; answer: string } => Boolean(item));
}

function rawBlock(title: string, items: string[]): ContentBlock | null {
  const filtered = items.filter(Boolean);
  if (filtered.length === 0) {
    return null;
  }
  return {
    type: "raw",
    title,
    items: filtered,
  };
}

function paragraphsBlock(title: string, paragraphs: string[]): ContentBlock | null {
  const filtered = paragraphs.filter(Boolean);
  if (filtered.length === 0) {
    return null;
  }
  return {
    type: "paragraphs",
    title,
    paragraphs: filtered,
  };
}

function stepsBlock(title: string, lines: string[]): ContentBlock | null {
  const items = parseTopLevelSteps(lines);
  if (items.length === 0) {
    return null;
  }
  return {
    type: "steps",
    title,
    items,
  };
}

function pairsBlock(title: string, lines: string[]): ContentBlock | null {
  const items = pairGrouped(lines);
  if (items.length === 0) {
    return null;
  }
  return {
    type: "pairs",
    title,
    items,
  };
}

function buildAboutBlocks(lines: string[]): ContentBlock[] {
  const body = stripFooter(lines);
  const teamIndex = sectionIndex(body, "Náš tím odborníkov");
  const collaborationIndex = sectionIndex(body, "Tešíme sa na spoluprácu");
  const recentIndex = sectionIndex(body, "Nedávno dokončené projekty");

  return compactBlocks([
    paragraphsBlock("Ako ESPRON vznikol", body.slice(1, teamIndex)),
    teamIndex >= 0 && collaborationIndex >= 0
      ? {
          type: "pairs",
          title: "Náš tím odborníkov",
          items: pairGrouped(body.slice(teamIndex + 1, collaborationIndex)),
        }
      : null,
    collaborationIndex >= 0 && recentIndex >= 0
      ? rawBlock(
          "Služby, na ktoré sa dnes zameriavame",
          body.slice(collaborationIndex + 2, recentIndex),
        )
      : null,
    recentIndex >= 0
      ? rawBlock(
          "Nedávno dokončené projekty",
          body.slice(recentIndex + 1),
        )
      : null,
  ]);
}

function buildContactBlocks(lines: string[]): ContentBlock[] {
  const body = stripFooter(lines);
  return compactBlocks([
    {
      type: "facts",
      title: "Kontaktné údaje",
      items: [
        {
          label: "Adresa",
          value: `${CONTACT_INFO.company}, ${CONTACT_INFO.addressLines.join(", ")}`,
        },
        {
          label: "Telefón",
          value: CONTACT_INFO.phone,
        },
        {
          label: "E-mail",
          value: CONTACT_INFO.email,
        },
        {
          label: "Dostupnosť",
          value: CONTACT_INFO.hours,
        },
      ],
    },
    rawBlock("Čo nájdete na tejto stránke", body.slice(1)),
  ]);
}

function buildServiceBlocks(lines: string[]): ContentBlock[] {
  const body = stripFooter(lines);
  const coverageIndex = body.findIndex((line) => line.startsWith("Ponúkame"));
  const firstStepIndex = body.findIndex((line) => isTopLevelStep(line) || /^\d+\./.test(line));
  const benefitsIndex = body.findIndex((line) => line.startsWith("Prečo"));
  const priceIndex = body.findIndex((line) => line === "Cena" || line.includes("Cena "));
  const contactIndex = body.findIndex((line) => line.includes("Ako nás kontaktovať"));

  const introStart = Math.max(1, coverageIndex);
  const introEnd = [firstStepIndex, benefitsIndex, priceIndex, contactIndex]
    .filter((index) => index > introStart)
    .sort((left, right) => left - right)[0] ?? body.length;

  return compactBlocks([
    coverageIndex > 0
      ? rawBlock(
          "Kde službu realizujeme",
          body.slice(coverageIndex, Math.min(coverageIndex + 2, introEnd)),
        )
      : null,
    paragraphsBlock("O službe", body.slice(introStart, introEnd)),
    firstStepIndex >= 0 && benefitsIndex > firstStepIndex
      ? stepsBlock(
          "Ako prebieha realizácia",
          body.slice(firstStepIndex, benefitsIndex),
        )
      : null,
    benefitsIndex >= 0 && priceIndex > benefitsIndex
      ? pairsBlock(
          body[benefitsIndex],
          body.slice(benefitsIndex + 1, priceIndex),
        )
      : null,
    priceIndex >= 0 && contactIndex > priceIndex
      ? rawBlock("Orientačné ceny", body.slice(priceIndex + 1, contactIndex))
      : null,
    contactIndex >= 0
      ? rawBlock(
          "Čo nám poslať pre cenovú ponuku",
          body.slice(contactIndex + 1),
        )
      : null,
  ]);
}

function buildTepovanieBlocks(lines: string[]): ContentBlock[] {
  const body = stripFooter(lines);
  const situationsIndex = sectionIndex(body, "Spoznáte sa v niektorej z týchto situácií?");
  const processIndex = sectionIndex(body, "Ako prebieha prémiové tepovanie");
  const trustIndex = sectionIndex(body, "Prečo nám zveriť tepovanie");
  const priceIndex = sectionIndex(body, "Cena");
  const contactIndex = sectionIndex(body, "Ako nás kontaktovať?");

  return compactBlocks([
    paragraphsBlock("Rýchly prehľad služby", body.slice(1, situationsIndex)),
    situationsIndex >= 0 && processIndex > situationsIndex
      ? rawBlock(
          "Kto si nás najčastejšie volá",
          body.slice(situationsIndex + 1, processIndex),
        )
      : null,
    processIndex >= 0 && trustIndex > processIndex
      ? stepsBlock(
          "Ako prebieha prémiové tepovanie",
          body.slice(processIndex + 1, trustIndex),
        )
      : null,
    trustIndex >= 0 && priceIndex > trustIndex
      ? pairsBlock(
          "Prečo nám klienti zverujú tepovanie",
          body.slice(trustIndex + 1, priceIndex),
        )
      : null,
    priceIndex >= 0 && contactIndex > priceIndex
      ? rawBlock("Cenník", body.slice(priceIndex + 1, contactIndex))
      : null,
    contactIndex >= 0
      ? rawBlock(
          "Podklady k cenovej ponuke",
          body.slice(contactIndex + 1),
        )
      : null,
  ]);
}

function buildInsulationMainBlocks(lines: string[]): ContentBlock[] {
  const body = stripFooter(lines);
  const includedIndex = sectionIndex(body, "Všetky potrebné úkony v cene");
  const guaranteesIndex = sectionIndex(body, "S nami máte garanciu kvality");
  const bonusIndex = sectionIndex(body, "Prečo naši klienti milujú balík BEZSTAROSTNOSŤ");
  const packagesIndex = sectionIndex(body, "Jasné ceny bez skrytých poplatkov");
  const faqIndex = sectionIndex(body, "Často sa nás pýtate (FAQ)");
  const contactIndex = sectionIndex(body, "Máte záujem o cenovú ponuku na zateplenie fasády?");

  return compactBlocks([
    paragraphsBlock("Ako je služba postavená", body.slice(0, includedIndex)),
    guaranteesIndex >= 0 && bonusIndex > guaranteesIndex
      ? rawBlock(
          "Čo je zahrnuté v cene realizácie",
          body.slice(guaranteesIndex + 1, bonusIndex),
        )
      : null,
    bonusIndex >= 0 && packagesIndex > bonusIndex
      ? rawBlock(
          "Výhody balíka Bezstarostnosť",
          body.slice(bonusIndex + 1, packagesIndex),
        )
      : null,
    packagesIndex >= 0 && faqIndex > packagesIndex
      ? rawBlock("Balíky a cenové úrovne", body.slice(packagesIndex + 1, faqIndex))
      : null,
    faqIndex >= 0 && contactIndex > faqIndex
      ? {
          type: "faq",
          title: "Najčastejšie otázky z webu",
          items: parseInlineFaq(body.slice(faqIndex + 1, contactIndex)),
        }
      : null,
    contactIndex >= 0
      ? rawBlock(
          "Čo pripraviť pre cenovú ponuku",
          body.slice(contactIndex + 1),
        )
      : null,
  ]);
}

function buildCityBlocks(lines: string[]): ContentBlock[] {
  const body = stripFooter(lines);
  const regionIndex = Math.max(
    sectionIndex(body, "Pracujeme aj"),
    sectionIndex(body, "Pôsobíme aj"),
    sectionIndex(body, "Naša skúsenosť"),
  );
  const benefitIndex = Math.max(
    sectionIndex(body, "Čo získate spoluprácou s nami"),
    sectionIndex(body, "Prečo si vybrať práve nás"),
    sectionIndex(body, "Prečo sa oplatí"),
  );
  const priceIndex = Math.max(
    sectionIndex(body, "A čo cena?"),
    sectionIndex(body, "Cena zateplenia"),
  );
  const processIndex = Math.max(
    sectionIndex(body, "Ako to prebieha?"),
    sectionIndex(body, "Ako to celé prebieha"),
    sectionIndex(body, "Ako prebieha spolupráca"),
  );
  const contactTitleIndex = sectionIndex(body, "Napíšte nám");
  const emailIndex = body.findIndex((line) => line === CONTACT_INFO.email);
  const contactIndex =
    contactTitleIndex >= 0
      ? contactTitleIndex
      : emailIndex > processIndex
        ? emailIndex
        : -1;
  const contactContentIndex =
    contactTitleIndex >= 0 ? contactTitleIndex + 1 : contactIndex;
  const recentIndex = sectionIndex(body, "Nedávno dokončené zateplenia");
  const introEnd =
    regionIndex > 1 ? regionIndex : benefitIndex > 1 ? benefitIndex : body.length;
  const processEnd =
    contactIndex > processIndex
      ? contactIndex
      : recentIndex > processIndex
        ? recentIndex
        : body.length;
  const contactEnd =
    recentIndex > contactIndex && contactIndex >= 0 ? recentIndex : body.length;

  return compactBlocks([
    paragraphsBlock(
      body[0] ?? "Zateplenie fasády",
      body.slice(1, introEnd),
    ),
    regionIndex >= 0 && benefitIndex > regionIndex
      ? rawBlock(body[regionIndex], body.slice(regionIndex + 1, benefitIndex))
      : null,
    benefitIndex >= 0 && priceIndex > benefitIndex
      ? {
          type: "pairs",
          title: body[benefitIndex],
          items: parseCityChecks(body.slice(benefitIndex + 1, priceIndex)),
        }
      : null,
    priceIndex >= 0 && processIndex > priceIndex
      ? rawBlock(body[priceIndex], body.slice(priceIndex + 1, processIndex))
      : null,
    processIndex >= 0 && processEnd > processIndex
      ? rawBlock(body[processIndex], body.slice(processIndex + 1, processEnd))
      : null,
    contactIndex >= 0 && contactEnd > contactIndex
      ? rawBlock("Napíšte nám", body.slice(contactContentIndex, contactEnd))
      : null,
    recentIndex >= 0
      ? rawBlock("Nedávno dokončené zateplenia", body.slice(recentIndex + 1))
      : null,
  ]);
}

function buildCaseStudyBlocks(lines: string[]): ContentBlock[] {
  const body = stripFooter(lines);
  const infoIndex = sectionIndex(body, "Základné informácie");
  const firstStepIndex = body.findIndex((line) => isTopLevelStep(line));
  const summaryIndex = sectionIndex(body, "Zhrnutie");
  const galleryIndex = sectionIndex(body, "Premena fasády pred a po zateplení");

  return compactBlocks([
    infoIndex >= 0 && firstStepIndex > infoIndex
      ? {
          type: "facts",
          title: "Základné informácie",
          items: parseFacts(body.slice(infoIndex + 1, firstStepIndex)),
        }
      : null,
    paragraphsBlock(
      "Čomu sme čelili počas realizácie",
      body.slice(firstStepIndex > 0 ? firstStepIndex - 5 : 1, firstStepIndex),
    ),
    firstStepIndex >= 0 && summaryIndex > firstStepIndex
      ? stepsBlock(
          "Priebeh realizácie",
          body.slice(firstStepIndex, summaryIndex),
        )
      : null,
    summaryIndex >= 0 && galleryIndex > summaryIndex
      ? rawBlock("Zhrnutie a odporúčania z praxe", body.slice(summaryIndex + 1, galleryIndex))
      : null,
    galleryIndex >= 0
      ? rawBlock("Premena pred a po realizácii", body.slice(galleryIndex + 1))
      : null,
  ]);
}

function buildGuideBlocks(lines: string[]): ContentBlock[] {
  const body = stripFooter(lines);
  const toolsIndex = sectionIndex(body, "Odporúčané náradie a pomôcky");
  const summaryIndex = sectionIndex(body, "Zhrnutie");
  const recentIndex = sectionIndex(body, "Nedávno dokončené zateplenia");

  return compactBlocks([
    paragraphsBlock("Pre koho je tento postup", body.slice(1, toolsIndex)),
    toolsIndex >= 0
      ? rawBlock(
          "Odporúčané náradie a pomôcky",
          body.slice(toolsIndex + 1, body.findIndex((line) => isTopLevelStep(line))),
        )
      : null,
    stepsBlock(
      "Postup prác krok za krokom",
      body.slice(
        body.findIndex((line) => isTopLevelStep(line)),
        summaryIndex > 0 ? summaryIndex : recentIndex > 0 ? recentIndex : body.length,
      ),
    ),
    summaryIndex >= 0 && recentIndex > summaryIndex
      ? rawBlock("Zhrnutie", body.slice(summaryIndex + 1, recentIndex))
      : null,
    recentIndex >= 0
      ? rawBlock("Nedávno dokončené zateplenia", body.slice(recentIndex + 1))
      : null,
  ]);
}

function buildFaqBlocks(lines: string[]): ContentBlock[] {
  const body = stripFooter(lines);
  const questions = body.slice(2).filter((line) => line.endsWith("?"));
  return compactBlocks([
    paragraphsBlock("Prehľad témy", body.slice(0, 2)),
    {
      type: "faq",
      title: "Najčastejšie otázky",
      items: questions.map((question) => ({
        question,
        answer:
          FAQ_ANSWERS[question] ??
          "Túto tému sme prevzali zo starej stránky a v novom webe ju vieme ďalej rozšíriť pri ďalšej obsahovej iterácii.",
      })),
    },
  ]);
}

function buildStaffingBlocks(lines: string[]): ContentBlock[] {
  const body = stripFooter(lines);
  const benefitsIndex = sectionIndex(body, "Výhody");
  const priceIndex = sectionIndex(body, "Cena");
  return compactBlocks([
    paragraphsBlock("Ako funguje personálny leasing", body.slice(0, benefitsIndex)),
    benefitsIndex >= 0 && priceIndex > benefitsIndex
      ? pairsBlock("Výhody služby", body.slice(benefitsIndex + 1, priceIndex))
      : null,
    priceIndex >= 0
      ? rawBlock("Ako sa tvorí cena", body.slice(priceIndex + 1))
      : null,
  ]);
}

function compactBlocks(blocks: Array<ContentBlock | null>): ContentBlock[] {
  return blocks.filter((block): block is ContentBlock => Boolean(block));
}

function deriveHighlights(blocks: ContentBlock[]): string[] {
  const highlights: string[] = [];

  for (const block of blocks) {
    if (block.type === "facts") {
      for (const item of block.items) {
        highlights.push(`${item.label}: ${item.value}`);
      }
    }

    if (block.type === "pairs") {
      for (const item of block.items) {
        highlights.push(item.title);
      }
    }

    if (block.type === "raw") {
      for (const item of block.items) {
        if (item.length <= 80) {
          highlights.push(item);
        }
      }
    }

    if (highlights.length >= 4) {
      break;
    }
  }

  return highlights.slice(0, 4);
}

function buildBlocks(family: PageFamily, lines: string[]): ContentBlock[] {
  switch (family) {
    case "about":
      return buildAboutBlocks(lines);
    case "contact":
      return buildContactBlocks(lines);
    case "service":
      return buildServiceBlocks(lines);
    case "tepovanie":
      return buildTepovanieBlocks(lines);
    case "insulation-main":
      return buildInsulationMainBlocks(lines);
    case "insulation-city":
      return buildCityBlocks(lines);
    case "insulation-case-study":
      return buildCaseStudyBlocks(lines);
    case "insulation-guide":
      return buildGuideBlocks(lines);
    case "faq":
      return buildFaqBlocks(lines);
    case "staffing":
      return buildStaffingBlocks(lines);
  }
}

/**
 * Load pages from `_cms_pages/*.json` — each file is a SitePage JSON exported
 * from the CMS Espron Page Builder. These take priority over scraped pages with
 * the same path.
 */
async function loadCmsPages(): Promise<SitePage[]> {
  try {
    const entries = await fs.readdir(CMS_PAGES_DIR);
    const jsonFiles = entries.filter((f) => f.endsWith(".json"));

    const pages = await Promise.all(
      jsonFiles.map(async (file) => {
        const raw = await fs.readFile(path.join(CMS_PAGES_DIR, file), "utf8");
        const parsed = JSON.parse(raw) as SitePage;
        parsed.related = (parsed.related ?? []).map((item) => ({
          href: item.href,
          label: item.label,
          description:
            item.description ??
            RELATED_DESCRIPTION_FALLBACKS[item.href] ??
            "",
        }));
        return parsed;
      }),
    );

    return pages.filter((p) => p.path && p.label);
  } catch {
    // Directory doesn't exist yet — return empty
    return [];
  }
}

const RELATED_DESCRIPTION_FALLBACKS: Record<string, string> = {
  "/o-nas":
    "Prečítajte si, ako vznikol ESPRON a kto stojí za realizáciami v teréne.",
  "/kontakt":
    "Napíšte nám — cenovú ponuku pripravíme do 48 hodín, bez marketingových fráz.",
  "/zateplenie-fasady":
    "Kompletné zateplenie fasády s dôrazom na dlhú životnosť a férový postup.",
  "/zateplenie-fasady/svojpomocne":
    "Praktický návod pre tých, ktorí uvažujú nad zateplením vlastnými rukami.",
  "/zateplenie-fasady/faq":
    "Najčastejšie otázky a odpovede k zatepleniu fasády rodinných domov.",
  "/zateplenie-fasady/mineralna-vlna":
    "Prípadová štúdia zateplenia rodinného domu minerálnou vlnou v Hlohovci.",
  "/zateplenie-fasady/polystyren-biely-sivy":
    "Prípadová štúdia zateplenia fasády polystyrénom v Trnave.",
  "/zateplenie-fasady/bratislava":
    "Zateplenie rodinných a bytových domov v Bratislave a okolí bez príplatkov.",
  "/zateplenie-fasady/kosice":
    "Férové zateplenie domov v Košiciach — s odborne spôsobilým stavbyvedúcim.",
  "/zateplenie-fasady/nitra":
    "Zateplenie domov v Nitre a na západnom Slovensku, ponuka do 48 hodín.",
  "/zateplenie-fasady/trencin":
    "Zateplenie v Trenčíne a okolí — skúsenosti zo západného Slovenska.",
  "/zateplenie-fasady/trnava":
    "Zateplenie fasády v Trnave a okolí, s realizáciami priamo v meste.",
  "/sadrokartonove-prace":
    "Sadrokartónové priečky, podhľady a obklady s precíznym prevedením.",
  "/rucne-omietky":
    "Ručné omietky — tradičné spracovanie s čistým, rovným výsledkom.",
  "/interierovy-dizajn":
    "Návrh interiéru od dispozície po finálny mood-board a realizáciu.",
  "/tepovanie":
    "Prémiové tepovanie sedačiek, kobercov a textilov s garanciou výsledku.",
  "/cistenie-fasady":
    "Čistenie fasády od machu, rias a nečistôt bez poškodenia omietky.",
  "/cistenie-dlazby":
    "Strojové čistenie dlažby — exteriér aj interiér, jedno-rázovo či pravidelne.",
};

function pickDescription(
  href: string,
  scrapedPageByPath: Map<string, ScrapedPage>,
): string {
  const scraped = scrapedPageByPath.get(href);
  const metaDescription = scraped?.meta_description?.trim();
  if (metaDescription) {
    return metaDescription;
  }
  return (
    RELATED_DESCRIPTION_FALLBACKS[href] ??
    "Otvoriť podstránku s naviazaným obsahom."
  );
}

export const getAllSitePages = cache(async (): Promise<SitePage[]> => {
  const snapshot = await getSnapshot();
  const pages: SitePage[] = [];
  const scrapedPageByPath = new Map<string, ScrapedPage>(
    snapshot.pages.map((entry) => [routeFromUrl(entry.url), entry]),
  );

  for (const scrapedPage of snapshot.pages) {
    const currentPath = routeFromUrl(scrapedPage.url);
    if (currentPath === "/") {
      continue;
    }

    const override = PAGE_OVERRIDES[currentPath];
    if (!override) {
      continue;
    }

    const lines = await getTextLines(scrapedPage.text_file);
    const blocks = buildBlocks(override.family, lines);
    const related = override.related
      .map((href) => {
        const relatedPage = PAGE_OVERRIDES[href];
        return relatedPage
          ? {
              href,
              label: relatedPage.label,
              description: pickDescription(href, scrapedPageByPath),
            }
          : null;
      })
      .filter(
        (item): item is { href: string; label: string; description: string } =>
          item !== null,
      );

    pages.push({
      path: currentPath,
      label: override.label,
      eyebrow: override.eyebrow,
      family: override.family,
      title: scrapedPage.title,
      metaTitle: scrapedPage.title,
      description: scrapedPage.meta_description,
      lastmod: scrapedPage.lastmod,
      heroImage: firstImage(scrapedPage.images),
      galleryImages: galleryImages(scrapedPage.images),
      highlights: deriveHighlights(blocks),
      blocks,
      related,
    });
  }

  // Merge in CMS-authored pages — they override scraped pages with the same path
  const cmsPages = await loadCmsPages();
  const cmsPathSet = new Set(cmsPages.map((p) => p.path));
  const scrapedPages = pages.filter((p) => !cmsPathSet.has(p.path));

  return [...scrapedPages, ...cmsPages].sort((left, right) =>
    left.path.localeCompare(right.path),
  );
});

export async function getSitePageByPath(currentPath: string): Promise<SitePage | undefined> {
  const pages = await getAllSitePages();
  return pages.find((page) => page.path === currentPath);
}

export async function getTopLevelSlugs(): Promise<string[]> {
  const pages = await getAllSitePages();
  return pages
    .filter(
      (page) =>
        page.path.split("/").filter(Boolean).length === 1 &&
        page.path !== "/zateplenie-fasady",
    )
    .map((page) => page.path.slice(1));
}

export async function getInsulationChildSlugs(): Promise<string[]> {
  const pages = await getAllSitePages();
  return pages
    .filter(
      (page) =>
        page.path.startsWith("/zateplenie-fasady/") &&
        page.path.split("/").filter(Boolean).length === 2,
    )
    .map((page) => page.path.split("/").at(-1) ?? "")
    .filter(Boolean);
}
