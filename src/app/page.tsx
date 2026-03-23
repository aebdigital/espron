import Header from "@/components/Header";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Parallax from "@/components/Parallax";
import HeroParallax from "@/components/HeroParallax";
import ImageReveal from "@/components/ImageReveal";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    category: "Stavebné práce",
    items: ["Zatepľovacie práce", "Sadrokartónové práce", "Ručné omietky"],
    image: "/images/realizacie/b0408c_2883303b07a4489798740af9878cc2db~mv2.avif",
  },
  {
    category: "Architektonické služby",
    items: ["Interiérový dizajn"],
    image: "/images/interier.jpg",
  },
  {
    category: "Čistiace práce",
    items: ["Čistenie fasády", "Čistenie dlažby", "Tepovanie"],
    image: "/images/cistenie.jpg",
  },
];

const reasons = [
  {
    title: "Odbornosť",
    desc: "Práce vykonávané pod dohľadom autorizovaného stavbyvedúceho na Slovensku a v Česku.",
    image: "/images/odbornost.jpg",
  },
  {
    title: "Viac ako 10 rokov skúseností",
    desc: "S viac ako desaťročnou praxou v stavebníctve sme schopní poskytnúť odborné poradenstvo a konzultácie aj pre váš projekt.",
    image: "/images/skusenosti.jpg",
  },
  {
    title: "Špecialisti na interiér a exteriér",
    desc: "Ponúkame komplexné stavebné práce, vrátane interiérových a exteriérových úprav. S našou skúsenou interiérovou dizajnérkou dokážeme vytvoriť esteticky príjemné a praktické priestory.",
    image: "/images/interier-ext.jpg",
  },
  {
    title: "Pôsobíme po celom Slovensku",
    desc: "V mestách Bratislava, Nitra, Košice, Prešov, Poprad, Spišská Nová Ves, Žilina, Banská Bystrica, Trnava, Trenčín, Martin, Liptovský Mikuláš a ich okolí.",
    image: "/images/slovensko.jpg",
  },
  {
    title: "Cenová ponuka do 48h",
    desc: "Po obdržaní všetkých potrebných dokumentov vypracujeme nezáväznú cenovú ponuku do 48 hodín.",
    image: "/images/ponuka.jpg",
  },
  {
    title: "Férové jednanie a priateľský prístup",
    desc: "Veríme, že otvorená komunikácia a transparentnosť sú kľúčom k úspešnej spolupráci.",
    image: "/images/ferove.jpg",
  },
];

