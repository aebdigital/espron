import PageHeader from "@/components/site/PageHeader";
import PageFooter from "@/components/site/PageFooter";
import CtaBanner from "@/components/site/CtaBanner";
import SmoothAnchorLink from "@/components/SmoothAnchorLink";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Parallax from "@/components/Parallax";
import HeroParallax from "@/components/HeroParallax";
import ImageReveal from "@/components/ImageReveal";
import Image from "next/image";
import Link from "next/link";
import {
  FEATURED_FACADE_IMAGE,
  INTERIOR_DESIGN_IMAGE,
  getServicePreviewImage,
} from "@/lib/service-page-media";
import { listBlogPosts } from "@/lib/cms-blog-posts";

export const dynamic = "force-dynamic";

const services = [
  { title: "Zateplenie fasády", image: FEATURED_FACADE_IMAGE, href: "/zateplenie-fasady" },
  { title: "Sadrokartónové práce", image: getServicePreviewImage("/sadrokartonove-prace", "/images/stavebne.jpg"), href: "/sadrokartonove-prace" },
  { title: "Ručné omietky", image: getServicePreviewImage("/rucne-omietky", "/images/interier-ext.jpg"), href: "/rucne-omietky" },
  { title: "Interiérový dizajn", image: INTERIOR_DESIGN_IMAGE, href: "/interierovy-dizajn" },
  { title: "Čistenie fasády", image: "/images/old-site/cistenie-fasady/tatranska-lomnica-03.webp", href: "/cistenie-fasady" },
  { title: "Čistenie dlažby", image: getServicePreviewImage("/cistenie-dlazby", "/images/realizacie/b0408c_fdbfe48c629c4b9ca41b1651bc21cf79~mv2.avif"), href: "/cistenie-dlazby" },
  { title: "Tepovanie", image: getServicePreviewImage("/tepovanie", "/images/projekt1.jpg"), href: "/tepovanie" },
];

export default async function Home() {
  const latestPosts = (await listBlogPosts()).slice(0, 3);
  const projects = latestPosts.map((post, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: post.title,
    desc: post.excerpt,
    link: "Čítať článok",
    image: post.cover_image || FEATURED_FACADE_IMAGE,
    href: `/blog/${post.slug}`,
  }));

  return (
    <>
      <PageHeader />

      {/* ═══════ HERO — Sticky with rollover effect ═══════ */}
      <section id="top" className="sticky top-0 h-screen w-full flex items-center overflow-hidden z-0">
        <HeroParallax speed={0.1}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={FEATURED_FACADE_IMAGE}
            alt="Zateplenie fasády"
            className="w-full h-full object-cover"
          />
        </HeroParallax>
        <div className="absolute inset-0 bg-primary/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 via-primary/40 to-transparent" />

 <div className="relative z-10 w-[92%] mx-auto">
          <h1 className="animate-fade-up-delay-1 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
            Stavba alebo rekonštrukcia?<br />
            <span className="font-light text-white/70">Sprevádzame vás od základov až po fasádu.</span>
          </h1>
          <p className="animate-fade-up-delay-2 mt-10 text-lg md:text-xl text-white/50 font-light max-w-xl leading-relaxed">
            Viac ako 10 rokov skúseností v stavebníctve. Špecializujeme sa na 
            <span className="text-white italic"> zatepľovacie a sadrokartónové práce, ručné omietky, interiérový dizajn </span> a kompletné 
            <span className="text-white italic"> čistiace služby.</span>
          </p>
          <div className="animate-fade-up-delay-3 mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center px-10 py-4 bg-white text-primary text-sm font-bold rounded-full hover:bg-white/90 transition-all duration-300"
            >
              <span className="hover-split-text">
                <span className="hover-split-text-inner" data-text="Získať cenovú ponuku">Získať cenovú ponuku</span>
              </span>
            </Link>
            <SmoothAnchorLink
              targetId="sluzby"
              className="group inline-flex items-center justify-center px-10 py-4 border border-white/30 text-white text-sm font-light rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <span className="hover-split-text">
                <span className="hover-split-text-inner" data-text="Naše služby">Naše služby</span>
              </span>
            </SmoothAnchorLink>
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
 <div className="mx-auto w-[92%]">
            <AnimateOnScroll>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                Naše služby
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                Čo pre vás<br />môžeme urobiť
              </h2>
            </AnimateOnScroll>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {services.map((service, i) => (
                <AnimateOnScroll key={service.href} delay={i * 60}>
                  <Link
                    href={service.href}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-primary-dark isolate"
                  >
                    <ImageReveal delay={i * 60} className="h-full w-full rounded-[inherit]">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 48vw"
                        className="object-cover"
                      />
                    </ImageReveal>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/25 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-sm font-bold text-white leading-snug">
                        {service.title}
                      </h3>
                      <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-white/60 group-hover:text-white/90 transition-colors">
                        Zistiť viac
                        <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ FULL WIDTH IMAGE BREAK ═══════ */}
        <section className="relative h-[50vh] overflow-hidden">
          <Parallax speed={0.15} className="absolute inset-0 w-full h-[130%] -top-[15%]">
            <ImageReveal grayscale={true} className="w-full h-full grayscale-permanent">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FEATURED_FACADE_IMAGE}
                alt="Detail zateplenia fasády"
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
                <p className="mt-4 text-lg font-light text-white/50 uppercase tracking-widest">
                  Po celom Slovensku a Česku
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ═══════ PROJECTS / BLOG ═══════ */}
        <section id="realizacie" className="py-28 md:py-36">
 <div className="mx-auto w-[92%]">
            <AnimateOnScroll>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                Blog
              </p>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                  Blog
                </h2>
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4">
                  Zobraziť všetky príspevky
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <p className="mt-4 text-base font-light text-muted max-w-xl">
                Tipy, postupy a naše skúsenosti
              </p>
            </AnimateOnScroll>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
              {projects.map((project, i) => {
                const inner = (
                  <>
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500">
                      <ImageReveal delay={i * 200} className="w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700"
                        />
                      </ImageReveal>
                      <span className="absolute top-5 left-5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary z-10">
                        {project.num}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 uppercase">
                      {project.title}
                    </h3>
                    <p className="text-sm font-light text-muted leading-relaxed mb-4">
                      {project.desc}
                    </p>
                    <span className={`inline-flex items-center gap-2 text-sm font-semibold ${project.href ? "text-primary" : "text-muted"}`}>
                      {project.link}
                      {project.href && (
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
                      )}
                    </span>
                  </>
                );
                return (
                  <AnimateOnScroll key={project.num} delay={i * 120}>
                    {project.href ? (
                      <Link href={project.href} className="group block cursor-pointer">
                        {inner}
                      </Link>
                    ) : (
                      <div className="group block opacity-60 select-none">
                        {inner}
                      </div>
                    )}
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>
        </section>

      </div>

      <CtaBanner />
      <PageFooter />
    </>
  );
}
