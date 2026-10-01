import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/cms/api";
import { getSiteUrl } from "@/lib/config";

// Ensure this route is treated as static during `output: 'export'` builds
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteBaseUrl = getSiteUrl();

  // Fetch blog posts for dynamic sitemap entries
  let blogPostUrls: MetadataRoute.Sitemap = [];

  try {
    const postsResponse = await getBlogPosts({ limit: 100 });
    blogPostUrls = postsResponse.data.map((post) => ({
      url: `${siteBaseUrl}/blog/${post.slug}`,
      // Use seo.lastmod if available, fallback to updatedAt, then publishedAt
      lastModified: post.seo?.lastmod
        ? new Date(post.seo.lastmod)
        : new Date(post.updatedAt || post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: post.featured ? 0.8 : 0.6, // Featured posts get higher priority
    }));
  } catch (error) {
    console.error("Failed to fetch blog posts for sitemap:", error);
  }

  return [
    {
      url: siteBaseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteBaseUrl}/o-nas`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteBaseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteBaseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogPostUrls,
    {
      url: `${siteBaseUrl}/slupsk`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteBaseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteBaseUrl}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteBaseUrl}/regulamin`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteBaseUrl}/deklaracja-dostepnosci`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
