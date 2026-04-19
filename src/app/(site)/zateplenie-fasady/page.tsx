import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import FaqAccordion from "@/components/site/FaqAccordion";
import FloatingQuoteButton from "@/components/site/FloatingQuoteButton";
import InsulationQuoteForm from "@/components/site/InsulationQuoteForm";
import ServiceRealizationGallery from "@/components/site/ServiceRealizationGallery";
import QuoteScrollButton from "@/components/site/QuoteScrollButton";
import ServiceIntroSection from "@/components/site/ServiceIntroSection";
import { getSitePageByPath } from "@/lib/espron-content";
import { ZATEPLENIE_FASADY_REALIZATIONS } from "@/lib/legacy-gallery-data";
import { CONTACT_INFO } from "@/lib/site-navigation";

export const metadata: Metadata = {
  title: "Zateplenie fasády | ESPRON",
  description:
    "Kompletné zateplenie rodinných domov kdekoľvek na Slovensku. Bez estetických chýb a skrytých poplatkov. Ceny od 94 €/m².",
};

export const revalidate = 0;

const PROBLEMS = [
  {
    label: "Tepelné mosty",
    desc: "Nesprávne detaily vedú k únikom tepla a vzniku chladných miest v interiéri.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    label: "Vlhnutie stien",
    desc: "Nekvalitné zateplenie bráni stenám 'dýchať', čo vedie k zrážaniu vlhkosti a plesniam.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5" />
      </svg>
    ),
  },
  {
    label: "Praskliny na fasáde",
    desc: "Nedodržanie technologických páuz spôsobuje napätie a vznik trhlín v omietke.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
      </svg>
    ),
  },
  {
    label: "Zatekanie vody",
    desc: "Zle osadené parapety a lišty umožňujú vode prenikať pod izolant a ničiť konštrukciu.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
  },
];

const INCLUDED = [
  {
    label: "Postavenie lešenia",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0l2-2m4 4l2-2m-2 2v2m-4-6V3m0 0L7 5m2-2l2 2" />
      </svg>
    ),
  },
  {
    label: "Zakrytie okien a dlažby",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: "Penetrácia podkladu",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Lepenie izolantu",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0l2-2m4 4l2-2" />
      </svg>
    ),
  },
  {
    label: "Zápustné kotvenie",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
  },
  {
    label: "APU lišty a profily",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    label: "Sieťka a lepidlo (1.v.)",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 10h16M4 14h16M10 4v16M14 4v16" />
      </svg>
    ),
  },
  {
    label: "Druhá vrstva lepidla",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h16v16H4V4zm4 4h8v8H8V8z" />
      </svg>
    ),
  },
  {
    label: "Penetrácia pod omietku",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Finálna fasádna omietka",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
      </svg>
    ),
  },
];

const BONUSES = [
  {
    num: "Bonus #1",
    title: "Extra záruka +365 dní v základe",
    desc: "V tomto balíku automaticky predlžujeme zákonnú záruku. Sme si istí kvalitou našej práce, preto za vašu fasádu ručíme dlhšie, než vyžaduje zákon.",
  },
  {
    num: "Bonus #2",
    title: "Dokumentácia pre Obnov dom (Mini)",
    desc: "Pripravíme za vás technickú dokumentáciu pre SAŽP: Zmluvu o dielo, podrobný súpis prác a potvrdenie o ekologickej likvidácii odpadu. Vy len podáte žiadosť, o zvyšok sa postaráme my.",
  },
  {
    num: "Bonus #3",
    title: "Fixná cena lešenia (Žiadne doplatky)",
    desc: "Na rozdiel od základného balíka, tu máte nájom lešenia už v cene diela. Neriskujete doplatky za prenájom lešenia pri nepriazni počasia. Máte istotu, že dohodnutá suma sa v priebehu prác nenavýši.",
  },
];

