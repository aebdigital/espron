"use client";

import { scrollToTargetId } from "@/components/site/scroll-to-target";

type FloatingQuoteButtonProps = {
  targetId?: string;
  label?: string;
};

export default function FloatingQuoteButton({
  targetId = "cenova-ponuka",
  label = "Cenová ponuka",
}: FloatingQuoteButtonProps) {
  return (
    <button
      type="button"
      onClick={() => scrollToTargetId(targetId)}
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[linear-gradient(135deg,#0f1d4a_0%,#172c70_55%,#1e3a8a_100%)] px-4 py-3 text-sm font-bold text-white shadow-[0_18px_42px_rgba(15,29,74,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(15,29,74,0.42)] md:bottom-8 md:right-8 md:px-5 md:py-3.5"
      aria-label={label}
    >
      <span>{label}</span>
      <svg
        className="h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 5v14m0 0l-6-6m6 6l6-6"
        />
      </svg>
    </button>
  );
}
