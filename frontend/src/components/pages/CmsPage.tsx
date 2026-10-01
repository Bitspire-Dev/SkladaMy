import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import PageContent from "@/components/pages/PageContent";
import { getPage } from "@/lib/cms/pages";
import { getSiteUrl } from "@/lib/config";

const siteUrl = getSiteUrl();

interface PageSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

function getSeo(page: Record<string, unknown> | null | undefined): PageSeo {
  return (page?.seo ?? {}) as PageSeo;
}

function buildCanonical(
  page: Record<string, unknown> | null | undefined,
  slug: string,
  seo: PageSeo
) {
  const route =
    typeof page?.route === "string" && page.route.startsWith("/")
      ? page.route
      : `/${page?.route || slug}`;
  return seo.canonicalUrl || `${siteUrl}${route === "/" ? "" : route}`;
}

function buildOpenGraph(seo: PageSeo, canonical: string): Metadata["openGraph"] {
  return {
    title: seo.ogTitle || seo.metaTitle,
    description: seo.ogDescription || seo.metaDescription,
    url: canonical,
    siteName: "SkładaMy",
    locale: "pl_PL",
    type: (seo.ogType as "website" | "article") || "website",
    images: seo.ogImage ? [seo.ogImage] : undefined,
  };
}

/** Build Next `Metadata` from a Tina page document's `seo` object. */
export async function generateCmsMetadata(slug: string): Promise<Metadata> {
  const res = await getPage(slug);
  const page = res?.data.page;
  const seo = getSeo(page);
  const canonical = buildCanonical(page, slug, seo);

  return {
    title: seo.metaTitle ?? (page?.title as string) ?? undefined,
    description: seo.metaDescription,
    keywords: seo.keywords
      ?.split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical },
    openGraph: buildOpenGraph(seo, canonical),
    twitter: seo.twitterCard
      ? { card: seo.twitterCard as "summary" | "summary_large_image" }
      : undefined,
    robots:
      seo.noindex || seo.nofollow ? { index: !seo.noindex, follow: !seo.nofollow } : undefined,
  };
}

interface CmsPageProps {
  /** Slug = content/pages/<slug>.md filename without extension */
  slug: string;
  /** Extra classes on <main> (e.g. "py-20 bg-neutral-50") */
  mainClassName?: string;
  /** Blocks from this index mount lazily (default 3; 0 = all eager) */
  lazyFrom?: number;
}

/** Generic Tina-driven page: Header + sections (+ markdown body) + Footer. */
export default async function CmsPage({ slug, mainClassName, lazyFrom }: CmsPageProps) {
  const res = await getPage(slug);
  return (
    <>
      <Header />
      <main className={mainClassName}>
        {res ? (
          <PageContent
            data={res.data}
            query={res.query}
            variables={res.variables}
            lazyFrom={lazyFrom}
          />
        ) : null}
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
