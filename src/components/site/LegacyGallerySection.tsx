"use client";

import RealizacieLightboxSection from "@/components/site/RealizacieLightboxSection";
import type { LegacyGalleryItem } from "@/lib/legacy-gallery-data";

type LegacyGallerySectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: LegacyGalleryItem[];
  columns?: 3 | 4;
};

export default function LegacyGallerySection({
  eyebrow = "Realizácie",
  title,
  description,
  items,
  columns = 3,
}: LegacyGallerySectionProps) {
  return (
    <RealizacieLightboxSection
      eyebrow={eyebrow}
      title={title}
      description={description}
      items={items}
      columns={columns}
    />
  );
}
