import { MetadataRoute } from 'next'

// Ensure this route is treated as static during `output: 'export'` builds
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skladamy.pl'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    // NOTE: Omitting `host` — some validators report unknown directives when `Host:` is present.
  }
}
