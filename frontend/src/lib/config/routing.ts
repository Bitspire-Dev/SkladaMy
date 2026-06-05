import type { ComponentType } from "react";
import HomePage from "@/components/pages/HomePage";
import AboutPage from "@/components/pages/AboutPage";
import ContactPage from "@/components/pages/ContactPage";
import PortfolioPage from "@/components/pages/PortfolioPage";
import SlupskPage from "@/components/pages/SlupskPage";
import BlogPage from "@/components/pages/BlogPage";
import TermsPage from "@/components/pages/TermsPage";
import PrivacyPolicyPage from "@/components/pages/PrivacyPolicyPage";
import CookiesPolicyPage from "@/components/pages/CookiesPolicyPage";
import AccessibilityPage from "@/components/pages/AccessibilityPage";

/**
 * Page route definition
 */
export interface PageRoute {
  /** Page slug (without leading slash) */
  slug: string;
  /** Page component to render */
  component: ComponentType;
  /** Optional description for debugging */
  description?: string;
}

/**
 * Registry of all static pages in the application.
 * Each page has a unique slug and assigned component.
 */
export const PAGE_REGISTRY: PageRoute[] = [
  {
    slug: "",
    component: HomePage,
    description: "Homepage - hero, services, why us, testimonials",
  },
  {
    slug: "o-nas",
    component: AboutPage,
    description: "About us - team values, guarantees, work process",
  },
  {
    slug: "kontakt",
    component: ContactPage,
    description: "Contact - contact info, form, FAQ",
  },
  {
    slug: "portfolio",
    component: PortfolioPage,
    description: "Portfolio - gallery of completed projects",
  },
  {
    slug: "slupsk",
    component: SlupskPage,
    description: "Slupsk - local page with service info for Slupsk",
  },
  {
    slug: "blog",
    component: BlogPage,
    description: "Blog - list of all blog posts",
  },
  {
    slug: "regulamin",
    component: TermsPage,
    description: "Terms of service",
  },
  {
    slug: "polityka-prywatnosci",
    component: PrivacyPolicyPage,
    description: "Privacy policy and GDPR",
  },
  {
    slug: "polityka-cookies",
    component: CookiesPolicyPage,
    description: "Cookie policy",
  },
  {
    slug: "deklaracja-dostepnosci",
    component: AccessibilityPage,
    description: "WCAG accessibility declaration",
  },
];

/**
 * Map slug -> component for O(1) access
 */
const SLUG_TO_COMPONENT_MAP = new Map<string, ComponentType>(
  PAGE_REGISTRY.map((route) => [route.slug, route.component])
);

/**
 * Check if given slug is registered as a static page
 */
export function isValidSlug(slug: string): boolean {
  return SLUG_TO_COMPONENT_MAP.has(slug);
}

/**
 * Get component for given slug
 * @returns Page component or undefined if not found
 */
export function getPageComponent(slug: string): ComponentType | undefined {
  return SLUG_TO_COMPONENT_MAP.get(slug);
}

/**
 * Get all static page slugs (excluding blog posts)
 * Used in generateStaticParams
 */
export function getAllStaticSlugs(): string[] {
  return PAGE_REGISTRY.map((route) => route.slug);
}

/**
 * Convert string slug to array of segments for Next.js catch-all route
 * Examples:
 * - '' -> []
 * - 'o-nas' -> ['o-nas']
 * - 'polityka-prywatnosci' -> ['polityka-prywatnosci']
 */
export function slugToSegments(slug: string): string[] {
  return slug === "" ? [] : slug.split("/");
}

/**
 * Convert catch-all route segments array to string slug
 * Examples:
 * - [] -> ''
 * - ['o-nas'] -> 'o-nas'
 * - ['blog', 'my-post'] -> 'blog/my-post'
 */
export function segmentsToSlug(segments: string[]): string {
  return segments.join("/");
}

// Backward compatibility re-exports
/** @deprecated Use PAGE_REGISTRY instead */
export { PAGE_REGISTRY as pageRegistry };
/** @deprecated Use isValidSlug instead */
export { isValidSlug as isValidPageSlug };
