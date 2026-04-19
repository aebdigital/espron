import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import FloatingQuoteButton from "@/components/site/FloatingQuoteButton";
import ServiceRealizationGallery from "@/components/site/ServiceRealizationGallery";
import QuoteScrollButton from "@/components/site/QuoteScrollButton";
import RucneOmietkyQuoteForm from "@/components/site/RucneOmietkyQuoteForm";
import ServiceIntroSection from "@/components/site/ServiceIntroSection";
import { SERVICE_PAGE_MEDIA } from "@/lib/service-page-media";
import { PAGE_OVERRIDES } from "@/lib/site-navigation";

export const metadata: Metadata = {
  title: "Ručné omietky | ESPRON",
  description:
    "Ručné omietky pre rekonštrukcie a menšie objekty. Ponúkame po celom Slovensku. Cena od 12 EUR za m².",
};

export const revalidate = 0;

const CITIES =
  "Bratislava, Nitra, Košice, Prešov, Poprad, Spišská Nová Ves, Žilina, Banská Bystrica, Trnava, Trenčín, Martin, Liptovský Mikuláš a ich okolí";

const STEPS = [
  {
    num: "1",
    title: "Príprava povrchu",
    desc: "Odstránime prach a nečistoty. Ak sú na stenách väčšie nerovnosti, vyrovnáme ich jadrovou omietkou.",
  },
  {
    num: "2",
    title: "Základný (penetračný) náter",
    desc: "Pred aplikáciou omietky nanesieme základný náter. Tento krok zabezpečuje lepšiu priľnavosť omietky na povrch.",
  },
  {
    num: "3",
    title: "Aplikácia a vyhladenie omietky",
    desc: "Omietku nanesieme na stenu pomocou hladítka alebo špachtle. Po nanesení omietky ju vyhladzujeme a odstraňujeme prebytočnú omietku, čím vytvoríme požadovaný povrch.",
  },
  {
    num: "4",
    title: "Dokončenie",
    desc: "Po vyschnutí je povrch možné ešte jemne prebrúsiť brúsivom alebo jemným šmirglom.",
  },
];

const WHY = [
  {
    title: "Kontrola textúry a štruktúry",
    desc: "Pri ručnom omietaní môžeme kontrolovať textúru a drsnosť povrchu.",
  },
  {
    title: "Variabilné využitie",
    desc: "Ich tradičná jemná štruktúra sa hodí do každého interiéru aj exteriéru. Sú vhodné pri rekonštrukciách (na staré murivo) a na menšie plochy.",
  },
  {
    title: "Vhodné do miestností so zvýšenou vlhkosťou",
    desc: "Ručné omietky sú vhodné aj do miestností zaťažených vlhkosťou, ako sú kúpeľne alebo garáže.",
  },
];

const MEDIA = SERVICE_PAGE_MEDIA["/rucne-omietky"];
const CATEGORY = PAGE_OVERRIDES["/rucne-omietky"].eyebrow;

export default function RucneOmietkyPage() {
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
            Ručné omietky
          </h1>
          <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
            Ručné omietky sú vhodným riešením pri rekonštrukciách alebo menších objektoch s plochou do 200 m².
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
        title="Ručné omietky pre rekonštrukcie a menšie objekty"
        subtitle="Rovný povrch tam, kde sa veľká strojová realizácia neoplatí."
        description="Ručné omietky sú vhodné pri úpravách staršieho muriva, menších plochách a miestach, kde potrebujete lepšiu kontrolu nad detailom aj výslednou štruktúrou."
        bullets={[
          "Príprava podkladu a penetračný náter",
          "Ručné nanesenie a vyhladenie omietky",
          "Vhodné pre rekonštrukcie a plochy do 200 m²",
        ]}
        imageSrc={MEDIA.preview}
        imageAlt="Ručné omietky"
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
          <div className="mb-14">
            <AnimateOnScroll>
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
                  Ručné omietky
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  Postup prác
                </h2>
              </div>
            </AnimateOnScroll>
          </div>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="grid grid-cols-1 gap-6">
              {STEPS.map((s, index) => (
                <AnimateOnScroll key={s.num} delay={index * 80}>
                  <div className="rounded-[1.5rem] border border-border bg-white p-6 shadow-[0_8px_30px_rgba(15,29,74,0.04)] sm:p-8">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-extrabold text-primary">{s.num}</span>
                      </div>
                      <h3 className="text-base font-bold text-foreground leading-tight">{s.title}</h3>
                    </div>
                    <p className="text-sm leading-7 text-foreground/70 sm:ml-14">{s.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
            <AnimateOnScroll
              delay={120}
              className="relative hidden aspect-[3/4] overflow-hidden rounded-[1.75rem] border border-border bg-light lg:block"
            >
              <Image
                src={MEDIA.items[0].image}
                alt={MEDIA.items[0].alt}
                fill
                sizes="(min-width: 1024px) 450px, 100vw"
                className="object-cover"
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── WHY ──────────────────────────────────────────────────────── */}
      <section className="bg-light py-20 md:py-28">
        <div className="mx-auto w-[92%]">
          <div className="mb-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
            <AnimateOnScroll>
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
                  Ručné omietky
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  Prečo použiť ručné omietky namiesto strojových?
                </h2>
              </div>
            </AnimateOnScroll>
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
          </div>
          <div className="grid gap-6 md:grid-cols-3">
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
                Ručné omietky
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Cena
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={80}>
              <div className="rounded-[1.5rem] border border-border bg-white p-8 shadow-[0_12px_40px_rgba(15,29,74,0.05)]">
                <p className="text-sm leading-7 text-foreground/70">
                  Cena závisí od typu omietky, hrúbky vrstvy a od rozsahu prípravných prác predchádzajúcim omietaniu. Na základe poskytnutých informácií vám ponúkneme nezáväznú cenovú ponuku.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/60">Cena za prácu</p>
                    <p className="mt-1 text-2xl font-extrabold text-primary">od 12 EUR/m²</p>
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
              Ručné omietky
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Ako nás kontaktovať?
            </h2>
          </div>
          <p className="mb-10 text-sm text-foreground/55">
            Po obdržaní informácií vám pošleme cenovú ponuku max do 5 dní (zvyčajne do 1–2 dní). Tá bude obsahovať odhadované náklady na omietacie práce a materiál.
          </p>
          <RucneOmietkyQuoteForm />
        </AnimateOnScroll>
      </section>
      <ServiceRealizationGallery
        serviceSlug="rucne-omietky"
        title="Realizácie ručných omietok"
      />
      <FloatingQuoteButton />
    </>
  );
}
