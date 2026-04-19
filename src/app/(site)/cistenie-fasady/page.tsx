import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import CistenieFasadyQuoteForm from "@/components/site/CistenieFasadyQuoteForm";
import FloatingQuoteButton from "@/components/site/FloatingQuoteButton";
import ServiceRealizationGallery from "@/components/site/ServiceRealizationGallery";
import QuoteScrollButton from "@/components/site/QuoteScrollButton";
import ServiceIntroSection from "@/components/site/ServiceIntroSection";
import { CISTENIE_FASADY_REALIZATIONS } from "@/lib/legacy-gallery-data";
import { PAGE_OVERRIDES } from "@/lib/site-navigation";

export const metadata: Metadata = {
  title: "Čistenie fasády | ESPRON",
  description:
    "Profesionálnym čistením sa zbavte nevzhľadných zelených škvrn, machov a plesní a eliminujte možné alergie. Čistenie fasády 5,5 – 9,5 EUR/m².",
};

export const revalidate = 0;

const PROBLEMS = [
  {
    label: "Zdravotné riziká",
    desc: "Plesne a riasy uvoľňujú spóry, ktoré môžu spôsobiť alergie a dýchacie problémy.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-1.42.71a2 2 0 01-1.42 0l-1.42-.71a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-.547 2.387a2 2 0 00.547 2.044l1.42 1.42a2 2 0 002.044.547l2.387-.477a6 6 0 003.86-.517l1.42-.71a2 2 0 011.42 0l1.42.71a6 6 0 003.86.517l2.387.477a2 2 0 002.044-.547l1.42-1.42a2 2 0 00.547-2.044l-.547-2.387z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9V4m0 0L9 7m3-3l3 3" />
      </svg>
    ),
  },
  {
    label: "Degradácia omietky",
    desc: "Korene machov a rias narúšajú štruktúru fasády, čo vedie k prasklinám a odlupovaniu.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10l.5.5m2 2l.5.5m-3 0l.5-.5m2-2l.5-.5" />
      </svg>
    ),
  },
  {
    label: "Zníženie hodnoty",
    desc: "Zanedbaný vzhľad fasády výrazne znižuje vizuálnu a trhovú hodnotu vašej nehnuteľnosti.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
  },
  {
    label: "Prienik vlhkosti",
    desc: "Narušená fasáda stráca Hydrofóbnu schopnosť, čím do stien preniká nebezpečná vlhkosť.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
    ),
  },
];

const INCLUDED = [
  {
    label: "Odborná obhliadka",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Aplikácia chémie",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-1.42.71a2 2 0 01-1.42 0l-1.42-.71a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-.547 2.387a2 2 0 00.547 2.044l1.42 1.42a2 2 0 002.044.547l2.387-.477a6 6 0 003.86-.517l1.42-.71a2 2 0 011.42 0l1.42.71a6 6 0 003.86.517l2.387.477a2 2 0 002.044-.547l1.42-1.42a2 2 0 00.547-2.044l-.547-2.387z" />
      </svg>
    ),
  },
  {
    label: "Hĺbkové čistenie",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    label: "Dôkladný oplach",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    label: "Ochranná impregnácia",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A3.33 3.33 0 0018 10.382V13c0 4.418-3.582 8-8 8s-8-3.582-8-8V10.382c0-1.129.569-2.174 1.517-2.8L10 3.167l6.483 4.415c.948.626 1.517 1.671 1.517 2.8z" />
      </svg>
    ),
  },
];

const WHY = [
  {
    title: "Odbornosť",
    desc: "Práce vykonávané pod dohľadom autorizovaného stavbyvedúceho na Slovensku a v Česku.",
  },
  {
    title: "Špecialistu na práce v interiéri a exteriéri",
    desc: "Ponúkame komplexné stavebné práce, vrátane interiérových a exteriérových úprav.",
  },
  {
    title: "Pôsobíme na celom Slovensku",
    desc: "V mestách Bratislava, Nitra, Košice, Prešov, Poprad, Spišská Nová Ves, Žilina, Banská Bystrica, Trnava, Trenčín, Martin, Liptovský Mikuláš a ich okolí.",
  },
];

const CATEGORY = PAGE_OVERRIDES["/cistenie-fasady"].eyebrow;