const PACKAGES = [
  {
    name: "Balík ISTOTA",
    sub: "Základ poctivej fasády",
    highlight: false,
    items: [
      "Kompletný 10-krokový technologický postup ESPRON",
      "Montáž / demontáž a dovoz lešenia",
      "Ekologický odvoz a likvidácia odpadu",
      "Zákonná záruka 2 roky",
    ],
    price: "94 €/m² (EPS) | 104 €/m² (Vata)",
  },
  {
    name: "Balík BEZSTAROSTNOSŤ",
    sub: "- Najobľúbenejší -",
    highlight: true,
    items: [
      "Všetko z balíka ISTOTA",
      "+ Extra záruka +365 dní navyše (spolu 3 roky)",
      "+ Nájom lešenia v cene (Neriskujete doplatky za lešenie. Máte fixnú cenu počas celej realizácie)",
      "+ Set ochrannej impregnácie (Ochráni fasádu pred vznikom plesní a machov)",
      "+ Prioritný termín realizácie (Garancia nástupu v dohodnutom kalendárnom okne)",
      "+ Dokumentácia Obnov dom (Mini) (Pripravíme za vás všetky technické podklady zo strany zhotoviteľa)",
      "+ Denný foto-report (Každý večer dostanete na WhatsApp fotky z postupu prác pre vašu 100% kontrolu)",
    ],
    price: "99 €/m² (EPS) | 109 €/m² (Vata)",
  },
  {
    name: "Balík REŠTART",
    sub: "Pre najnáročnejších",
    highlight: false,
    items: [
      "Všetko z balíka BEZSTAROSTNOSŤ",
      "+ Záruka 5 rokov na celistvosť a funkčnosť fasády",
      "+ Odborná aplikácia impregnácie: Kompletné ošetrenie fasády naším tímom",
      "+ Hĺbkové čistenie okolia: Profesionálne vyčistenie zámkovej dlažby a chodníkov priemyselnou vapkou",
      "+ Čistenie strechy: Hĺbkové čistenie krytiny od machov a lišajníkov pre dokonalý vizuálny súlad s novou fasádou",
      "+ Interiérový bonus: Profesionálne tepovanie gauča a kobercov, aby bol váš domov po rekonštrukcii ako nový aj vo vnútri",
    ],
    price: "144 €/m² (EPS) | 149 €/m² (Vata)",
  },
];

const FAQ = [
  {
    question: "Pracujete po celom Slovensku?",
    answer: "Áno, realizujeme zateplenia po celom Slovensku. Dochádzame bez príplatkov do všetkých lokalít.",
  },
  {
    question: "Čo ak sa realizácia kvôli počasiu natiahne? Budem doplácať za lešenie?",
    answer: "V balíku BEZSTAROSTNOSŤ a REŠTART máte nájom lešenia zahrnutý v cene. Neriskujete žiadne doplatky, nech trvá realizácia akokoľvek dlho.",
  },
  {
    question: "Budem mať kontrolu nad prácou, aj keď nie som doma?",
    answer: "Áno. V balíku BEZSTAROSTNOSŤ a REŠTART dostávate každý večer denný foto-report na WhatsApp s fotkami z postupu prác.",
  },
  {
    question: "Ako je to s platbou?",
    answer: "Po akceptovaní cenovej ponuky sa zaplatí záloha za materiál. Zvyšok sa doplatí po dokončení prác.",
  },
  {
    question: "V akom stave zostane môj pozemok po vašom odchode?",
    answer: "Ekologický odvoz a likvidácia odpadu je súčasťou každého balíka. Pozemok odovzdávame v poriadku.",
  },
  {
    question: "Môžem si dom zatepliť svojpomocne?",
    answer: "Svojpomoc je možná, no odporúčame profesionálnu realizáciu – garantuje správny technologický postup, záruku a eliminuje riziko tepelných mostov či prasklín.",
  },
];

