import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVisualPageBySlug } from "@/lib/cms-visual-pages";
import { VisualElementTree } from "@/components/site/VisualElementRenderer";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { preview } = await searchParams;
  const page = await getVisualPageBySlug(slug, {
    includeDrafts: preview === "1",
    site: "sk",
  });
  if (!page) return {};
  return { title: page.title };
}

export default async function CmsVisualPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { preview } = await searchParams;

  const page = await getVisualPageBySlug(slug, {
    includeDrafts: preview === "1",
    site: "sk",
  });

  if (!page) {
    notFound();
  }

  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark pb-18 pt-28 text-white md:pb-24 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_34%),linear-gradient(120deg,rgba(255,255,255,0.06),transparent_26%)]" />
        <div className="relative mx-auto w-[92%]" />
      </section>
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        <VisualElementTree elements={page.elements ?? []} />
      </main>
    </>
  );
}
