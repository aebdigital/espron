import { supabaseServer } from "./supabase-server";
import type { LegacyGalleryItem } from "@/lib/legacy-gallery-data";

export type EspronSite = "sk" | "cz";

type Row = {
  id: string;
  service_slug: string;
  site: EspronSite;
  image_url: string;
  alt: string | null;
  caption: string | null;
  kind: "image" | "video";
  sort_order: number;
  is_published: boolean;
};

export async function listServiceGalleryItems(
  serviceSlug: string,
  { site = "sk" }: { site?: EspronSite } = {},
): Promise<LegacyGalleryItem[]> {
  const { data, error } = await supabaseServer
    .from("espron_service_galleries")
    .select("*")
    .eq("site", site)
    .eq("service_slug", serviceSlug)
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("listServiceGalleryItems failed", error);
    return [];
  }
  return (data ?? []).map((row: Row, index): LegacyGalleryItem => ({
    title: row.caption?.trim() || `Realizácia ${String(index + 1).padStart(2, "0")}`,
    alt: row.alt?.trim() || row.caption?.trim() || `Realizácia ${index + 1}`,
    image: row.image_url,
    kind: row.kind === "video" ? "video" : "image",
  }));
}
