import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import CistenieDlazbyQuoteForm from "@/components/site/CistenieDlazbyQuoteForm";
import FloatingQuoteButton from "@/components/site/FloatingQuoteButton";
import ServiceRealizationGallery from "@/components/site/ServiceRealizationGallery";
import QuoteScrollButton from "@/components/site/QuoteScrollButton";
import ServiceIntroSection from "@/components/site/ServiceIntroSection";
import { SERVICE_PAGE_MEDIA } from "@/lib/service-page-media";
import { PAGE_OVERRIDES } from "@/lib/site-navigation";

export const metadata: Metadata = {
  title: "Čistenie dlažby | ESPRON",
  description:
    "Vysokotlakové čistenie dlažby, chodníkov, príjazdových ciest a parkovísk. Ponúkame na východnom Slovensku. Cena 2 – 7 EUR/m².",
};

export const revalidate = 0;

const WHY = [
  {
    title: "Zvýšenie estetiky a hodnoty vašej nehnuteľnosti",
    desc: "Dlažba bude vyzerať ako nová, bez škvŕn, šmúh alebo zafarbenia.",
  },
  {
    title: "Predĺženie životnosti a funkčnosti vašej dlažby",
    desc: "Dlažba bude lepšie odolávať poveternostným vplyvom, mechanickému poškodeniu a nárazom.",
  },
  {
    title: "Zlepšenie bezpečnosti",
    desc: "Dlažba nebude klzká, nerovná alebo popraskaná, čo môže spôsobiť úrazy alebo pády.",
  },
];

const MEDIA = SERVICE_PAGE_MEDIA["/cistenie-dlazby"];
const CATEGORY = PAGE_OVERRIDES["/cistenie-dlazby"].eyebrow;