export default async function ZateplenieFasadyPage() {
  const page = await getSitePageByPath("/zateplenie-fasady");
  const hiddenHeroHighlights = new Set([
    "Postavenie lešenia",
    "Zakrytie okien a dlažby",
    "Penetrácia podkladu",
    "Lepenie izolantu",
  ]);
  const heroHighlights =
    page?.highlights.filter((highlight) => !hiddenHeroHighlights.has(highlight)) ?? [];

  return (
    <>
      {/* ── HERO (original PageTemplate style) ───────────────────────── */}
      <section className="relative overflow-hidden bg-primary-dark pb-18 pt-28 text-white md:pb-24 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_34%),linear-gradient(120deg,rgba(255,255,255,0.06),transparent_26%)]" />
        {page?.heroImage ? (
          <div className="absolute inset-y-0 right-0 hidden w-[44vw] opacity-30 lg:block">
            <Image src={page.heroImage} alt={page.label} fill sizes="44vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-primary-dark/20 via-primary-dark/40 to-primary-dark" />
          </div>
        ) : null}

 <div className="relative mx-auto grid w-[92%] gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="max-w-4xl">
            <p className="animate-fade-up text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">
              {page?.eyebrow ?? "Zateplenie fasády"}
            </p>
            <h1 className="animate-fade-up-delay-1 mt-5 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
              {page?.label ?? "Zateplenie fasády"}
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
              {page?.description}
            </p>
            <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap gap-3">
              <QuoteScrollButton className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary transition-colors hover:bg-white/90">
                Kontaktovať nás
              </QuoteScrollButton>
              <Link href={`mailto:${CONTACT_INFO.email}`} className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-white/10">
                Napísať e-mail
              </Link>
            </div>
          </div>

          {heroHighlights.length > 0 ? (
            <div className="animate-fade-up-delay-4 grid gap-3">
              {heroHighlights.map((highlight) => (
                <div key={highlight} className="rounded-[1.4rem] border border-white/12 bg-white/8 px-5 py-4 backdrop-blur-sm">
                  <p className="text-sm leading-6 text-white/82">{highlight}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <ServiceIntroSection
        titleSize="compact"
        title={
          <>
            Kompletné zateplenie rodinných domov{" "}
            <span className="underline underline-offset-4">kdekoľvek na Slovensku.</span>
            <br />
            <span className="font-light text-foreground/70">
              Bez estetických chýb a skrytých poplatkov.
            </span>
          </>
        }
        description="Vďaka práci zohraných 4-členných tímov a prísnym technologickým postupom eliminujeme bežné chyby, ako sú trhliny alebo viditeľné spoje na omietke."
        secondaryDescription="Kým iní si tieto veci účtujú ako príplatky, my ich považujeme za základ slušne odvedenej práce:"
        bullets={[
          "Postavenie a doprava lešenia",
          "Kompletné zakrytie okien a dlažby",
          "Odvoz a likvidácia odpadu",
        ]}
        note={{
          label: "Posledná šanca: Zateplenie za staré ceny",
          body: (
            <>
              + Bonus <em>„Čistý domov“</em> (Tepovanie a strojové čistenie okolia domu)
            </>
          ),
          footer: "Posledné 2 voľné termíny",
        }}
        imageSrc="/images/realizacie/b0408c_2883303b07a4489798740af9878cc2db~mv2.avif"
        imageAlt="Zateplenie fasády"
      />

      {/* ── PROBLEMS ─────────────────────────────────────────────────── */}
      <section className="bg-light py-20 md:py-28">
        <div className="mx-auto w-[92%]">
          <AnimateOnScroll className="mb-14 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Problémy spôsobené nekvalitným zateplením
            </h2>
            <p className="mt-3 text-sm text-foreground/55">Prečo si vybrať odbornú realizáciu?</p>
          </AnimateOnScroll>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMS.map((p, index) => (
              <AnimateOnScroll key={p.label} delay={index * 100}>
                <div className="group rounded-[2rem] border border-border bg-white p-8 transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(15,29,74,0.06)]">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    {p.icon}
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-foreground">{p.label}</h3>
                  <p className="text-sm leading-7 text-foreground/60">{p.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── INCLUDED ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-[92%]">
          <AnimateOnScroll className="mb-14 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Všetky potrebné úkony v cene
            </h2>
            <p className="mt-3 text-sm text-foreground/55">S nami máte garanciu kvality</p>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
            {INCLUDED.map((item, index) => (
              <AnimateOnScroll key={item.label} delay={index * 50}>
                <div className="flex flex-col items-center gap-5 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-white text-primary shadow-sm transition-transform hover:scale-110">
                    {item.icon}
                  </div>
                  <p className="text-sm font-bold text-foreground/80 leading-tight">{item.label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── BONUSES ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-[92%]">
          <AnimateOnScroll className="mb-14 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Prečo naši klienti milujú balík <span className="uppercase">BEZSTAROSTNOSŤ</span>
            </h2>
            <p className="mt-3 text-sm text-foreground/55">
              Tieto výhody nájdete v našom najobľúbenejšom balíku, ktorý volí až{" "}
              <strong>85 % majiteľov domov.</strong>
            </p>
          </AnimateOnScroll>
          <div className="grid gap-8 md:grid-cols-3">
            {BONUSES.map((bonus, index) => (
              <AnimateOnScroll key={bonus.num} delay={index * 80}>
                <div className="rounded-[1.5rem] border border-border bg-white p-8 shadow-[0_12px_40px_rgba(15,29,74,0.05)]">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary/55">{bonus.num}</p>
                  <h3 className="mb-4 text-base font-bold text-foreground">{bonus.title}</h3>
                  <p className="text-sm leading-7 text-foreground/70">{bonus.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────── */}
      <section className="bg-light py-20 md:py-28">
        <div className="mx-auto w-[92%]">
          <AnimateOnScroll className="mb-14 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Jasné ceny bez skrytých poplatkov
            </h2>
            <p className="mt-3 text-sm text-foreground/55">
              Vyberte si úroveň starostlivosti, ktorá najviac vyhovuje vašim plánom
            </p>
          </AnimateOnScroll>
          <div className="grid gap-6 md:grid-cols-3">
            {PACKAGES.map((pkg, index) => (
              <AnimateOnScroll key={pkg.name} delay={index * 80}>
                <div
                  className={`rounded-[1.5rem] border p-8 ${
                    pkg.highlight
                      ? "border-primary bg-primary text-white shadow-xl"
                      : "border-border bg-white shadow-[0_12px_40px_rgba(15,29,74,0.05)]"
                  }`}
                >
                  <h3 className={`mb-1 text-base font-extrabold uppercase tracking-tight ${pkg.highlight ? "text-white" : "text-foreground"}`}>
                    {pkg.name}
                  </h3>
                  <p className={`mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] ${pkg.highlight ? "text-white/60" : "text-primary/55"}`}>
                    {pkg.sub}
                  </p>
                  <ul className="mb-8 space-y-3">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <svg className={`mt-0.5 h-4 w-4 shrink-0 ${pkg.highlight ? "text-white/70" : "text-primary"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={pkg.highlight ? "text-white/90" : "text-foreground/75"}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className={`text-sm font-bold ${pkg.highlight ? "text-white" : "text-foreground"}`}>
                    Cena: {pkg.price}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── URGENCY ──────────────────────────────────────────────────── */}
      <section className="bg-primary py-20 text-center md:py-28">
        <AnimateOnScroll className="mx-auto w-[92%] max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-amber-400">
            Posledné 2 voľné termíny
          </p>
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white md:text-3xl lg:text-4xl">
            (3 z 5 sú už obsadené)
          </h2>
          <p className="mt-6 text-base leading-8 text-white/70">
            Zabezpečte si miesto v kalendári za aktuálne ceny, kým nezačne hlavná sezóna.
          </p>
          <p className="mt-6 text-sm leading-8 text-white/70">
            Rezervujte si zateplenie teraz a získajte Bonus „KOMPLETNÝ REŠTART&quot; v hodnote{" "}
            <strong className="text-amber-400">750 €</strong> úplne zadarmo:
          </p>
          <ul className="mt-4 space-y-2 text-sm font-semibold text-white/90">
            <li>+ Hĺbkové tepovanie sedačky a kobercov</li>
            <li>+ Strojové čistenie okolia domu profi technikou</li>
          </ul>
          <Link
            href="/kontakt"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-bold text-primary transition-colors hover:bg-white/90"
          >
            Chcem si zabezpečiť termín
          </Link>
        </AnimateOnScroll>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-[92%] max-w-3xl">
          <AnimateOnScroll>
            <h2 className="mb-10 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Často sa nás pýtate (FAQ)
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={80}>
            <FaqAccordion items={FAQ} />
          </AnimateOnScroll>
          <AnimateOnScroll delay={120}>
            <p className="mt-10 text-sm text-foreground/55">
              Ďalšie najčastejšie otázky a odpovede nájdete na{" "}
              <Link href="/zateplenie-fasady/faq" className="text-primary underline underline-offset-2 hover:opacity-70">
                /zateplenie-fasady/faq
              </Link>
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────────────── */}
      <section
        id="cenova-ponuka"
        className="scroll-mt-32 bg-light py-20 md:scroll-mt-40 md:py-28"
      >
        <AnimateOnScroll className="mx-auto w-[92%] max-w-3xl">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Máte záujem o cenovú ponuku na zateplenie fasády?
          </h2>
          <p className="mb-10 text-sm text-foreground/55">
            Po obdržaní informácií vám pošleme cenovú ponuku do 1–2 pracovných dní.
          </p>
          <InsulationQuoteForm />
        </AnimateOnScroll>
      </section>
      <ServiceRealizationGallery
        serviceSlug="zateplenie-fasady"
        title="Ukážky zateplenia fasád"
        description="Realizácie z Hlohovca, Trnavy, Banskej Bystrice a Brezna vrátane jednej video ukážky z pôvodnej galérie."
        legacyItems={ZATEPLENIE_FASADY_REALIZATIONS}
        columns={4}
      />
      <FloatingQuoteButton />
    </>
  );
}
