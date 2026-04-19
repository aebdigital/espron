import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";

type ServiceIntroNote = {
  label: string;
  body?: ReactNode;
  footer?: string;
};

type ServiceIntroSectionProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  secondaryDescription?: ReactNode;
  bullets?: string[];
  note?: ServiceIntroNote;
  meta?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  reviewLabel?: string;
  imageSrc: string;
  imageAlt: string;
  titleSize?: "compact" | "standard" | "large";
};

const titleClasses = {
  compact:
    "text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl",
  standard:
    "text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl",
  large:
    "text-4xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl",
};

export default function ServiceIntroSection({
  eyebrow,
  title,
  subtitle,
  description,
  secondaryDescription,
  bullets = [],
  note,
  meta,
  ctaLabel = "Chcem nezáväznú cenovú ponuku",
  ctaHref = "/kontakt",
  reviewLabel = "Hodnotenie na Google",
  imageSrc,
  imageAlt,
  titleSize = "standard",
}: ServiceIntroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="relative mx-auto grid w-[92%] grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <AnimateOnScroll>
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary/55">
              {eyebrow}
            </p>
          ) : null}

          <h2 className={`${eyebrow ? "mt-5" : ""} ${titleClasses[titleSize]}`}>
            {title}
          </h2>

          {subtitle ? (
            <p className="mt-3 text-2xl font-light text-foreground/75 md:text-3xl">
              {subtitle}
            </p>
          ) : null}

          {description ? (
            <p className="mt-6 max-w-xl text-base leading-8 text-foreground/70">
              {description}
            </p>
          ) : null}

          {secondaryDescription ? (
            <p className="mt-3 max-w-xl text-base leading-8 text-foreground/70">
              {secondaryDescription}
            </p>
          ) : null}

          {bullets.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {bullets.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground/80">
                  <svg
                    className="h-4 w-4 shrink-0 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          {note ? (
            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                {note.label}
              </p>
              {note.body ? (
                <p className="mt-1 text-sm text-foreground/70">{note.body}</p>
              ) : null}
              {note.footer ? (
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                  {note.footer}
                </p>
              ) : null}
            </div>
          ) : null}

          {meta ? <div className="mt-5 text-sm text-foreground/55">{meta}</div> : null}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-primary/90"
            >
              {ctaLabel}
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-2">
            <span className="text-amber-400">★★★★★</span>
            <span className="text-sm text-foreground/55">{reviewLabel}</span>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll
          delay={120}
          className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="50vw"
            className="object-cover"
          />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
