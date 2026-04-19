"use client";

import type { ReactNode } from "react";
import { scrollToTargetId } from "@/components/site/scroll-to-target";

type QuoteScrollButtonProps = {
  children?: ReactNode;
  className?: string;
  label?: string;
  targetId?: string;
};

export default function QuoteScrollButton({
  children,
  className = "",
  label = "Kontaktovať nás",
  targetId = "cenova-ponuka",
}: QuoteScrollButtonProps) {
  return (
    <button
      type="button"
      onClick={() => scrollToTargetId(targetId)}
      className={className}
      aria-label={label}
    >
      {children ?? label}
    </button>
  );
}
