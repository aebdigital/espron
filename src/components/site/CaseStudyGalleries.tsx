"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";

type GalleryItem = {
  title: string;
  description?: string;
  alt: string;
  image: string;
};

const easing = [0.16, 1, 0.3, 1] as const;

export function HoverGallery({ title, items }: { title: string; items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <AnimateOnScroll>
        <section className="mx-auto w-[92%] max-w-[1120px] pb-14 text-primary md:pb-16">
          <h3 className="mb-7 text-center text-3xl font-semibold leading-tight tracking-tight md:text-[2.35rem]">
            {title}
          </h3>
          <div className="grid gap-3 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item, index) => (
              <figure
                key={item.title}
                tabIndex={0}
                onClick={() => setActiveIndex(index)}
                className="group relative min-h-[310px] cursor-pointer overflow-hidden bg-primary text-white outline-none md:min-h-[390px]"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 92vw"
                  className="object-cover transition duration-700 group-hover:scale-105 group-focus:scale-105"
                />
                <figcaption className="absolute inset-0 flex items-center justify-center bg-primary/80 px-7 text-center opacity-100 transition duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus:opacity-100">
                  <div className="max-w-md">
                    <h4 className="text-xl font-semibold leading-tight text-white md:text-2xl">
                      {item.title}
                    </h4>
                    {item.description ? (
                      <p className="mt-4 text-sm leading-7 text-white/90">
                        {item.description}
                      </p>
                    ) : null}
                    <span className="mt-6 inline-block text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                      Kliknite pre zväčšenie
                    </span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </AnimateOnScroll>

      <Lightbox
        items={items}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNext={() => setActiveIndex((idx) => (idx === null ? null : (idx + 1) % items.length))}
        onPrev={() => setActiveIndex((idx) => (idx === null ? null : (idx - 1 + items.length) % items.length))}
      />
    </>
  );
}

export function BeforeAfterGallery({ title, items }: { title: string; items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <AnimateOnScroll>
        <section className="mx-auto w-[92%] max-w-[1240px] pb-16 text-primary md:pb-20">
          <div className="mx-auto mb-8 max-w-[820px] border-t-2 border-primary/90 pt-12">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-[2.4rem]">
              {title}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => (
              <figure
                key={item.title}
                onClick={() => setActiveIndex(index)}
                className="cursor-pointer overflow-hidden border border-primary/10 bg-white"
              >
                <div className="relative aspect-square bg-light">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 92vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <figcaption className="flex min-h-20 items-center justify-center bg-primary px-5 py-4 text-center text-sm font-medium leading-6 text-white md:text-[15px]">
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </AnimateOnScroll>

      <Lightbox
        items={items}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNext={() => setActiveIndex((idx) => (idx === null ? null : (idx + 1) % items.length))}
        onPrev={() => setActiveIndex((idx) => (idx === null ? null : (idx - 1 + items.length) % items.length))}
      />
    </>
  );
}

function Lightbox({
  items,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const markImageLoaded = useCallback((image: string) => {
    setLoadedImages((prev) => new Set(prev).add(image));
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeIndex, onClose, onNext, onPrev]);

  const active = activeIndex !== null ? items[activeIndex] : null;
  const isLoaded = active ? loadedImages.has(active.image) : false;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            className="absolute right-6 top-6 z-[101] text-white text-4xl leading-none hover:text-white/70"
            onClick={onClose}
          >
            &times;
          </button>
          
          {items.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 z-[101] -translate-y-1/2 p-4 text-white text-4xl leading-none hover:text-white/70"
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
              >
                &#8249;
              </button>
              <button
                className="absolute right-4 top-1/2 z-[101] -translate-y-1/2 p-4 text-white text-4xl leading-none hover:text-white/70"
                onClick={(e) => { e.stopPropagation(); onNext(); }}
              >
                &#8250;
              </button>
            </>
          )}

          <motion.div
            className="relative h-full w-full max-w-6xl max-h-[85vh] flex flex-col items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: easing }}
            onClick={(e) => e.stopPropagation()}
          >
             <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={active.image}
                  alt={active.alt}
                  fill
                  className={`object-contain transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => markImageLoaded(active.image)}
                />
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                  </div>
                )}
             </div>
             {active.title && (
               <div className="mt-4 text-center">
                  <h4 className="text-white text-lg font-semibold">{active.title}</h4>
                  {active.description && <p className="text-white/70 text-sm mt-1 max-w-2xl">{active.description}</p>}
               </div>
             )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
