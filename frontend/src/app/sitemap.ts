import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/strapi'

// Ensure this route is treated as static during `output: 'export'` builds
export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skladamy.pl'
  
  // Fetch blog posts for dynamic sitemap entries
  let blogUrls: MetadataRoute.Sitemap = [];
  
  try {
    const postsResponse = await getBlogPosts({ limit: 100 });
    blogUrls = postsResponse.data.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      // Use seo.lastmod if available, fallback to updatedAt, then publishedAt
      lastModified: post.seo?.lastmod 
        ? new Date(post.seo.lastmod)
        : new Date(post.updatedAt || post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: post.featured ? 0.8 : 0.6,  // Featured posts get higher priority
    }));
  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error);
  }
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/o-nas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...blogUrls,
    {
      url: `${baseUrl}/slupsk`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/regulamin`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/deklaracja-dostepnosci`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
