import type { NextConfig } from "next";
import webpack from 'webpack';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/^https?:\/\//, '') || '',
        pathname: '/uploads/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Ensure server-side build has UTF-8-safe btoa/atob so libraries that
  // assume browser globals can base64 encode/decode UTF-8 strings safely.
  // This prevents errors like "Cannot convert argument to a ByteString"
  // when Next/Critters process files containing Polish diacritics.
  webpack(config) {
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.DefinePlugin({
        // Provide a UTF-8-safe btoa/atob implementation on globalThis.
        // `btoa` will base64-encode a UTF-8 string using Buffer.
        'globalThis.btoa': '(str)=>Buffer.from(String(str), "utf8").toString("base64")',
        'globalThis.atob': '(str)=>Buffer.from(String(str), "base64").toString("utf8")',
      })
    );
    return config;
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react', '@tanstack/react-query'],
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
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Generate sitemap.xml and robots.txt
  async generateBuildId() {
    return `${new Date().getTime()}`;
  },
  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