export default function CistenieDlazbyPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary-dark pb-18 pt-28 text-white md:pb-24 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_34%),linear-gradient(120deg,rgba(255,255,255,0.06),transparent_26%)]" />
 <div className="relative mx-auto w-[92%]">
          <p className="animate-fade-up text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">
            {CATEGORY}
          </p>
          <h1 className="animate-fade-up-delay-1 mt-5 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            Čistenie dlažby
          </h1>
          <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
            Chcete, aby vaša dlažba, chodník, príjazdová cesta, alebo parkovisko bolo opäť čisté, pekné a bezpečné? Práve pre vás je určená naša služba vysokotlakového čistenia dlažby.
          </p>
          <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap gap-3">
            <QuoteScrollButton className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary transition-colors hover:bg-white/90">
              Kontaktovať nás
            </QuoteScrollButton>
            <Link href="mailto:info@espron.sk" className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-white/10">
              Napísať e-mail
            </Link>
          </div>
        </div>
      </section>

      <ServiceIntroSection
        eyebrow={CATEGORY}
        title="Čistenie dlažby, ktoré znovu ukáže farbu povrchu"
        subtitle="Chodník, dvor alebo príjazdová cesta môžu pôsobiť čisto a bezpečne."
        description="Vysokotlakovým čistením odstránime nánosy špiny, machov, plesní a olejových škvŕn bez zbytočného poškodzovania dlažby."
        bullets={[
          "Čistenie chodníkov, príjazdových ciest a dvorov",
          "Moderná technika a ekologické prostriedky",
          "Cena podľa veľkosti, typu a stavu dlažby",
        ]}
        imageSrc={MEDIA.preview}
        imageAlt="Čistenie dlažby"
      />

      {/* ── COVERAGE ─────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-light py-10">
        <AnimateOnScroll className="mx-auto w-[92%]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
            Ponúkame na východnom Slovensku
          </p>
          <p className="mt-2 text-sm leading-7 text-foreground/65">
            V mestách Prešov, Poprad a Spišská Nová Ves.
          </p>
        </AnimateOnScroll>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid w-[92%] grid-cols-1 gap-8 sm:grid-cols-[1.2fr_0.8fr] sm:items-center lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <AnimateOnScroll className="mb-6">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
                Čistenie dlažby
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Efektívne riešenie pre váš dvor
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={80}>
              <p className="text-sm leading-7 text-foreground/70">
                Čistenie dlažby spočíva v odstránení všetkých nečistôt, machov, plesní a olejov. Na dlažbu aplikujeme vodu pod vysokým tlakom, ktorá odstráni všetky tieto nečistoty. Používame moderné technológie a ekologické prostriedky, ktoré neškodia vašej dlažbe ani životnému prostrediu.
              </p>
            </AnimateOnScroll>
          </div>
          <AnimateOnScroll
            delay={120}
            className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-border bg-light sm:aspect-square lg:aspect-[4/3]"
          >
            <Image
              src={MEDIA.items[0].image}
              alt={MEDIA.items[0].alt}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 40vw, 100vw"
              className="object-cover"
            />
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── WHY ──────────────────────────────────────────────────────── */}
      <section className="bg-light py-20 md:py-28">
        <div className="mx-auto w-[92%]">
          <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:items-start">
            <div>
              <AnimateOnScroll className="mb-10">
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
                    Čistenie dlažby
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    Prečo si nechať vyčistiť dlažbu?
                  </h2>
                </div>
              </AnimateOnScroll>

              <div className="grid gap-6">
                {WHY.map((item, index) => (
                  <AnimateOnScroll key={item.title} delay={index * 80}>
                    <div className="rounded-[1.5rem] border border-border bg-white p-8 shadow-[0_12px_40px_rgba(15,29,74,0.04)]">
                      <h3 className="mb-3 text-base font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-7 text-foreground/70">
                        {item.desc}
                      </p>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>

            <AnimateOnScroll
              delay={120}
              className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-border bg-white shadow-[0_20px_60px_rgba(0,0,0,0.05)] lg:mt-10"
            >
              <Image
                src={MEDIA.items[1].image}
                alt={MEDIA.items[1].alt}
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid w-[92%] gap-6 lg:max-w-5xl lg:grid-cols-[minmax(0,1fr)_320px] lg:items-stretch">
          <div>
            <AnimateOnScroll className="mb-8">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
                Čistenie dlažby
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Cena
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={80}>
              <div className="rounded-[1.5rem] border border-border bg-white p-8 shadow-[0_12px_40px_rgba(15,29,74,0.05)]">
                <p className="text-sm leading-7 text-foreground/70">
                  Cena čistenia dlažby závisí od veľkosti, typu, stavu a materiálu vašej dlažby a od toho, aké metódy a prostriedky použijeme na jej čistenie. Na základe vašich požiadaviek vám ponúkneme nezáväznú cenovú ponuku.
                </p>
                <div className="mt-6">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/60">
                    Cena sa pohybuje v rozmedzí
                  </p>
                  <p className="text-3xl font-extrabold text-primary">2 – 7 EUR/m²</p>
                </div>
                <p className="mt-6 text-sm text-foreground/55">
                  Po akceptovaní cenovej ponuky si stanovíme termín realizácie. Pred nástupom sa zaplatí záloha.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
          <AnimateOnScroll
            delay={140}
            className="relative min-h-[280px] overflow-hidden rounded-[1.75rem] border border-border bg-light"
          >
            <Image
              src={MEDIA.items[2].image}
              alt={MEDIA.items[2].alt}
              fill
              sizes="(min-width: 1024px) 320px, 100vw"
              className="object-cover"
            />
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────────────── */}
      <section
        id="cenova-ponuka"
        className="scroll-mt-32 bg-light py-20 md:scroll-mt-40 md:py-28"
      >
        <AnimateOnScroll className="mx-auto w-[92%] max-w-3xl">
          <div className="mb-3">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
              Čistenie dlažby
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Ako nás kontaktovať?
            </h2>
          </div>
          <p className="mb-10 text-sm text-foreground/55">
            Po obdržaní informácií vám pošleme cenovú ponuku max do 5 dní (zvyčajne do 1–2 dní).
          </p>
          <CistenieDlazbyQuoteForm />
        </AnimateOnScroll>
      </section>
      <ServiceRealizationGallery
        serviceSlug="cistenie-dlazby"
        title="Realizácie čistenia dlažby"
      />
      <FloatingQuoteButton />
    </>
  );
}
