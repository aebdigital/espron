import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import FaqAccordion from "@/components/site/FaqAccordion";
import ServiceRealizationGallery from "@/components/site/ServiceRealizationGallery";
import { ZATEPLENIE_FASADY_REALIZATIONS } from "@/lib/legacy-gallery-data";
import { CONTACT_INFO } from "@/lib/site-navigation";
import type { ContentBlock, SitePage } from "@/lib/espron-content";
import { BeforeAfterGallery, HoverGallery } from "./CaseStudyGalleries";

type PageTemplateProps = {
  page: SitePage;
};

const KEYWORD_LINKS: Array<{ pattern: RegExp; href: string }> = [
  { pattern: /\bBratislav(?:a|e|u|y|ou|ským|skom|ská|ským)\b/g, href: "/zateplenie-fasady/bratislava" },
  { pattern: /\bKošíc|Košice|Košiciach\b/g, href: "/zateplenie-fasady/kosice" },
  { pattern: /\bNitr(?:a|e|u|y|ou|iansk\w*)\b/g, href: "/zateplenie-fasady/nitra" },
  { pattern: /\bTrenčín(?:a|e|u|om|sk\w*)?\b/g, href: "/zateplenie-fasady/trencin" },
  { pattern: /\bTrnav(?:a|e|u|y|ou|sk\w*)\b/g, href: "/zateplenie-fasady/trnava" },
  { pattern: /\bHlohovc(?:a|e|u|om)|Hlohovec\b/g, href: "/zateplenie-fasady/mineralna-vlna" },
];

type PolystyrenGalleryItem = {
  title: string;
  description?: string;
  alt: string;
  image: string;
};

const POLYSTYREN_HOVER_GALLERY: PolystyrenGalleryItem[] = [
  {
    title: "Pôvodný stav fasády pred zateplením",
    description:
      "Fotografia zachytáva prednú časť domu pred zateplením. Na balkónovej časti je viditeľná poškodená omietka, ktorá sa na niektorých miestach odlupovala. Na ostatných častiach fasády bola pôvodná omietka pevná, preto sme ju ponechali a pripravili na aplikáciu zatepľovacieho systému.",
    alt: "Predná časť domu pred zateplením, s viditeľne poškodenou omietkou na spodnej časti balkóna.",
    image:
      "https://static.wixstatic.com/media/b0408c_94f20bec0ce4428a9d3f7c7cdee546d6~mv2.webp",
  },
  {
    title: "Pôvodná bočná fasáda pred izoláciou",
    description:
      "Bočný pohľad na dom pred zateplením. Omietka na tejto strane bola v dobrom stave, bez viditeľných poškodení. Pred aplikáciou zatepľovacieho systému sme ju očistili a pripravili na lepenie izolačných dosiek.",
    alt: "Bočná strana domu pred zateplením s pevnou omietkou bez poškodení.",
    image:
      "https://static.wixstatic.com/media/b0408c_4674ae04a22b459e9cbc880d5934070f~mv2.webp",
  },
  {
    title: "Pôvodný stav fasády na prístavbe",
    description:
      "Fotografia zachytáva bočnú stenu domu zo susedovej strany. Spodná časť prístavby z Ytongu mala uvoľnenú omietku, ktorá sa odlupovala. Aby sme zabezpečili správnu priľnavosť izolácie, bolo potrebné omietku v tejto časti kompletne odstrániť.",
    alt: "Uvoľnená omietka na spodnej časti prístavby z Ytongu pred zateplením.",
    image:
      "https://static.wixstatic.com/media/b0408c_ea4fbdd6e2fd43ada17ad9e463e003c3~mv2.webp",
  },
];

const POLYSTYREN_BEFORE_AFTER_GALLERY: PolystyrenGalleryItem[] = [
  {
    title: "Pôvodná fasáda zpredu pred zateplením",
    alt: "Predná časť domu pred zateplením, s viditeľne poškodenou omietkou na spodnej časti balkóna.",
    image:
      "https://static.wixstatic.com/media/b0408c_94f20bec0ce4428a9d3f7c7cdee546d6~mv2.webp",
  },
  {
    title: "Fasáda zpredu po zateplení",
    alt: "Predná časť domu po zateplení bielym polystyrénom s jednotným a čistým vzhľadom fasády.",
    image:
      "https://static.wixstatic.com/media/b0408c_0ab96dc3302e4b68b020fa7511c4a782~mv2.webp",
  },
  {
    title: "Pôvodná bočná fasáda pred zateplením",
    alt: "Bočná strana domu pred zateplením s pôvodnou omietkou v dobrom stave.",
    image:
      "https://static.wixstatic.com/media/b0408c_4674ae04a22b459e9cbc880d5934070f~mv2.webp",
  },
  {
    title: "Bočná fasáda po zateplení",
    alt: "Bočná strana domu po zateplení bielym polystyrénom s esteticky hladkým povrchom.",
    image:
      "https://static.wixstatic.com/media/b0408c_a0e6ddc0956f4bef9e75ac8897362c01~mv2.webp",
  },
  {
    title: "Pôvodný stav fasády na prístavbe",
    alt: "Uvoľnená omietka na spodnej časti prístavby z Ytongu pred zateplením.",
    image:
      "https://static.wixstatic.com/media/b0408c_ea4fbdd6e2fd43ada17ad9e463e003c3~mv2.webp",
  },
  {
    title: "Fasáda prístavby po zateplení",
    alt: "Bočná stena prístavby po zateplení sivým polystyrénom pre optimálnu tepelnú izoláciu a úsporu miesta.",
    image:
      "https://static.wixstatic.com/media/b0408c_2c2a488af9a244dd897bea2d91a81ec7~mv2.webp",
  },
];

