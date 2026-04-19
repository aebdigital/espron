import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import FloatingQuoteButton from "@/components/site/FloatingQuoteButton";
import ServiceRealizationGallery from "@/components/site/ServiceRealizationGallery";
import QuoteScrollButton from "@/components/site/QuoteScrollButton";
import ServiceIntroSection from "@/components/site/ServiceIntroSection";
import TepovanieQuoteForm from "@/components/site/TepovanieQuoteForm";
import { SERVICE_PAGE_MEDIA } from "@/lib/service-page-media";
import { PAGE_OVERRIDES } from "@/lib/site-navigation";

export const metadata: Metadata = {
  title: "Prémiové tepovanie kobercov a sedačiek | ESPRON",
  description:
    "Škvrna na koberci alebo zašpinená sedačka? Žiadny problém. Pošli foto. Do 24 h pošleme cenu a termín. Do rána suché, bez zápachu.",
};

const WHO = [
  {
    title: "Náročné domácnosti",
    icon: (
      <svg className="h-8 w-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    items: [
      "Celý deň upratujete, a napriek tomu na koberci zostanú škvrny od detí?",
      "Gauč vyzerá ako rodinná kronika nehôd než nový kus nábytku?",
      "Pred príchodom návštevy máte chuť všetko radšej zakryť dekami?",
    ],
  },
  {
    title: "Kancelárie",
    icon: (
      <svg className="h-8 w-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    items: [
      "Sedačka na recepcii si pamätá ešte prvý firemný teambuilding?",
      "Koberec v zasadačke nesie stopy kávy, topánok aj nekonečných porád?",
      "Chcete, aby prvý dojem z kancelárie pôsobil profesionálne, nie ošúchane?",
    ],
  },
  {
    title: "Hotely & apartmány",
    icon: (
      <svg className="h-8 w-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    items: [
      "Víkend skončil, hostia odišli a na koberci ostali škvrny od nápojov?",
      "Sedačku v izbe radšej ani nedávate na fotky, aby si ju hostia nevšimli?",
      "Chcete recenzie typu 'čisto a útulne', nie 'škvrny na koberci'?",
    ],
  },
];

const PROCESS = [
  {
    num: "1",
    title: "Vysávanie s HEPA filtrom",
    desc: "Dôkladným povysávaním odstránime prach, peľ aj chlpy, znížime množstvo alergénov a pripravíme povrch na hlbkové čistenie.",
  },
  {
    num: "2",
    title: "Nanesenie čistiacej chémie",
    desc: "Na celý povrch nastriekame profesionálny čistiaci roztok. Uvoľní nečistoty a škvrny hlboko vo vláknach.",
  },
  {
    num: "3",
    title: "Vykefovanie škvrn",
    desc: "Najšpinavšie miesta vykefujeme. Špina sa tak mechanicky naruší a čistenie je účinnejšie.",
  },
  {
    num: "4",
    title: "Extrakcia/odsatie",
    desc: "Na záver všetko prepláchneme a odsajeme extraktorom. Nábytok zostane čistý a len mierne vlhký.",
  },
];

const REASONS = [
  {
    title: "7 dňová garancia",
    desc: "Ak sa škvrna vráti, prídem znova a bezplatne ju pretepujeme.",
  },
  {
    title: "Bezpečné prípravky",
    desc: "Používame šetrné profesionálne čistiace prostriedky, po zaschnutí bezpečné pre deti aj domáce zvieratá.",
  },
  {
    title: "Presný príchod",
    desc: "Dohodneme si 30-minútové časové okno, aby ste nemuseli čakať celý deň. Vieme prísť aj večer alebo cez víkend.",
  },
  {
    title: "Rýchle schnutie",
    desc: "Povrch zostane len jemne vlhký, nie mokrý – pri bežných podmienkach býva suchý do rána.",
  },
];

const PRICING = [
  {
    category: "Čalúnený sedací nábytok",
    items: [
      "Sedačky 10 – 15 EUR/miesto",
      "Kresla od 20 EUR",
      "Sedačky v aute od 7 EUR/sedačka",
    ],
  },
  {
    category: "Koberce plošné",
    items: [
      "s výškou vlasu do 1 cm od 2 EUR/m²",
      "s výškou vlasu nad 1 cm od 3 EUR/m²",
      "Koberce kusové od 6 EUR/m²",
    ],
  },
  {
    category: "Matrace",
    items: [
      "Matrac jedna strana od 16 EUR",
      "Matrac obojstranne od 23 EUR",
    ],
  },
];

const MEDIA = SERVICE_PAGE_MEDIA["/tepovanie"];
const CATEGORY = PAGE_OVERRIDES["/tepovanie"].eyebrow;

