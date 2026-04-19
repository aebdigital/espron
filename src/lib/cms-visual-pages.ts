import { supabaseServer } from "./supabase-server";

export type VisualElement = {
  id: string;
  type: string;
  content?: string;
  src?: string;
  alt?: string;
  level?: string;
  children?: VisualElement[];
  style?: Record<string, string>;
};

export type VisualPage = {
  id: string;
  site: "sk" | "cz";
  slug: string;
  title: string;
  elements: VisualElement[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export async function getVisualPageBySlug(
  slug: string,
  {
    includeDrafts = false,
    site = "sk",
  }: { includeDrafts?: boolean; site?: "sk" | "cz" } = {},
): Promise<VisualPage | null> {
  let query = supabaseServer
    .from("espron_visual_pages")
    .select("*")
    .eq("site", site)
    .eq("slug", slug);

  if (!includeDrafts) {
    query = query.eq("is_published", true);
  }

  const { data, error } = await query.maybeSingle();
  if (error) {
    console.error("getVisualPageBySlug failed", error);
    return null;
  }
  return (data as VisualPage) ?? null;
}
