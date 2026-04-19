import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import FloatingQuoteButton from "@/components/site/FloatingQuoteButton";
import ServiceRealizationGallery from "@/components/site/ServiceRealizationGallery";
import QuoteScrollButton from "@/components/site/QuoteScrollButton";
import SadrokartonQuoteForm from "@/components/site/SadrokartonQuoteForm";
import ServiceIntroSection from "@/components/site/ServiceIntroSection";
import { SERVICE_PAGE_MEDIA } from "@/lib/service-page-media";
import { PAGE_OVERRIDES } from "@/lib/site-navigation";

export const metadata: Metadata = {
  title: "Sadrokartónové práce | ESPRON",
  description:
    "Sadrokartónové stropy a priečky pre rodinné domy, bytové domy a komerčné budovy. Ponúkame po celom Slovensku. Cena od 18 EUR za m².",
};

const CITIES =
  "Bratislava, Nitra, Košice, Prešov, Poprad, Spišská Nová Ves, Žilina, Banská Bystrica, Trnava, Trenčín, Martin, Liptovský Mikuláš a ich okolí";

const STEPS = [
  {
    num: "1",
    title: "Príprava",
    desc: "Skontrolujeme, či elektroinštalácia alebo iné stavebné prvky nebránia montáži. Následne si pomocou lasera načrtneme obrysovú čiaru po obvode miestnosti.",
  },
  {
    num: "2",
    title: "Inštalácia nosných profilov",
    desc: "Na obvodovú čiaru pripevníme UD-profily, na ktoré nalepíme samolepiace penové tesnenie pre lepšiu akustiku. UD-profily upevníme na strop pomocou rýchloskrutiek alebo hmoždinek s tým, že rozostup upevnenia nesmie byť väčší ako 80 cm a vzdialenosť od rohu miestnosti by nemala presiahnuť 20 cm.",
  },
  {
    num: "3",
    title: "Inštalácia závesov",
    desc: "Upevníme sieť závesov vo vzdialenosti max 90 cm, na ktoré sa uchytia CD-profily.",
  },
  {
    num: "4",
    title: "Vloženie izolácie (tento krok sa môže vynechať)",
    desc: "Medzi profily a strop umiestnime izoláciu čím dosiahneme zníženie tepelných strát a zlepšenie akustiky.",
  },
  {
    num: "5",
    title: "Inštalácia sadrokartónových dosiek a tmelenie",
    desc: "Osadíme sadrokartónové dosky a upevníme ich samoreznými skrutkami vo vzdialenosti max 17 cm. Na spoje dosiek nanesieme tenkú vrstvu škárovacieho tmelu a tmel rozotrieme do stratena. Do vrstvy tmelu vložíme výstužnú sklovláknitú pásku a zľahka ju pretiahneme špachtľou s tenkou vrstvou tmelu.",
  },
  {
    num: "6",
    title: "Brúsenie sadrokartónu",
    desc: "Po zaschnutí tmelu prebrúsime tmelený povrch brúsnou mriežkou. Takýto rovný a hladký povrch je pripravený na maľovanie.",
  },
];

const WHY = [
  {
    title: "Tepelná izolácia",
    desc: "Znížením stropu sadrokartónom sa zmenší objem vykurovanej miestnosti, čo vedie k efektívnejšiemu využitiu tepla a zvýšenej energetickej úspore. Ak medzi sadrokartón a strop umiestnime izoláciu, napríklad minerálnu vlnu, dokážeme eliminovať tepelné straty. Tento postup je obzvlášť vhodný pri rekonštrukcii starších priestorov alebo v nízkonákladových domoch, kde môže výrazne prispieť k zníženiu nákladov na vykurovanie.",
  },
  {
    title: "Estetický vzhľad",
    desc: "Sadrokartónový strop umožňuje elegantne zakryť nepravidelnosti na strope a zároveň poskytuje možnosť inštalácie bodových svetiel alebo zapustených LED svietidiel, čím vytvára moderný a útulný interiér.",
  },
  {
    title: "Zvuková izolácia",
    desc: "Sadrokartónový strop pomáha izolovať zvuk, čo je obzvlášť užitočné v panelových bytoch.",
  },
  {
    title: "Skrytie nevzhľadných prvkov",
    desc: "V nebytových priestoroch môžete pomocou sadrokartónu zakryť potrubia, káble a iné stavebné prvky.",
  },
];

const MEDIA = SERVICE_PAGE_MEDIA["/sadrokartonove-prace"];
const CATEGORY = PAGE_OVERRIDES["/sadrokartonove-prace"].eyebrow;

