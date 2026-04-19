import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTemplate from "@/components/site/PageTemplate";
import { getSitePageByPath, getTopLevelSlugs } from "@/lib/espron-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getTopLevelSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getSitePageByPath(`/${slug}`);

  if (!page) {
    return {};
  }

  return {
    title: page.metaTitle,
    description: page.description,
  };
}

export default async function TopLevelLegacyPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getSitePageByPath(`/${slug}`);

  if (!page) {
    notFound();
  }

  return <PageTemplate page={page} />;
}
