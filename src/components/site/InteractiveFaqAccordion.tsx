"use client";

import { useState, type ReactNode } from "react";

export type InteractiveFaqItem = {
  question: string;
  answer: ReactNode;
};

type InteractiveFaqAccordionProps = {
  items: InteractiveFaqItem[];
  variant?: "default" | "rich";
};

export default function InteractiveFaqAccordion({
  items,
  variant = "default",
}: InteractiveFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questionClassName =
    variant === "rich"
      ? "text-lg font-semibold leading-snug text-primary-dark md:text-2xl"
      : "text-base font-semibold leading-7 text-foreground md:text-lg";

  const answerClassName =
    variant === "rich"
      ? "px-6 pb-6 pt-1 text-sm leading-7 text-foreground/78 md:px-8 md:pb-8"
      : "px-6 pb-5 pt-1 text-sm leading-7 text-foreground/74 md:px-7 md:pb-6";

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <article
            key={item.question}
            className={`overflow-hidden rounded-[2rem] border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isOpen
                ? "border-primary/35 bg-primary/[0.04] shadow-[0_18px_55px_rgba(15,29,74,0.08)]"
                : "border-border bg-white hover:border-primary/20 hover:bg-primary/[0.02]"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full cursor-pointer items-start justify-between gap-5 px-6 py-5 text-left md:px-8 md:py-6"
            >
              <span className={questionClassName}>{item.question}</span>
              <span
                className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  isOpen
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-white text-primary"
                }`}
              >
                <svg
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`${answerClassName} [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_ol]:mt-3 [&_ol]:space-y-1.5 [&_p]:leading-7 [&_p+*]:mt-4 [&_ul]:mt-3 [&_ul]:space-y-1.5`}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
