import type { ComponentType } from 'react';
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import ContactPage from '@/components/pages/ContactPage';
import PortfolioPage from '@/components/pages/PortfolioPage';
import SlupskPage from '@/components/pages/SlupskPage';
import BlogPage from '@/components/pages/BlogPage';
import TermsPage from '@/components/pages/TermsPage';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';
import CookiesPolicyPage from '@/components/pages/CookiesPolicyPage';
import AccessibilityPage from '@/components/pages/AccessibilityPage';

/**
 * Page registry - centralne miejsce definiujące wszystkie statyczne ścieżki
 * i mapowanie ich do odpowiednich komponentów stron.
 * 
 * Blog posty są obsługiwane dynamicznie poprzez pattern `/blog/[slug]`
 * i nie są tutaj listowane - ich slugi są pobierane bezpośrednio ze Strapi.
 */

export interface PageRoute {
  /** Slug strony (bez początkowego slash) */
  slug: string;
  /** Komponent strony do renderowania */
  component: ComponentType;
  /** Opcjonalny opis do debugowania */
  description?: string;
}

/**
 * Rejestr wszystkich statycznych stron w aplikacji.
 * Każda strona ma unikalny slug i przypisany komponent.
 */
export const PAGE_REGISTRY: PageRoute[] = [
  {
    slug: '',
    component: HomePage,
    description: 'Strona główna - hero, usługi, dlaczego my, testimoniale'
  },
  {
    slug: 'o-nas',
    component: AboutPage,
    description: 'O nas - wartości zespołu, gwarancje, proces pracy'
  },
  {
    slug: 'kontakt',
    component: ContactPage,
    description: 'Kontakt - informacje kontaktowe, formularz, FAQ'
  },
  {
    slug: 'portfolio',
    component: PortfolioPage,
    description: 'Portfolio - galeria zrealizowanych projektów'
  },
  {
    slug: 'slupsk',
    component: SlupskPage,
    description: 'Słupsk - strona lokalna z informacjami o usługach w Słupsku'
  },
  {
    slug: 'blog',
    component: BlogPage,
    description: 'Blog - lista wszystkich postów blogowych'
  },
  {
    slug: 'regulamin',
    component: TermsPage,
    description: 'Regulamin świadczenia usług'
  },
  {
    slug: 'polityka-prywatnosci',
    component: PrivacyPolicyPage,
    description: 'Polityka prywatności i RODO'
  },
  {
    slug: 'polityka-cookies',
    component: CookiesPolicyPage,
    description: 'Polityka plików cookies'
  },
  {
    slug: 'deklaracja-dostepnosci',
    component: AccessibilityPage,
    description: 'Deklaracja dostępności WCAG'
  },
];

/**
 * Mapa slug -> komponent dla szybkiego dostępu O(1)
 */
const SLUG_TO_COMPONENT_MAP = new Map<string, ComponentType>(
  PAGE_REGISTRY.map(route => [route.slug, route.component])
);

/**
 * Sprawdza czy dany slug jest zarejestrowany jako statyczna strona
 */
export function isValidSlug(slug: string): boolean {
  return SLUG_TO_COMPONENT_MAP.has(slug);
}

/**
 * Pobiera komponent dla danego slug
 * @returns Komponent strony lub undefined jeśli nie znaleziono
 */
export function getPageComponent(slug: string): ComponentType | undefined {
  return SLUG_TO_COMPONENT_MAP.get(slug);
}

/**
 * Zwraca wszystkie slugi statycznych stron (bez postów blogowych)
 * Używane w generateStaticParams
 */
export function getAllStaticSlugs(): string[] {
  return PAGE_REGISTRY.map(route => route.slug);
}

/**
 * Konwertuje string slug na tablicę segmentów dla Next.js catch-all route
 * Przykłady:
 * - '' -> []
 * - 'o-nas' -> ['o-nas']
 * - 'polityka-prywatnosci' -> ['polityka-prywatnosci']
 */
export function slugToSegments(slug: string): string[] {
  return slug === '' ? [] : slug.split('/');
}

/**
 * Konwertuje tablicę segmentów catch-all route na string slug
 * Przykłady:
 * - [] -> ''
 * - ['o-nas'] -> 'o-nas'
 * - ['blog', 'moj-post'] -> 'blog/moj-post'
 */
export function segmentsToSlug(segments: string[]): string {
  return segments.join('/');
}