export default function CistenieFasadyPage() {
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
            Čistenie fasády
          </h1>
          <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
            Profesionálne čistenie fasády, ktoré odstráni machy, plesne a zelené škvrny
            a pomôže vrátiť domu čistý a udržiavaný vzhľad.
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
        eyebrow={CATEGORY}
        title="Čistenie fasády"
        subtitle="Vráťte svojmu domu pôvodný šmrnc"
        description="Profesionálnym čistením sa zbavte nevzhľadných zelených škvrn, machov a plesní a eliminujte možné alergie."
        imageSrc="/images/old-site/cistenie-fasady/tatranska-lomnica-03.webp"
        imageAlt="Čistenie fasády"
        titleSize="large"
      />

      {/* ── PROBLEMS ─────────────────────────────────────────────────── */}
      <section className="bg-light py-20 md:py-28">
        <div className="mx-auto w-[92%]">
          <AnimateOnScroll>
            <h2 className="mb-14 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Problémy spôsobené špinavou fasádou
            </h2>
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
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.26em] text-primary/55">
              Čistenie fasády
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Všetky potrebné úkony v cene
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            {INCLUDED.map((item, index) => (
              <AnimateOnScroll key={item.label} delay={index * 80}>
                <div className="flex flex-col items-center gap-5 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-white text-primary shadow-sm transition-transform hover:scale-110">
                    {item.icon}
                  </div>
                  <p className="text-sm font-bold text-foreground/80">{item.label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid w-[92%] gap-12 lg:grid-cols-2 lg:items-center">
          <AnimateOnScroll>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Kto sa o vás postará?
            </h2>
            <p className="mt-2 text-lg font-medium text-foreground/60">
              Sme ESPRON stavebná spoločnosť s ľudským prístupom
            </p>
            <p className="mt-6 text-sm leading-7 text-foreground/70">
              Rozumieme, že stavebné projekty sú finančne náročné a že za každým z nich stoja ľudia so svojimi snami a očakávaniami. Nie je to len o odbornosti, ale aj o ľudskom porozumení. Našou prioritou je transparentnosť a otvorená komunikácia s klientom.
            </p>
            <p className="mt-4 text-sm leading-7 text-foreground/70">
              Sme firma zo Spišskej Novej Vsi pôsobiaca po celom Slovensku a Česku. Poskytujeme kvalitné a odborné stavebné služby pod dohľadom certifikovaného stavbyvedúceho v oboch krajinách.
            </p>
            <Link
              href="/o-nas"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
            >
              Viac o nás a našich hodnotách
            </Link>
          </AnimateOnScroll>
          <AnimateOnScroll delay={120} className="relative hidden aspect-[3/4] max-h-[480px] overflow-hidden rounded-3xl lg:block">
            <Image
              src="/tomas.avif"
              alt="Mgr. Tomáš Richnavský"
              fill
              sizes="45vw"
              className="object-cover object-top"
            />
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── WHY ──────────────────────────────────────────────────────── */}
      <section className="bg-light py-20 md:py-28">
        <div className="mx-auto w-[92%]">
          <AnimateOnScroll>
            <h2 className="mb-14 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Prečo vyčistiť fasádu s nami?
            </h2>
          </AnimateOnScroll>
          <div className="grid gap-8 md:grid-cols-3">
            {WHY.map((item, index) => (
              <AnimateOnScroll key={item.title} delay={index * 80}>
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <svg className="h-7 w-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-6 text-foreground/65">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-[92%] max-w-3xl">
          <AnimateOnScroll>
            <h2 className="mb-10 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Cena čistenia fasády
            </h2>
            <p className="mb-8 text-sm leading-7 text-foreground/70">
              S nami nemusíte hádať, aká bude cena po tom, čo nás kontaktujete. Transparentne uvádzame rozpätie, v ktorom sa ceny pohybujú. Cena zahŕňa všetky potrebné práce, vrátane rozloženia lešenia, aplikácie čistiacich a impregnačných prostriedkov a dôkladného opláchnutia.
            </p>
          </AnimateOnScroll>
          <div className="space-y-3">
            <AnimateOnScroll delay={60}>
              <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_8px_24px_rgba(15,29,74,0.05)]">
                <span className="font-bold text-foreground">Čistenie fasády:</span>{" "}
                <span className="text-foreground/75">5,5 – 9,5 EUR/m²</span>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={120}>
              <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_8px_24px_rgba(15,29,74,0.05)]">
                <span className="font-bold text-foreground">Impregnácia fasády:</span>{" "}
                <span className="text-foreground/75">0,5 – 1,5 EUR/m²</span>
              </div>
            </AnimateOnScroll>
          </div>
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
            Po obdržaní informácií vám pošleme cenovú ponuku max do 5 dní (zvyčajne do 1–2 dní). Po akceptovaní cenovej ponuky si stanovíme termín realizácie.
          </p>
          <CistenieFasadyQuoteForm />
        </AnimateOnScroll>
      </section>
      <ServiceRealizationGallery
        serviceSlug="cistenie-fasady"
        title="Ukážky čistenia fasád"
        description="Vybrané realizácie čistenia fasád z Tatranskej Lomnice a Prakoviec."
        legacyItems={CISTENIE_FASADY_REALIZATIONS}
        columns={3}
      />
      <FloatingQuoteButton />
    </>
  );
}