export default function SadrokartonPage() {
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
            Sadrokartónové práce
          </h1>
          <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
            Sadrokartónový strop predstavuje ideálne riešenie pre vlastníkov rodinných domov, bytových domov a komerčných budov s vysokými alebo krivými stropmi, ktorí chcú zlepšiť estetický vzhľad, akustiku alebo zvýšiť energetickú úsporu.
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
        title="Sadrokartónové práce pre čistý a pripravený interiér"
        subtitle="Stropy, priečky a zakrytie nerovností bez zbytočného chaosu."
        description="Sadrokartón je rýchle riešenie, keď potrebujete upraviť dispozíciu, znížiť vysoký strop alebo pripraviť priestor na maľovanie a finálne práce."
        bullets={[
          "Znížené stropy a sadrokartónové priečky",
          "Príprava profilov, dosiek, tmelenie a brúsenie",
          "Nacenenie podľa plochy, prístupu a detailov",
        ]}
        imageSrc={MEDIA.preview}
        imageAlt="Sadrokartónové práce"
      />

      {/* ── COVERAGE ─────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-light py-10">
        <AnimateOnScroll className="mx-auto w-[92%]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
            Ponúkame po celom Slovensku
          </p>
          <p className="mt-2 text-sm leading-7 text-foreground/65">
            V mestách {CITIES}.
          </p>
        </AnimateOnScroll>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-[92%]">
          <div className="mb-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <AnimateOnScroll>
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
                  Sadrokartónové práce
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  Postup prác
                </h2>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll
              delay={120}
              className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-border bg-light"
            >
              <Image
                src={MEDIA.items[0].image}
                alt={MEDIA.items[0].alt}
                fill
                sizes="(min-width: 1024px) 320px, 100vw"
                className="object-cover"
              />
            </AnimateOnScroll>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, index) => (
              <AnimateOnScroll key={s.num} delay={index * 70}>
                <div className="rounded-[1.5rem] border border-border bg-white p-8 shadow-[0_12px_40px_rgba(15,29,74,0.05)]">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-extrabold text-primary">{s.num}</span>
                  </div>
                  <h3 className="mb-3 text-base font-bold text-foreground">{s.title}</h3>
                  <p className="text-sm leading-7 text-foreground/70">{s.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ──────────────────────────────────────────────────────── */}
      <section className="bg-light py-20 md:py-28">
        <div className="mx-auto w-[92%]">
          <div className="mb-14 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-end">
            <AnimateOnScroll
              delay={80}
              className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-white"
            >
              <Image
                src={MEDIA.items[1].image}
                alt={MEDIA.items[1].alt}
                fill
                sizes="(min-width: 1024px) 280px, 100vw"
                className="object-cover"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
                  Sadrokartónové práce
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  Prečo si nechať znížiť strop?
                </h2>
              </div>
            </AnimateOnScroll>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {WHY.map((item, index) => (
              <AnimateOnScroll key={item.title} delay={index * 80}>
                <div className="rounded-[1.5rem] border border-border bg-white p-8 shadow-[0_12px_40px_rgba(15,29,74,0.04)]">
                  <h3 className="mb-3 text-base font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-7 text-foreground/70">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid w-[92%] gap-6 lg:max-w-5xl lg:grid-cols-[minmax(0,1fr)_320px] lg:items-stretch">
          <div>
            <AnimateOnScroll className="mb-8">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
                Sadrokartónové práce
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Cena
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={80}>
              <div className="rounded-[1.5rem] border border-border bg-white p-8 shadow-[0_12px_40px_rgba(15,29,74,0.05)]">
                <p className="text-sm leading-7 text-foreground/70">
                  Cena závisí od veľkosti plochy, rovnosti/krivosti obvodových stien a zložitosti prístupu k inštalácií. Na základe poskytnutých informácií vám ponúkneme nezáväznú cenovú ponuku.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/60">Cena za prácu</p>
                    <p className="mt-1 text-2xl font-extrabold text-primary">od 18 EUR/m²</p>
                  </div>
                </div>
                <p className="mt-6 text-sm text-foreground/55">
                  Po akceptovaní cenovej ponuky si stanovíme termín realizácie. Pred nástupom sa zaplatí záloha za materiál.
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
              Sadrokartónové práce
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Ako nás kontaktovať?
            </h2>
          </div>
          <p className="mb-10 text-sm text-foreground/55">
            Po obdržaní informácií vám pošleme cenovú ponuku max do 5 dní (zvyčajne do 1–2 dní). Tá bude obsahovať odhadované náklady na sadrokartónové práce a materiál.
          </p>
          <SadrokartonQuoteForm />
        </AnimateOnScroll>
      </section>
      <ServiceRealizationGallery
        serviceSlug="sadrokartonove-prace"
        title="Realizácie sadrokartónových prác"
      />
      <FloatingQuoteButton />
    </>
  );
}