export default function TepovaniePage() {
  return (
    <>
      {/* ── STANDARD HERO ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary-dark pb-18 pt-28 text-white md:pb-24 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_34%),linear-gradient(120deg,rgba(255,255,255,0.06),transparent_26%)]" />
        <div className="relative mx-auto w-[92%]">
          <p className="animate-fade-up text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">
            {CATEGORY}
          </p>
          <h1 className="animate-fade-up-delay-1 mt-5 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            Tepovanie
          </h1>
          <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
            Hĺbkové tepovanie kobercov, sedačiek a čalúnenia s dôrazom na čistotu,
            rýchle schnutie a profesionálny výsledok bez zbytočného stresu.
          </p>
          <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap gap-3">
            <QuoteScrollButton className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary transition-colors hover:bg-white/90">
              Kontaktovať nás
            </QuoteScrollButton>
            <Link
              href="mailto:info@espron.sk"
              className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-white/10"
            >
              Napísať e-mail
            </Link>
          </div>
        </div>
      </section>

      <ServiceIntroSection
        title="Prémiové tepovanie kobercov a sedačiek"
        subtitle="Škvrna na koberci alebo zašpinená sedačka? Žiadny problém."
        description="Pošli foto. Do 24 h pošleme cenu a termín. Do rána suché, bez zápachu."
        secondaryDescription={
          <span className="font-semibold text-amber-400">7-dňová garancia spokojnosti.</span>
        }
        meta={
          <>
            <span className="font-semibold text-foreground/70">Lokalita:</span>{" "}
            Spišská Nová Ves a okolie • Poprad • Prešov
          </>
        }
        imageSrc={MEDIA.preview}
        imageAlt="Tepovanie kobercov a sedačiek"
      />

      {/* ── WHO ──────────────────────────────────────────────────────── */}
      <section className="bg-primary py-20 text-white md:py-28">
        <div className="mx-auto w-[92%]">
          <div className="mb-14 text-center">
            <AnimateOnScroll>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  Kto a kedy si nás volá?
                </h2>
                <p className="mt-3 text-sm text-white/60">
                  Spoznáte sa v niektorej z týchto situácií?
                </p>
              </div>
            </AnimateOnScroll>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {WHO.map((group, index) => (
              <AnimateOnScroll key={group.title} delay={index * 80}>
                <div className="rounded-[1.5rem] border border-white/12 bg-white/8 p-8 backdrop-blur-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    {group.icon}
                  </div>
                  <h3 className="mb-5 text-base font-bold text-white">{group.title}</h3>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm leading-6 text-white/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-[92%]">
          <AnimateOnScroll>
            <h2 className="mb-14 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Ako prebieha prémiové tepovanie
            </h2>
          </AnimateOnScroll>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((s, index) => (
              <AnimateOnScroll key={s.num} delay={index * 70}>
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <span className="text-sm font-extrabold text-primary">{s.num}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
                  <p className="text-sm leading-6 text-foreground/65">{s.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── REASONS ──────────────────────────────────────────────────── */}
      <section className="bg-light py-20 md:py-28">
        <div className="mx-auto grid w-[92%] gap-12 lg:grid-cols-[0.8fr_280px_1.2fr_280px] lg:items-start">
          <AnimateOnScroll>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Prečo nám zveriť tepovanie
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll
            delay={80}
            className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-white"
          >
            <Image
              src={MEDIA.items[2].image}
              alt={MEDIA.items[2].alt}
              fill
              sizes="(min-width: 1024px) 280px, 100vw"
              className="object-cover"
            />
          </AnimateOnScroll>
          <div className="space-y-6">
            {REASONS.map((r, index) => (
              <AnimateOnScroll key={r.title} delay={index * 80}>
                <div>
                  <p className="font-bold text-foreground">{r.title}</p>
                  <p className="mt-1 text-sm leading-6 text-foreground/70">{r.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll
            delay={140}
            className="relative hidden aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-white lg:block"
          >
            <Image
              src={MEDIA.items[1].image}
              alt={MEDIA.items[1].alt}
              fill
              sizes="(min-width: 1024px) 280px, 100vw"
              className="object-cover"
            />
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────── */}
      <section className="bg-primary-dark py-20 text-white md:py-28">
        <div className="mx-auto w-[92%]">
          <AnimateOnScroll>
            <h2 className="mb-14 text-center text-2xl font-bold tracking-tight text-white md:text-3xl">
              Cena
            </h2>
          </AnimateOnScroll>
          <div className="grid gap-10 md:grid-cols-3">
            {PRICING.map((col, index) => (
              <AnimateOnScroll key={col.category} delay={index * 80}>
                <div>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
                    {col.category}
                  </p>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item} className="text-sm text-white/80">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll delay={180}>
            <p className="mt-12 text-center text-sm text-white/60">
              Minimálna suma objednávky je{" "}
              <strong className="text-white">35 EUR</strong>.
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
            Ako nás kontaktovať?
          </h2>
          <p className="mb-10 text-sm text-foreground/55">
            Po obdržaní informácií vám pošleme cenovú ponuku max do 2 dní. Po akceptovaní cenovej ponuky si stanovíme termín realizácie.
          </p>
          <TepovanieQuoteForm />
        </AnimateOnScroll>
      </section>
      <ServiceRealizationGallery
        serviceSlug="tepovanie"
        title="Realizácie tepovania"
      />
      <FloatingQuoteButton />
    </>
  );
}
