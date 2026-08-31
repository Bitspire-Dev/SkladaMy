import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    remotePatterns: [
      // Dev-only: allow localhost Strapi uploads. Excluded from prod builds
      // so a misconfigured prod env can't pull from localhost.
      ...(process.env.NODE_ENV === "development"
        ? [
            {
              protocol: "http" as const,
              hostname: "localhost",
              port: "1337",
              pathname: "/uploads/**",
            },
          ]
        : []),
      {
        protocol: "https",
        // Strip scheme + any trailing path/port so Next.js gets a bare hostname.
        hostname:
          process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/^https?:\/\//, "").split("/")[0] ??
          (() => {
            throw new Error("NEXT_PUBLIC_STRAPI_URL must be set in .env!");
          })(),
        pathname: "/uploads/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    // SVG disabled for security: malicious SVG uploaded to Strapi could execute
    // JS in the same origin. Re-enable only with a sanitization step before publish.
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // AVIF first for best quality/size ratio, WebP as fallback
    // Note: On DirectAdmin, ensure the Image Optimization API endpoint is available
    // or use a custom loader with external service like Cloudinary/Imgix
  },
  experimental: {
    optimizePackageImports: ["@radix-ui/react-icons", "lucide-react"],
    // Limit workers for low-resource hosting environments
    cpus: 1,
  },
  // Performance optimizations
  compress: true,
  // Disable x-powered-by header for security
  poweredByHeader: false,
  // Enable React strict mode
  reactStrictMode: true,
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  // Generate sitemap.xml and robots.txt
  async generateBuildId() {
    return `${new Date().getTime()}`;
  },
  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
      {
        source: "/layout/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.avif",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
