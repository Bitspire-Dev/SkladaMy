import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/config";

// Ensure this route is treated as static during `output: 'export'` builds
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();
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
