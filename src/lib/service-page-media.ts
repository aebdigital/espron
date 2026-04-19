import type { LegacyGalleryItem } from "@/lib/legacy-gallery-data";

export const FEATURED_FACADE_IMAGE =
  "/images/realizacie/b0408c_2883303b07a4489798740af9878cc2db~mv2.avif";

export const INTERIOR_DESIGN_IMAGE =
  "/images/Kópia súboru _int_obývací pokoj_2.jpg";

type ServicePageMedia = {
  preview: string;
  items: LegacyGalleryItem[];
};

function buildItems(
  label: string,
  images: string[],
): LegacyGalleryItem[] {
  return images.map((image, index) => ({
    title: `Realizácia ${String(index + 1).padStart(2, "0")}`,
    alt: `${label} - realizácia ${index + 1}`,
    image,
  }));
}

export const SERVICE_PAGE_MEDIA: Record<string, ServicePageMedia> = {
  "/sadrokartonove-prace": {
    preview: "/img/sadrokartonove-prace/0224de6bdd8a4e9d95f6fbc4e1c948fb.avif",
    items: buildItems("Sadrokartónové práce", [
      "/img/sadrokartonove-prace/0224de6bdd8a4e9d95f6fbc4e1c948fb.avif",
      "/img/sadrokartonove-prace/11062b_27c7f9b03967465caf55c676fd5571af~mv2.avif",
      "/img/sadrokartonove-prace/fec447f2775c4e7aa350478f7c52c557.avif",
    ]),
  },
  "/rucne-omietky": {
    preview: "/img/rucne-omietky/11062b_66320460ded54434a07a51af9cd58803~mv2.avif",
    items: buildItems("Ručné omietky", [
      "/img/rucne-omietky/11062b_66320460ded54434a07a51af9cd58803~mv2.avif",
      "/img/rucne-omietky/11062b_80a0ae45e1864d07b427bd7ed9052692~mv2.avif",
      "/img/rucne-omietky/847a6625ba5446ceaf989e44f4123b6a.avif",
    ]),
  },
  "/cistenie-dlazby": {
    preview: "/img/cistenie-dlazby/b0408c_50a552c191014f2fb14037bda8397c29~mv2.avif",
    items: buildItems("Čistenie dlažby", [
      "/img/cistenie-dlazby/b0408c_50a552c191014f2fb14037bda8397c29~mv2.avif",
      "/img/cistenie-dlazby/b0408c_7b107a3578fc4184945054c9525de709~mv2.avif",
      "/img/cistenie-dlazby/bccb7dec5d8846a4800d10a140a02d84.avif",
    ]),
  },
  "/tepovanie": {
    preview: "/img/tepovanie/6408d4f9bdf048f8931dbac2dafca748.avif",
    items: buildItems("Tepovanie", [
      "/img/tepovanie/6408d4f9bdf048f8931dbac2dafca748.avif",
      "/img/tepovanie/b0408c_47a5bac4dcc749878b7d712949d67b01~mv2.avif",
      "/img/tepovanie/b0408c_ab98d9724c204889895d8c3a5ffefe3b~mv2.avif",
    ]),
  },
};

export function getServicePreviewImage(
  href: string,
  fallback: string,
): string {
  return SERVICE_PAGE_MEDIA[href]?.preview ?? fallback;
}
