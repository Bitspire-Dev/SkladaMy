import type { MetadataRoute } from "next";

// Ensure this route is treated as static during `output: 'export'` builds
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // NEXT_PUBLIC_SITE_URL must be set in .env - no fallback!
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be set in .env file!");
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    // NOTE: Omitting `host` — some validators report unknown directives when `Host:` is present.
  };
}
