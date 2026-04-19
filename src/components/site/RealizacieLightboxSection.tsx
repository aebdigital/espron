"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { LegacyGalleryItem } from "@/lib/legacy-gallery-data";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: LegacyGalleryItem[];
  columns?: 3 | 4;
};

const easing = [0.16, 1, 0.3, 1] as const;

export default function RealizacieLightboxSection({
  eyebrow = "Realizácie",
  title,
  description,
  items,
  columns = 3,
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(() => new Set());

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () =>
      setActiveIndex((idx) =>
        idx === null ? null : (idx + 1) % items.length,
      ),
    [items.length],
  );
  const markImageLoaded = useCallback((image: string) => {
    setLoadedImages((previousImages) => {
      if (previousImages.has(image)) return previousImages;
      const nextImages = new Set(previousImages);
      nextImages.add(image);
      return nextImages;
    });
  }, []);
  const prev = useCallback(
    () =>
      setActiveIndex((idx) =>
        idx === null ? null : (idx - 1 + items.length) % items.length,
      ),
    [items.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") next();
      else if (event.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, close, next, prev]);

  if (items.length === 0) return null;

  const gridClassName =
    columns === 4
      ? "sm:grid-cols-2 xl:grid-cols-4"
      : "sm:grid-cols-2 xl:grid-cols-3";
  const sizes =
    columns === 4
      ? "(min-width: 1280px) 22vw, (min-width: 640px) 44vw, 92vw"
      : "(min-width: 1280px) 30vw, (min-width: 640px) 44vw, 92vw";

  const active = activeIndex !== null ? items[activeIndex] : null;
  const activeIsLoaded = active ? loadedImages.has(active.image) : false;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto w-[92%]">
        <AnimateOnScroll className="mb-14 max-w-3xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
            {eyebrow}
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-sm leading-7 text-foreground/60">{description}</p>
          ) : null}
        </AnimateOnScroll>

        <div className={`grid gap-5 ${gridClassName}`}>
          {items.map((item, index) => (
            <AnimateOnScroll key={`${item.title}-${item.image}`} delay={index * 60}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group block w-full overflow-hidden rounded-[1.75rem] border border-border bg-white text-left shadow-[0_12px_40px_rgba(15,29,74,0.06)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/40"
                aria-label={`Otvoriť: ${item.title}`}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes={sizes}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/15 to-transparent" />
                  {item.kind === "video" ? (
                    <div className="absolute right-4 top-4 rounded-full bg-white/14 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                      Video
                    </div>
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-sm font-semibold text-white md:text-base">
                      {item.title}
                    </p>
                  </div>
                </div>
              </button>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
            role="dialog"
            aria-modal="true"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: easing }}
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); close(); }}
              className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Zavrieť"
            >
              ×
            </button>
            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
                  aria-label="Predchádzajúca"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
                  aria-label="Nasledujúca"
                >
                  ›
                </button>
              </>
            ) : null}
            <motion.figure
              className="relative max-h-[90vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.28, ease: easing }}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] bg-white/[0.03]">
                <AnimatePresence>
                  {!activeIsLoaded ? (
                    <motion.div
                      key="loader"
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="relative h-14 w-14 rounded-full border border-white/15">
                        <div className="absolute inset-1 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      </div>
                      <span className="sr-only">Načítanie obrázka</span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                <motion.div
                  key={active.image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{
                    opacity: activeIsLoaded ? 1 : 0,
                    scale: activeIsLoaded ? 1 : 0.985,
                  }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.32, ease: easing }}
                >
                  <Image
                    src={active.image}
                    alt={active.alt}
                    fill
                    sizes="(min-width: 1024px) 82vw, 94vw"
                    className="object-contain"
                    loading="eager"
                    fetchPriority="high"
                    onLoad={() => markImageLoaded(active.image)}
                  />
                </motion.div>
              </div>
              {active.title ? (
                <figcaption className="mt-3 text-center text-sm text-white/80">
                  {active.title}
                </figcaption>
              ) : null}
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