const projects = [
  {
    num: "01",
    title: "Ako si zatepliť fasádu svojpomocne?",
    desc: "Praktický návod na postup pri zatepľovaní fasády svojpomocne. Čo budete potrebovať, aké materiály zvoliť a na čo si dať pozor?",
    link: "Pozrieť postup",
    image: "/images/realizacie/b0408c_2883303b07a4489798740af9878cc2db~mv2.avif",
  },
  {
    num: "02",
    title: "Zateplenie fasády v Hlohovci",
    desc: "Rekonštrukcia staršieho domu s použitím minerálnej vlny. Výzvy jesenného zatepľovania a nečakané opravy balkóna a striešky.",
    link: "Pozrieť realizáciu",
    image: "/images/realizacie/b0408c_e892b2d0c5ec4ceebc9fec9218ba13c5~mv2.avif",
  },
  {
    num: "03",
    title: "Zateplenie fasády v Trnave",
    desc: "Letné zatepľovanie so sivým a bielym polystyrénom. Ako sme riešili prístavbu z Ytongu a čelili vysokým teplotám pri práci?",
    link: "Pozrieť realizáciu",
    image: "/images/realizacie/b0408c_fdbfe48c629c4b9ca41b1651bc21cf79~mv2.avif",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      {/* ═══════ HERO — Sticky with rollover effect ═══════ */}
      <section id="top" className="sticky top-0 h-[100vh] w-full flex items-center overflow-hidden z-0">
        <HeroParallax speed={0.1}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero.jpg"
            alt="Stavebné práce"
            className="w-full h-full object-cover"
          />
        </HeroParallax>
        <div className="absolute inset-0 bg-primary/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 via-primary/40 to-transparent" />

        <div className="relative z-10 w-[95vw] mx-auto px-6 md:px-10">
          <p className="animate-fade-up text-white/50 text-sm font-medium tracking-[0.3em] uppercase mb-8">
            Stavebné práce · Architektonické služby · Čistiace práce
          </p>
          <h1 className="animate-fade-up-delay-1 text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white leading-[0.95] tracking-tight">
            Staviate?
            <br />
            <span className="font-light text-white/70">Stavajte s nami.</span>
          </h1>
          <p className="animate-fade-up-delay-2 mt-10 text-lg md:text-xl text-white/50 font-light max-w-xl leading-relaxed">
            Viac ako 10 rokov skúseností v stavebníctve. Špecializujeme sa na 
            <span className="text-white"> zatepľovacie a sadrokartónové práce, ručné omietky, interiérový dizajn </span> a kompletné 
            <span className="text-white"> čistiace služby.</span>
          </p>
          <div className="animate-fade-up-delay-3 mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="#kontakt"
              className="group inline-flex items-center justify-center px-10 py-4 bg-white text-primary text-sm font-semibold rounded-full hover:bg-white/90 transition-all duration-300"
            >
              <span className="hover-split-text">
                <span className="hover-split-text-inner" data-text="Získať cenovú ponuku">Získať cenovú ponuku</span>
              </span>
            </Link>
            <Link
              href="#sluzby"
              className="group inline-flex items-center justify-center px-10 py-4 border border-white/30 text-white text-sm font-light rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <span className="hover-split-text">
                <span className="hover-split-text-inner" data-text="Naše služby">Naše služby</span>
              </span>
            </Link>
          </div>
        </div>

        <div className="animate-fade-up-delay-4 absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-2.5 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT — rolls over HERO ═══════ */}
      <div className="relative z-10 bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
        {/* ═══════ SERVICES ═══════ */}
        <section id="sluzby" className="relative py-28 md:py-36 bg-white z-20">
          <div className="mx-auto w-[95vw] px-6 md:px-10">
            <AnimateOnScroll>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                Naše služby
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                Čo pre vás<br />môžeme urobiť
              </h2>
            </AnimateOnScroll>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <AnimateOnScroll key={service.category} delay={i * 120}>
                  <div className="group relative rounded-3xl overflow-hidden bg-white border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                    <div className="relative aspect-[16/10]">
                      <ImageReveal delay={i * 100} className="w-full h-full">
                        <Image
                          src={service.image}
                          alt={service.category}
                          fill
                          className="object-cover transition-transform duration-700"
                        />
                      </ImageReveal>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                      <h3 className="absolute bottom-5 left-6 text-xl font-black text-white pointer-events-none">
                        {service.category}
                      </h3>
                    </div>
                    <div className="p-7">
                      <ul className="space-y-3">
                        {service.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-3 text-sm font-light text-muted"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ WHY US — with photos and boxes ═══════ */}
        <section id="preco" className="py-28 md:py-36 bg-light">
          <div className="mx-auto w-[95vw] px-6 md:px-10">
            <AnimateOnScroll>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
                <div>
                  <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                    Prečo my
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                    Prečo si vybrať nás?
                  </h2>
                </div>
                <p className="text-base font-light text-muted max-w-md leading-relaxed">
                  Kombinácia odbornosti, skúseností a férového prístupu — to je základ našej spolupráce s klientmi.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Top row — 2 large cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {reasons.slice(0, 2).map((reason, i) => (
                <AnimateOnScroll key={reason.title} delay={i * 100}>
                  <div className="group relative rounded-3xl overflow-hidden h-[400px] cursor-default">
                    <ImageReveal delay={i * 150} className="w-full h-full">
                      <Image
                        src={reason.image}
                        alt={reason.title}
                        fill
                        className="object-cover transition-transform duration-700"
                      />
                    </ImageReveal>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/40 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/70 mb-4">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {reason.title}
                      </h3>
                      <p className="text-sm font-light text-white/70 leading-relaxed max-w-md">
                        {reason.desc}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Bottom row — 4 smaller cards with photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {reasons.slice(2).map((reason, i) => (
                <AnimateOnScroll key={reason.title} delay={(i + 2) * 100}>
                  <div className="group relative bg-white rounded-3xl overflow-hidden border border-border hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                    <div className="relative h-48">
                      <ImageReveal delay={(i + 2) * 100} className="w-full h-full">
                        <Image
                          src={reason.image}
                          alt={reason.title}
                          fill
                          className="object-cover transition-transform duration-700"
                        />
                      </ImageReveal>
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
                      <span className="absolute top-4 left-4 inline-block px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white z-10">
                        {String(i + 3).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="p-6 -mt-6 relative">
                      <h3 className="text-base font-bold text-foreground mb-2">
                        {reason.title}
                      </h3>
                      <p className="text-sm font-light text-muted leading-relaxed">
                        {reason.desc}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ FULL WIDTH IMAGE BREAK ═══════ */}
        <section className="relative h-[50vh] overflow-hidden">
          <Parallax speed={0.15} className="absolute inset-0 w-full h-[130%] -top-[15%]">
            <ImageReveal grayscale={true} className="w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero2.jpg"
                alt="Stavebné práce detail"
                className="w-full h-full object-cover"
              />
            </ImageReveal>
          </Parallax>
          <div className="absolute inset-0 bg-primary/60" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <AnimateOnScroll>
              <div className="text-center px-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                  Viac ako 10 rokov skúseností
                </h2>
                <p className="mt-4 text-lg font-light text-white/50">
                  Po celom Slovensku a Česku
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ═══════ PROJECTS / BLOG ═══════ */}
        <section id="realizacie" className="py-28 md:py-36">
          <div className="mx-auto w-[95vw] px-6 md:px-10">
            <AnimateOnScroll>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                Z praxe
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                Zateplenie v praxi
              </h2>
              <p className="mt-4 text-base font-light text-muted max-w-xl">
                Tipy, postupy a naše skúsenosti
              </p>
            </AnimateOnScroll>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <AnimateOnScroll key={project.num} delay={i * 120}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500">
                      <ImageReveal delay={i * 200} className="w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700"
                        />
                      </ImageReveal>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute top-5 left-5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary z-10">
                        {project.num}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm font-light text-muted leading-relaxed mb-4">
                      {project.desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group">
                      <span className="hover-split-text">
                        <span className="hover-split-text-inner" data-text={project.link}>{project.link}</span>
                      </span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ CTA + FOOTER combined ═══════ */}
        <footer id="kontakt" className="relative overflow-hidden">
          {/* Background hero photo — visible at top, fades to solid primary */}
          <div className="absolute inset-0 opacity-40">
            <ImageReveal grayscale={true} className="w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </ImageReveal>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/90 to-primary" />

          <div className="relative z-10">
            {/* CTA */}
            <div className="py-20 md:py-28 text-center">
              <div className="mx-auto w-[95vw] max-w-4xl px-6 md:px-10">
                <AnimateOnScroll>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                    Máte projekt na mysli?
                  </h2>
                  <p className="mt-6 text-lg font-light text-white/50 leading-relaxed max-w-lg mx-auto">
                    Kontaktujte nás a získajte nezáväznú cenovú ponuku do 48 hodín.
                  </p>
                  <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="tel:+421944624685"
                      className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-primary text-sm font-semibold rounded-full hover:bg-white/90 transition-all duration-300"
                    >
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="hover-split-text">
                        <span className="hover-split-text-inner" data-text="+421 944 624 685">+421 944 624 685</span>
                      </span>
                    </Link>
                    <Link
                      href="mailto:info@espron.sk"
                      className="group inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-white/30 text-white text-sm font-light rounded-full hover:bg-white/10 transition-all duration-300"
                    >
                      <span className="hover-split-text">
                        <span className="hover-split-text-inner" data-text="info@espron.sk">info@espron.sk</span>
                      </span>
                    </Link>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>

            {/* Divider */}
            <div className="mx-auto w-[95vw] px-6 md:px-10">
              <div className="border-t border-white/10" />
            </div>

            {/* Footer content */}
            <div className="mx-auto w-[95vw] px-6 md:px-10 py-14">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                <div>
                  <h4 className="text-sm font-semibold tracking-wider uppercase mb-6 text-white/50">
                    Adresa
                  </h4>
                  <p className="text-sm font-light leading-relaxed text-white/70">
                    ESPRON s.r.o<br />
                    IČO: 50915380<br />
                    Slovenská 31<br />
                    Spišská Nová Ves, 05201 - Slovensko
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wider uppercase mb-6 text-white/50">
                    Kontaktné údaje
                  </h4>
                  <div className="space-y-3">
                    <Link href="tel:+421944624685" className="block text-sm font-light text-white/70 hover:text-white transition-colors">
                      +421 944 624 685
                    </Link>
                    <Link href="mailto:info@espron.sk" className="block text-sm font-light text-white/70 hover:text-white transition-colors">
                      info@espron.sk
                    </Link>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wider uppercase mb-6 text-white/50">
                    Doba kedy nás môžete kontaktovať
                  </h4>
                  <p className="text-sm font-light text-white/70">Po – Pi</p>
                  <p className="text-sm font-light text-white/70">8:00 – 17:00</p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs font-light text-white/30">©2023 – 2026 by ESPRON</p>
                <div className="flex gap-6">
                  <Link href="#" className="text-xs font-light text-white/30 hover:text-white/60 transition-colors">Domov</Link>
                  <Link href="#sluzby" className="text-xs font-light text-white/30 hover:text-white/60 transition-colors">Služby</Link>
                  <Link href="#kontakt" className="text-xs font-light text-white/30 hover:text-white/60 transition-colors">Kontakt</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