const MINERALNA_HOVER_GALLERY: PolystyrenGalleryItem[] = [
  {
    title: "Obitá omietka balkóna s odkrytou železnou konštrukciou",
    description:
      "Detail spodnej časti balkóna s odstránenou omietkou, odhaľujúcou pôvodnú železnú konštrukciu. Táto fáza ukazuje stav pred jej vystužením a aplikáciou sanačných materiálov.",
    alt: "Obitá omietka balkóna s odkrytou železnou konštrukciou",
    image: "/mineralna/Pôvodný balkón pred rekonštrukciou.avif",
  },
  {
    title: "Balkón pred rekonštrukciou s vyplnenou dierou v stene",
    description:
      "Pohľad na balkón zhora v pôvodnom stave pred začiatkom väčších rekonštrukčných prác. V stene je vidieť vyplnenú dieru lepiacou maltou, ktorá predznamenáva ďalšie úpravy.",
    alt: "Balkón pred rekonštrukciou s vyplnenou dieru v stene",
    image: "/mineralna/1.avif",
  },
  {
    title: "Detail obitej steny pod oknom balkóna po odstránení tehlového obkladu",
    description:
      "Detail obitej steny pod oknom balkóna, kde bol predtým tehlový obklad. Táto fáza prípravy odhaľuje stav muriva a pripravuje povrch na aplikáciu izolačného materiálu.",
    alt: "Detail obitej steny pod oknom balkóna",
    image: "/mineralna/2.avif",
  },
  {
    title: "Pokročilá fáza rekonštrukcie balkóna s natiahnutou lepiacou maltou",
    description:
      "Pokročilejšia fáza rekonštrukcie balkóna, kde je už natiahnutá lepiaca malta na stene po odstránení tehlového obkladu. Viditeľná je aj posledná odstránená časť pôvodných kachličiek na podlahe balkóna.",
    alt: "Pokročilá fáza rekonštrukcie balkóna s natiahnutou lepiacou maltou",
    image: "/mineralna/3.avif",
  },
];

const MINERALNA_BEFORE_AFTER_GALLERY: PolystyrenGalleryItem[] = [
  {
    title: "Pôvodná strieška pred rekonštrukciou",
    alt: "Pôvodná železná strieška nad vchodom v zlom technickom stave.",
    image: "/mineralna/Pôvodná strieška nad vchodovými dverami.avif",
  },
  {
    title: "Nová strieška po zateplení",
    alt: "Nová drevená strieška nad vchodom zateplená minerálnou vlnou a esteticky upravená.",
    image: "/mineralna/Nová strieška nad vchodovými dverami.avif",
  },
  {
    title: "Balkón pred rekonštrukciou",
    alt: "Pôvodný stav balkóna s poškodenou omietkou a skorodovanými prvkami.",
    image: "/mineralna/Pôvodný balkón pred rekonštrukciou.avif",
  },
  {
    title: "Balkón po rekonštrukcii",
    alt: "Kompletne zrekonštruovaný a zatepľovacím systémom upravený balkón.",
    image: "/mineralna/Opravený a zateplený balkón.avif",
  },
  {
    title: "Stena vedľa schodiska pred zateplením",
    alt: "Pôvodná brizolitová omietka na stene vedľa schodiska.",
    image: "/mineralna/Pôvodná stena vedľa schodiska.avif",
  },
  {
    title: "Stena vedľa schodiska po zateplení",
    alt: "Zateplená stena vedľa schodiska s novou silikónovou omietkou.",
    image: "/mineralna/Zateplená stena vedľa schodiska.avif",
  },
  {
    title: "Stena zo strany suseda pred zateplením",
    alt: "Pôvodná nezateplená stena domu zo susedovej strany.",
    image: "/mineralna/Pôvodná nezateplená stena zo susedovej strany.avif",
  },
  {
    title: "Stena zo strany suseda po zateplení",
    alt: "Zateplená stena domu zo susedovej strany minerálnou vlnou.",
    image: "/mineralna/Zateplená stena zo susedovej strany.avif",
  },
];


function linkifyText(text: string, currentPath: string): ReactNode {
  const matches: Array<{ start: number; end: number; href: string; text: string }> = [];
  const seenHrefs = new Set<string>([currentPath]);

  for (const { pattern, href } of KEYWORD_LINKS) {
    if (seenHrefs.has(href)) {
      continue;
    }
    pattern.lastIndex = 0;
    const match = pattern.exec(text);
    if (match) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        href,
        text: match[0],
      });
      seenHrefs.add(href);
    }
  }

  if (matches.length === 0) {
    return text;
  }

  matches.sort((left, right) => left.start - right.start);

  const nodes: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((match, index) => {
    if (match.start < cursor) {
      return;
    }
    if (match.start > cursor) {
      nodes.push(text.slice(cursor, match.start));
    }
    nodes.push(
      <Link
        key={`${match.href}-${index}`}
        href={match.href}
        className="text-primary underline decoration-primary/30 underline-offset-4 transition hover:decoration-primary"
      >
        {match.text}
      </Link>,
    );
    cursor = match.end;
  });
  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }
  return nodes;
}

