import RealizacieLightboxSection from "@/components/site/RealizacieLightboxSection";
import { listServiceGalleryItems, type EspronSite } from "@/lib/cms-service-gallery";
import type { LegacyGalleryItem } from "@/lib/legacy-gallery-data";

type Props = {
  serviceSlug: string;
  site?: EspronSite;
  title: string;
  description?: string;
  eyebrow?: string;
  legacyItems?: LegacyGalleryItem[];
  columns?: 3 | 4;
};

export default async function ServiceRealizationGallery({
  serviceSlug,
  site = "sk",
  title,
  description,
  eyebrow,
  legacyItems = [],
  columns = 3,
}: Props) {
  const cmsItems = await listServiceGalleryItems(serviceSlug, { site });
  const items: LegacyGalleryItem[] = cmsItems.length > 0 ? cmsItems : legacyItems;

  if (items.length === 0) return null;

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