function renderBlock(block: ContentBlock, currentPath: string) {
  if (block.type === "paragraphs") {
    return (
      <AnimateOnScroll key={block.title}>
        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-[0_12px_40px_rgba(15,29,74,0.05)] md:p-10">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
            Obsah
          </p>
          <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {block.title}
          </h2>
          <div className="mt-6 max-w-4xl space-y-4 text-base leading-8 text-foreground/78">
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph}>{linkifyText(paragraph, currentPath)}</p>
            ))}
          </div>
        </section>
      </AnimateOnScroll>
    );
  }

  if (block.type === "facts") {
    return (
      <section key={block.title} className="space-y-6">
        <AnimateOnScroll>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
              Fakty
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {block.title}
            </h2>
          </div>
        </AnimateOnScroll>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {block.items.map((item, index) => (
            <AnimateOnScroll key={item.label} delay={index * 70}>
              <div className="rounded-[1.75rem] border border-border bg-light p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/55">
                  {item.label}
                </p>
                <p className="mt-3 text-lg font-semibold leading-snug text-foreground">
                  {item.value}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>
    );
  }

  if (block.type === "pairs") {
    return (
      <section key={block.title} className="space-y-6">
        <AnimateOnScroll>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
              Prehľad
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {block.title}
            </h2>
          </div>
        </AnimateOnScroll>
        <div className="grid gap-4 md:grid-cols-2">
          {block.items.map((item, index) => (
            <AnimateOnScroll key={item.title} delay={index * 70}>
              <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_12px_36px_rgba(15,29,74,0.04)]">
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-foreground/72">
                  {item.body}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>
    );
  }

  if (block.type === "steps") {
    return (
      <section key={block.title} className="space-y-6">
        <AnimateOnScroll>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
              Postup
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {block.title}
            </h2>
          </div>
        </AnimateOnScroll>
        <div className="grid gap-4">
          {block.items.map((item, index) => (
            <AnimateOnScroll key={item.title} delay={index * 80}>
              <div className="grid gap-5 rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_12px_36px_rgba(15,29,74,0.04)] md:grid-cols-[84px_1fr]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  {item.body ? (
                    <p className="mt-3 text-sm leading-7 text-foreground/75">
                      {item.body}
                    </p>
                  ) : null}
                  {item.details && item.details.length > 0 ? (
                    <ul className="mt-4 space-y-2 text-sm leading-7 text-foreground/72">
                      {item.details.map((detail) => (
                        <li key={detail} className="flex gap-3">
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>
    );
  }

  if (block.type === "faq") {
    return (
      <section key={block.title} className="space-y-6">
        <AnimateOnScroll>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
              FAQ
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {block.title}
            </h2>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll delay={80}>
          <FaqAccordion items={block.items} />
        </AnimateOnScroll>
      </section>
    );
  }

  return (
    <AnimateOnScroll key={block.title}>
      <section className="rounded-[2rem] border border-border bg-light p-8 md:p-10">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
          Detaily
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {block.title}
        </h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {block.items.map((item) => (
            <li
              key={item}
              className="rounded-[1.2rem] border border-white/70 bg-white/80 px-5 py-4 text-sm leading-7 text-foreground/74"
            >
              {linkifyText(item, currentPath)}
            </li>
          ))}
        </ul>
      </section>
    </AnimateOnScroll>
  );
}

function PolystyrenSection({
  children,
  className = "",
  withRule = true,
}: {
  children: ReactNode;
  className?: string;
  withRule?: boolean;
}) {
  return (
    <AnimateOnScroll>
      <section
        className={`mx-auto w-[92%] max-w-[820px] py-12 text-primary md:py-16 ${
          withRule ? "border-t-2 border-primary/90" : ""
        } ${className}`}
      >
        {children}
      </section>
    </AnimateOnScroll>
  );
}

function PolystyrenHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-3xl font-semibold leading-tight tracking-tight text-primary md:text-[2.4rem]">
      {children}
    </h2>
  );
}

function PolystyrenParagraph({ children }: { children: ReactNode }) {
  return (
    <p className="text-[15px] leading-8 text-primary md:text-base">
      {children}
    </p>
  );
}


function PolystyrenCaseStudyBody({ page }: { page: SitePage }) {
  return (
    <div className="bg-white pb-12 pt-12 md:pt-16">
      <PolystyrenSection withRule={false} className="pb-20">
        <PolystyrenHeading>
          Zateplenie fasády polystyrénom v Trnave
        </PolystyrenHeading>
        <div className="mt-8 space-y-2 text-[15px] leading-8 text-primary md:text-base">
          <p className="font-semibold">Základné informácie</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Lokalita:</strong> Trnava
            </li>
            <li>
              <strong>Čas realizácie:</strong> August 2024
            </li>
            <li>
              <strong>Rozsah prác:</strong> cca 350 m² zateplenej plochy
            </li>
            <li>
              <strong>Použitý materiál:</strong> Biely a sivý polystyrén (15 cm
              hrúbka)
            </li>
          </ul>
        </div>
      </PolystyrenSection>

      <PolystyrenSection>
        <PolystyrenHeading>
          Letné zatepľovanie – výzvy, s ktorými treba počítať
        </PolystyrenHeading>
        <div className="mt-8 space-y-7">
          <PolystyrenParagraph>
            Zatepľovať v lete znie jednoducho, no v skutočnosti si to vyžaduje{" "}
            <strong>
              presné načasovanie, správnu prípravu a schopnosť reagovať na
              nečakané situácie.
            </strong>{" "}
            Presne tak to bolo aj pri tejto realizácii v Trnave.
          </PolystyrenParagraph>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-primary">
              🔥 Vysoké teploty
            </h3>
            <PolystyrenParagraph>
              Počas celej realizácie panovali{" "}
              <strong>typicky horúce podmienky západného Slovenska</strong>. V
              najteplejších dňoch vystúpili teploty až na{" "}
              <strong>38 °C</strong>, čo zásadne ovplyvňuje prácu s lepidlom,
              tmelmi a ďalšími materiálmi. Aby sme predišli{" "}
              <strong>zníženej priľnavosti a strate kvality</strong>, začínali
              sme s prácami už medzi <strong>5:00 a 6:00 ráno</strong> – v
              čase, keď je práca s materiálmi predvídateľná a riziko chýb
              minimálne.
            </PolystyrenParagraph>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-primary">
              ⛈ Nevyspytateľné búrky
            </h3>
            <PolystyrenParagraph>
              Aj keď počas celej zákazky prevládalo slnečné počasie, jedno
              popoludnie nás prekvapila <strong>prudká búrka</strong> – a,
              žiaľ, práve vo chvíli, keď bola čerstvo nanesená{" "}
              <strong>armovacia vrstva</strong>. Túto časť sme museli{" "}
              <strong>kompletne odstrániť a nanovo zhotoviť</strong>, čo
              predĺžilo realizáciu o niekoľko hodín. Aj to však patrí k realite
              letného zatepľovania –{" "}
              <strong>nie všetko sa dá ovplyvniť</strong>, ale na každú
              situáciu <strong>sme pripravení reagovať</strong>.
            </PolystyrenParagraph>
          </div>
          <p className="text-[15px] italic leading-8 text-primary md:text-base">
            💡 <strong>Tip:</strong> Pri letnom zatepľovaní je dôležité
            pravidelne sledovať predpoveď počasia, začínať s prácami skoro ráno
            a zabezpečiť ochranu čerstvo aplikovaných vrstiev pred dažďom.
          </p>
        </div>
      </PolystyrenSection>

      <PolystyrenSection>
        <PolystyrenHeading>
          1. Príprava podkladu a odstránenie starej omietky
        </PolystyrenHeading>
        <div className="mt-8 space-y-7">
          <PolystyrenParagraph>
            Pri tejto zákazke sme pracovali s dvoma odlišnými typmi podkladu.
          </PolystyrenParagraph>
          <ul className="list-disc space-y-6 pl-6 text-[15px] leading-8 text-primary md:text-base">
            <li>
              <strong>Tehlová časť domu:</strong> brizolitová omietka na
              tehlovom murive bola v{" "}
              <strong>dobrom stave a pevne spojená s podkladom</strong>. Po
              kontrole sme ju ponechali a povrch pripravili na nanesenie
              zatepľovacieho systému.
            </li>
            <li>
              <strong>Prístavba z Ytongu:</strong> hoci mala rovnaký typ
              omietky, jej <strong>priľnavosť bola nedostatočná</strong>. Na
              pórobetóne sa brizolit neudržal tak dobre ako na tehle, preto sme
              ho odstránili a podklad upravili.
            </li>
          </ul>
        </div>
      </PolystyrenSection>

      <HoverGallery
        title="Pôvodný stav pred zateplením"
        items={POLYSTYREN_HOVER_GALLERY}
      />

      <PolystyrenSection>
        <PolystyrenHeading>
          2. Použitie bieleho a sivého polystyrénu – rozdiely a výhody
        </PolystyrenHeading>
        <div className="mt-8 space-y-7">
          <PolystyrenParagraph>
            Pri tejto zákazke sme zvolili kombináciu{" "}
            <strong>bieleho a sivého polystyrénu</strong>, a to podľa potrieb
            konkrétnych častí domu. Každý materiál má totiž svoje výhody –
            dôležité je vedieť, kde ich využiť naplno.
          </PolystyrenParagraph>
          <ul className="list-disc space-y-6 pl-6 text-[15px] leading-8 text-primary md:text-base">
            <li>
              <strong>Biely polystyrén (15 cm):</strong> sme aplikovali na
              pôvodnú tehlovú časť domu. Poskytuje výborné tepelnoizolačné
              vlastnosti a je ideálny pre plochy, kde nie je obmedzený
              priestor.
            </li>
            <li>
              <strong>Sivý polystyrén:</strong> sme použili na stenu, ktorá
              smerovala do úzkeho susedovho dvora. Tu bolo potrebné zmenšiť
              hrúbku izolácie, no zároveň zachovať tepelnú účinnosť. Vďaka
              vyššej hustote a lepším izolačným vlastnostiam sme dosiahli
              výborný výsledok aj pri tenšej vrstve.
            </li>
          </ul>
          <p className="text-[15px] italic leading-8 text-primary md:text-base">
            💡 <strong>Tip pre úzke priestory:</strong> Sivý polystyrén je
            ideálnou voľbou v miestach, kde je málo miesta – napríklad pri
            hranici pozemku alebo tesne vedľa susedného domu.
          </p>
        </div>
      </PolystyrenSection>

      <PolystyrenSection>
        <PolystyrenHeading>
          3. Zateplenie balkóna – detaily rozhodujú
        </PolystyrenHeading>
        <div className="mt-8 space-y-7">
          <PolystyrenParagraph>
            Balkónová časť si vyžadovala špeciálnu pozornosť. Pôvodná omietka
            už bola uvoľnená, miestami nesúdržná a nepripravená na akúkoľvek
            ďalšiu vrstvu.
          </PolystyrenParagraph>
          <ul className="list-disc space-y-6 pl-6 text-[15px] leading-8 text-primary md:text-base">
            <li>
              Najprv sme odstránili všetky nespoľahlivé vrstvy omietky, čím sme
              predišli neskoršiemu odlupovaniu izolácie.
            </li>
            <li>
              Podklad sme spevnili a vyrovnali – výsledkom bol stabilný povrch
              vhodný na nanesenie lepidla a nalepenie polystyrénových dosiek.
            </li>
            <li>
              Po dokončení sme vytvorili čistý a plynulý prechod medzi fasádou
              a balkónom – vizuálne aj technicky.
            </li>
          </ul>
          <p className="text-[15px] italic leading-8 text-primary md:text-base">
            💡 <strong>Tip pre balkóny:</strong> Pri zatepľovaní balkónov je
            mimoriadne dôležité venovať pozornosť detailom. Kvalitne spracované
            ukončenia zabránia zatekaniu a vzniku tepelných mostov.
          </p>
        </div>
      </PolystyrenSection>

      <PolystyrenSection>
        <PolystyrenHeading>Zhrnutie a odporúčania z praxe</PolystyrenHeading>
        <div className="mt-8 space-y-6">
          <PolystyrenParagraph>
            Letné zatepľovanie vie byť rýchle a efektívne,{" "}
            <strong>ak sa dodržia dôležité zásady</strong>. Jednou z najväčších
            výziev sú vysoké teploty, ktoré zrýchľujú schnutie lepidiel a
            omietok – a tým môžu ovplyvniť priľnavosť izolačných dosiek.
          </PolystyrenParagraph>
          <PolystyrenParagraph>
            Preto je dôležité{" "}
            <strong>začínať s prácami už medzi 5:00 a 6:00 ráno</strong>, keď
            sú podmienky najstabilnejšie a materiály sa správajú tak, ako majú.
          </PolystyrenParagraph>
          <PolystyrenParagraph>
            Každý dom je iný. V tomto prípade sme narazili na rozdielne
            správanie brizolitovej omietky na dvoch podkladoch:
            <br />– <strong>na tehlovom murive držala pevne</strong>,
            <br />–{" "}
            <strong>
              na Ytongovej prístavbe sa omietka uvoľňovala v spodnej časti
            </strong>{" "}
            a pri poklopaní vo vyšších miestach vydávala dutý zvuk – čo
            signalizovalo zníženú priľnavosť k podkladu.
          </PolystyrenParagraph>
          <PolystyrenParagraph>
            Aj preto je pred samotným zateplením dôležité skontrolovať celkový
            stav omietky a všade tam, kde je podozrenie na nedostatočné spojenie
            s podkladom, ju odstrániť až na pevný podklad.
          </PolystyrenParagraph>
          <PolystyrenParagraph>
            Dodržiavaním týchto zásad zabezpečíte, že vaše zateplenie nebude
            len pekné na pohľad, ale najmä funkčné a trvácne.
          </PolystyrenParagraph>
        </div>
      </PolystyrenSection>

      <section className="bg-primary py-12 text-white md:py-14">
        <AnimateOnScroll className="mx-auto w-[92%] max-w-[820px]">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-[2.4rem]">
            Chystáte sa zatepliť fasádu?
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-8 text-white/90 md:text-base">
            Nechajte si vypracovať nezáväznú cenovú ponuku do 48 hodín a
            zistite, koľko vás bude stáť zateplenie vášho domu.
          </p>
          <Link
            href="/kontakt"
            className="mt-7 inline-flex items-center justify-center bg-white px-7 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
          >
            Chcem nezáväznú cenovú ponuku
          </Link>
        </AnimateOnScroll>
      </section>

      <BeforeAfterGallery
        title="Premena fasády pred a po zateplení"
        items={POLYSTYREN_BEFORE_AFTER_GALLERY}
      />

      {page.related.length > 0 ? (
        <section className="mx-auto mt-4 w-[92%] max-w-5xl rounded-[2rem] border border-border bg-white p-8 shadow-[0_12px_40px_rgba(15,29,74,0.05)] md:p-10">
          <AnimateOnScroll>
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
                Ďalej na webe
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Súvisiace podstránky
              </h2>
            </div>
          </AnimateOnScroll>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {page.related.map((item, index) => (
              <AnimateOnScroll key={item.href} delay={index * 80}>
                <Link
                  href={item.href}
                  className="group block rounded-[1.6rem] border border-border bg-light px-6 py-6 transition-all hover:-translate-y-1 hover:border-primary/25 hover:bg-white"
                >
                  <p className="text-lg font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-foreground/65">
                    {item.description}
                  </p>
                  <span className="mt-5 block whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Otvoriť
                  </span>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function MineralnaVlnaCaseStudyBody({ page }: { page: SitePage }) {
  return (
    <div className="bg-white pb-12 pt-12 md:pt-16">
      <PolystyrenSection withRule={false} className="pb-20">
        <PolystyrenHeading>
          Zateplenie fasády minerálnou vlnou v Hlohovci
        </PolystyrenHeading>
        <div className="mt-8 space-y-2 text-[15px] leading-8 text-primary md:text-base">
          <p className="font-semibold">Základné informácie</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Lokalita:</strong> Hlohovec
            </li>
            <li>
              <strong>Čas realizácie:</strong> November / December 2024
            </li>
            <li>
              <strong>Rozsah prác:</strong> cca 202 m² zateplenej plochy
            </li>
            <li>
              <strong>Použitý materiál:</strong> Minerálna vlna (tzv. vata)
            </li>
          </ul>
        </div>
      </PolystyrenSection>

      <PolystyrenSection>
        <PolystyrenHeading>
          Jesenné zatepľovanie – Výzvy, ktoré netreba podceniť
        </PolystyrenHeading>
        <div className="mt-8 space-y-7">
          <PolystyrenParagraph>
            Zatepľovanie staršieho domu koncom jesene prináša špecifické výzvy. Kratšie dni a chladnejšie počasie predlžujú schnutie mált, penetračných náterov či omietok. Výkyvy teplôt si vyžadujú dôkladné plánovanie, aby sa predišlo poškodeniu materiálov.
          </PolystyrenParagraph>
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-primary">
              Pri tejto zákazke bolo kľúčové:
            </h3>
            <ul className="list-disc space-y-3 pl-6 text-[15px] leading-8 text-primary md:text-base">
              <li>sledovať predpoveď počasia a vyhnúť sa dažďu a mrazom,</li>
              <li>počítať s dlhším časom schnutia jednotlivých vrstiev,</li>
              <li>zohľadniť nečakané opravy, ktoré sú pri starších domoch bežné.</li>
            </ul>
          </div>
        </div>
      </PolystyrenSection>

      <PolystyrenSection>
        <PolystyrenHeading>
          1. Kontrola pôvodnej omietky a vystuženie balkóna
        </PolystyrenHeading>
        <div className="mt-8 space-y-7">
          <PolystyrenParagraph>
            Na začiatku sme vykonali dôkladnú kontrolu fasády. Po vizuálnej aj mechanickej prehliadke sme zistili, že pôvodná omietka na viacerých miestach nedržala na podklade – najmä v okolí balkóna. Preto sme poškodené časti odstránili.
          </PolystyrenParagraph>
          <PolystyrenParagraph>
            Po obití sa ukázalo vážnejšie poškodenie: nosné oceľové prvky balkóna boli skorodované, čo ohrozovalo jeho stabilitu. Celý balkón sme preto vystužili oceľovými roxormi a spevnili sanačnou maltou. Výsledkom bola bezpečná a pevná konštrukcia pripravená na nanesenie zatepľovacieho systému a finálnych vrstiev fasády.
          </PolystyrenParagraph>
        </div>
      </PolystyrenSection>

      <HoverGallery
        title="Pôvodný stav balkóna"
        items={MINERALNA_HOVER_GALLERY}
      />

      <PolystyrenSection>
        <PolystyrenHeading>
          2. Obnova striešky nad vchodom
        </PolystyrenHeading>
        <div className="mt-8 space-y-7">
          <PolystyrenParagraph>
            Pôvodná železná strieška bola vo veľmi zlom stave – hrozilo jej zrútenie. Po dohode s majiteľom sme ju odstránili a nahradili novou, ktorú sme tiež zateplili minerálnou vlnou a esteticky upravili tak, aby ladila so zvyškom fasády.
          </PolystyrenParagraph>
          <p className="text-[15px] italic leading-8 text-primary md:text-base">
            💡 <strong>Tip:</strong> Pri starších domoch nezabúdajte na detaily ako sú striešky, balkóny či iné výčnelky. Ich technický stav často ovplyvňuje nielen bezpečnosť, ale aj životnosť fasády.
          </p>
        </div>
      </PolystyrenSection>

      <PolystyrenSection>
        <PolystyrenHeading>
          3. Zateplenie minerálnou vlnou a jej výhody
        </PolystyrenHeading>
        <div className="mt-8 space-y-7">
          <PolystyrenParagraph>
            Ako izolačný materiál sme použili minerálnu vlnu, ktorá má oproti polystyrénu niekoľko výhod:
          </PolystyrenParagraph>
          <ul className="list-disc space-y-2 pl-6 text-[15px] leading-8 text-primary md:text-base">
            <li>lepšie tepelnoizolačné vlastnosti,</li>
            <li>vyššiu protipožiarnu odolnosť,</li>
            <li>lepšie odhlučnenie.</li>
          </ul>
          <PolystyrenParagraph>
            Minerálna vlna je ťažšia ako polystyrén, čo vyžaduje precízne lepenie a kotvenie. Pri práci sme dbali na správne vrstvenie lepiacej malty a dostatočné preschnutie každej vrstvy, aby bol výsledok trvácny.
          </PolystyrenParagraph>
        </div>
      </PolystyrenSection>

      <PolystyrenSection>
        <PolystyrenHeading>
          4. Dodatočné práce nad rámec zateplenia
        </PolystyrenHeading>
        <div className="mt-8 space-y-7">
          <PolystyrenParagraph>
            Ako to už pri rekonštrukciách býva, počas prác sa ukázali aj ďalšie potrebné zásahy. V tomto prípade sme:
          </PolystyrenParagraph>
          <ul className="list-disc space-y-3 pl-6 text-[15px] leading-8 text-primary md:text-base">
            <li>vyhotovili a zateplili drevenú konštrukciu (tzv. štablón),</li>
            <li>zamurovali niekoľko nepoužívaných okien,</li>
            <li>kompletne zrekonštruovali balkón a striešku nad vchodom.</li>
          </ul>
          <PolystyrenParagraph>
            Tieto dodatočné úpravy síce predĺžili realizáciu, no zároveň výrazne zvýšili celkovú kvalitu a hodnotu rekonštrukcie.
          </PolystyrenParagraph>
          <p className="text-[15px] italic leading-8 text-primary md:text-base">
            💡 <strong>Tip:</strong> Pri starších domoch vždy odporúčame počítať s rezervou na neočakávané opravy – sú časté a často nevyhnutné.
          </p>
        </div>
      </PolystyrenSection>

      <PolystyrenSection>
        <PolystyrenHeading>Zhrnutie a naše skúsenosti</PolystyrenHeading>
        <div className="mt-8 space-y-6">
          <PolystyrenParagraph>
            Jesenné zatepľovanie je náročnejšie na organizáciu – neisté počasie, kratšie dni a pomalšie schnutie môžu predĺžiť celkový proces. Pri starších stavbách navyše často narazíte na skryté problémy – napríklad nesúdržnú omietku a poškodené nosné prvky. Aj preto je dôležité počítať s rezervou a nechať si priestor na riešenie nečakaných situácií.
          </PolystyrenParagraph>
          <PolystyrenParagraph>
            S dobre pripraveným tímom sa však všetky tieto výzvy dajú zvládnuť efektívne a bez zbytočných prieťahov.
          </PolystyrenParagraph>
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-primary">
              Vďaka tejto realizácii získal majiteľ domu v Hlohovci:
            </h3>
            <ul className="list-disc space-y-3 pl-6 text-[15px] leading-8 text-primary md:text-base">
              <li>fasádu s výbornými tepelnoizolačnými a protipožiarnymi vlastnosťami,</li>
              <li>bezpečný a kompletne zrekonštruovaný balkón aj vchodovú časť,</li>
              <li>nižšie náklady na vykurovanie už v prvej zime po zateplení.</li>
            </ul>
          </div>
        </div>
      </PolystyrenSection>

      <section className="bg-primary py-12 text-white md:py-14">
        <AnimateOnScroll className="mx-auto w-[92%] max-w-[820px]">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-[2.4rem]">
            Chystáte sa zatepliť fasádu?
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-8 text-white/90 md:text-base">
            Nechajte si vypracovať nezáväznú cenovú ponuku do 48 hodín a
            zistite, koľko vás bude stáť zateplenie vášho domu.
          </p>
          <Link
            href="/kontakt"
            className="mt-7 inline-flex items-center justify-center bg-white px-7 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
          >
            Chcem nezáväznú cenovú ponuku
          </Link>
        </AnimateOnScroll>
      </section>

      <BeforeAfterGallery
        title="Premena fasády pred a po zateplení"
        items={MINERALNA_BEFORE_AFTER_GALLERY}
      />

      {page.related.length > 0 ? (
        <section className="mx-auto mt-4 w-[92%] max-w-5xl rounded-[2rem] border border-border bg-white p-8 shadow-[0_12px_40px_rgba(15,29,74,0.05)] md:p-10">
          <AnimateOnScroll>
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
                Ďalej na webe
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Súvisiace podstránky
              </h2>
            </div>
          </AnimateOnScroll>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {page.related.map((item, index) => (
              <AnimateOnScroll key={item.href} delay={index * 80}>
                <Link
                  href={item.href}
                  className="group block rounded-[1.6rem] border border-border bg-light px-6 py-6 transition-all hover:-translate-y-1 hover:border-primary/25 hover:bg-white"
                >
                  <p className="text-lg font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-foreground/65">
                    {item.description}
                  </p>
                  <span className="mt-5 block whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Otvoriť
                  </span>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function cityKnownLink(line: string): string | null {
  if (
    line.includes("polystyrénom") ||
    line.includes("Trnava (prípadová štúdia)") ||
    line.includes("Zateplenie fasády Trnava")
  ) {
    return "/zateplenie-fasady/polystyren-biely-sivy";
  }

  if (
    line.includes("minerálnou vlnou") ||
    line.includes("Hlohovec (prípadová štúdia)")
  ) {
    return "/zateplenie-fasady/mineralna-vlna";
  }

  if (line.includes("cenník") || line.includes("Zateplenie fasády ESPRON")) {
    return "/zateplenie-fasady";
  }

  return null;
}

function renderCityLinkedLine(line: string, currentPath: string) {
  const href = cityKnownLink(line);

  if (href && href !== currentPath) {
    return (
      <Link
        href={href}
        className="underline decoration-primary/45 underline-offset-4 transition hover:decoration-primary"
      >
        {line}
      </Link>
    );
  }

  return linkifyText(line, currentPath);
}

function renderCityCheckLine(line: string, currentPath: string) {
  const checks = line
    .split(/\s*✅\s*/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (checks.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-2">
      {checks.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true" className="shrink-0">
            ✅
          </span>
          <span>{renderCityLinkedLine(item, currentPath)}</span>
        </li>
      ))}
    </ul>
  );
}

function splitCityProcessItem(item: string) {
  const [intro, details] = item.split(/:\s+–\s+/, 2);

  if (!details) {
    return {
      intro: item,
      details: [],
    };
  }

  return {
    intro: `${intro}:`,
    details: details
      .split(/\s+–\s+/)
      .map((detail) => detail.trim())
      .filter(Boolean),
  };
}

function renderCityRawItems(block: Extract<ContentBlock, { type: "raw" }>, currentPath: string) {
  const isProcessBlock =
    block.title.includes("prebieha") || block.title.includes("prebieha?");

  if (isProcessBlock) {
    const noteItems = block.items.filter((item) => item.startsWith("Ak si "));
    const stepItems = block.items.filter((item) => !item.startsWith("Ak si "));

    return (
      <div className="text-[15px] leading-8 text-primary md:text-base">
        <ol className="space-y-7">
          {stepItems.map((item, index) => {
            const processItem = splitCityProcessItem(item);

            return (
              <li key={item} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2">
                <span className="text-right">{index + 1}.</span>
                <div>
                  <p>{renderCityLinkedLine(processItem.intro, currentPath)}</p>
                  {processItem.details.length > 0 ? (
                    <ul className="mt-1 space-y-1">
                      {processItem.details.map((detail) => (
                        <li key={detail}>– {renderCityLinkedLine(detail, currentPath)}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
        {noteItems.length > 0 ? (
          <div className="mt-8 space-y-4">
            {noteItems.map((item) => (
              <p key={item}>{renderCityLinkedLine(item, currentPath)}</p>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (block.title === "Nedávno dokončené zateplenia") {
    return (
      <ul className="space-y-2 text-[15px] leading-8 text-primary md:text-base">
        {block.items.map((item) => (
          <li key={item}>• {renderCityLinkedLine(item, currentPath)}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-5 text-[15px] leading-8 text-primary md:text-base">
      {block.items.map((item) => (
        <p key={item}>{renderCityLinkedLine(item, currentPath)}</p>
      ))}
    </div>
  );
}

function renderCityBlockContent(block: ContentBlock, currentPath: string) {
  if (block.type === "paragraphs") {
    const [headline, ...paragraphs] = block.paragraphs;

    return (
      <>
        {headline ? (
          <p className="max-w-2xl text-3xl leading-tight text-primary md:text-[2.15rem]">
            {renderCityLinkedLine(headline, currentPath)}
          </p>
        ) : null}
        {paragraphs.length > 0 ? (
          <div className="mt-8 space-y-5 text-[15px] leading-8 text-primary md:text-base">
            {paragraphs.map((paragraph) => (
              paragraph.startsWith("✅") ? (
                <div key={paragraph}>{renderCityCheckLine(paragraph, currentPath)}</div>
              ) : (
                <p key={paragraph}>{renderCityLinkedLine(paragraph, currentPath)}</p>
              )
            ))}
          </div>
        ) : null}
      </>
    );
  }

  if (block.type === "pairs") {
    return (
      <ul className="space-y-7 text-[15px] leading-8 text-primary md:text-base">
        {block.items.map((item) => (
          <li key={item.title} className="flex gap-2">
            <span aria-hidden="true" className="shrink-0">
              ✅
            </span>
            <span>
              <strong>{renderCityLinkedLine(item.title, currentPath)}</strong>
              {item.body ? <> – {renderCityLinkedLine(item.body, currentPath)}</> : null}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "raw") {
    return renderCityRawItems(block, currentPath);
  }

  return renderBlock(block, currentPath);
}

function renderCityContactBlock(block: Extract<ContentBlock, { type: "raw" }>) {
  return (
    <section key={block.title} className="bg-primary py-10 text-white md:py-12">
      <AnimateOnScroll className="mx-auto w-[92%] max-w-[660px]">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-[2.4rem]">
          {block.title}
        </h2>
        <div className="mt-7 space-y-3 text-[15px] leading-8 text-white/92 md:text-base">
          {block.items.map((item) =>
            item.includes("@") ? (
              <p key={item}>
                <Link
                  href={`mailto:${item}`}
                  className="underline decoration-white/45 underline-offset-4 transition hover:decoration-white"
                >
                  {item}
                </Link>
              </p>
            ) : (
              <p key={item}>{item}</p>
            ),
          )}
        </div>
      </AnimateOnScroll>
    </section>
  );
}

function renderCityBlock(
  block: ContentBlock,
  currentPath: string,
  isFirstCityBlock = false,
) {
  if (block.type === "raw" && block.title === "Napíšte nám") {
    return renderCityContactBlock(block);
  }

  if (block.type === "raw" && block.title === "Nedávno dokončené zateplenia") {
    return (
      <ServiceRealizationGallery
        key={block.title}
        serviceSlug="zateplenie-fasady"
        title={block.title}
        description="Realizácie z Hlohovca, Trnavy, Banskej Bystrice a Brezna vrátane jednej video ukážky z pôvodnej galérie."
        legacyItems={ZATEPLENIE_FASADY_REALIZATIONS}
        columns={4}
      />
    );
  }

  if (isFirstCityBlock) {
    return (
      <section key={block.title} className="bg-white text-primary">
        <AnimateOnScroll className="mx-auto w-[92%] max-w-[660px] py-10 md:py-14">
          {renderCityBlockContent(block, currentPath)}
        </AnimateOnScroll>
      </section>
    );
  }

  return (
    <section key={block.title} className="bg-white text-primary">
      <div className="bg-primary py-5 text-white md:py-7">
        <div className="mx-auto w-[92%] max-w-[660px]">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-[2.4rem]">
            {block.title}
          </h2>
        </div>
      </div>
      <AnimateOnScroll className="mx-auto w-[92%] max-w-[660px] py-10 md:py-14">
        {renderCityBlockContent(block, currentPath)}
      </AnimateOnScroll>
    </section>
  );
}

export default function PageTemplate({ page }: PageTemplateProps) {
  const isCityPage = page.family === "insulation-city";
  const isPolystyrenCaseStudy =
    page.path === "/zateplenie-fasady/polystyren-biely-sivy";
  const isMineralnaVlnaCaseStudy =
    page.path === "/zateplenie-fasady/mineralna-vlna";

  return (
    <main className="bg-[linear-gradient(180deg,#f5f7fb_0%,#ffffff_18%,#ffffff_100%)]">
      <section className="relative overflow-hidden bg-primary-dark pb-18 pt-28 text-white md:pb-24 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_34%),linear-gradient(120deg,rgba(255,255,255,0.06),transparent_26%)]" />
        {page.heroImage ? (
          <div className="absolute inset-y-0 right-0 hidden w-[44vw] opacity-30 lg:block">
            <Image
              src={page.heroImage}
              alt={page.label}
              fill
              sizes="44vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-primary-dark/20 via-primary-dark/40 to-primary-dark" />
          </div>
        ) : null}

        <div className="relative mx-auto w-[92%]">
          <div className="max-w-4xl">
            <p className="animate-fade-up text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">
              {page.eyebrow}
            </p>
            <h1 className="animate-fade-up-delay-1 mt-5 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
              {page.label}
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
              {page.description}
            </p>

            <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap gap-3">
              <Link
                href="/kontakt"
                className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary transition-colors hover:bg-white/90"
              >
                Kontaktovať nás
              </Link>
              <Link
                href={`mailto:${CONTACT_INFO.email}`}
                className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-white/10"
              >
                Napísať e-mail
              </Link>
            </div>
          </div>
        </div>
      </section>

      {isPolystyrenCaseStudy ? (
        <PolystyrenCaseStudyBody page={page} />
      ) : isMineralnaVlnaCaseStudy ? (
        <MineralnaVlnaCaseStudyBody page={page} />
      ) : isCityPage ? (
        <div className="bg-white pb-16">
          {page.blocks.map((block, index) =>
            renderCityBlock(block, page.path, index === 0),
          )}

          {page.related.length > 0 ? (
            <div className="mx-auto w-[92%] max-w-5xl pt-16">
              <section className="rounded-[2rem] border border-border bg-white p-8 shadow-[0_12px_40px_rgba(15,29,74,0.05)] md:p-10">
                <AnimateOnScroll>
                  <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
                      Ďalej na webe
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                      Súvisiace podstránky
                    </h2>
                  </div>
                </AnimateOnScroll>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {page.related.map((item, index) => (
                    <AnimateOnScroll key={item.href} delay={index * 80}>
                      <Link
                        href={item.href}
                        className="group block rounded-[1.6rem] border border-border bg-light px-6 py-6 transition-all hover:-translate-y-1 hover:border-primary/25 hover:bg-white"
                      >
                        <p className="text-lg font-semibold text-foreground">
                          {item.label}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-foreground/65">
                          {item.description}
                        </p>
                        <span className="mt-5 block whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                          Otvoriť
                        </span>
                      </Link>
                    </AnimateOnScroll>
                  ))}
                </div>
              </section>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mx-auto w-[92%] pb-20 pt-12 md:pb-24 md:pt-16">
        <div className="space-y-16">
          {page.blocks.map((block) => renderBlock(block, page.path))}
        </div>

        {page.related.length > 0 ? (
          <section className="mt-20 rounded-[2rem] border border-border bg-white p-8 shadow-[0_12px_40px_rgba(15,29,74,0.05)] md:p-10">
            <AnimateOnScroll>
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
                  Ďalej na webe
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  Súvisiace podstránky
                </h2>
              </div>
            </AnimateOnScroll>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {page.related.map((item, index) => (
                <AnimateOnScroll key={item.href} delay={index * 80}>
                  <Link
                    href={item.href}
                    className="group block rounded-[1.6rem] border border-border bg-light px-6 py-6 transition-all hover:-translate-y-1 hover:border-primary/25 hover:bg-white"
                  >
                    <p className="text-lg font-semibold text-foreground">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-foreground/65">
                      {item.description}
                    </p>
                    <span className="mt-5 block whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      Otvoriť
                    </span>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </section>
        ) : null}
      </div>
      )}
    </main>
  );
}
