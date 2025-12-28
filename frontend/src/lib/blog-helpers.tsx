import { Badge } from "@/components/ui/badge";
import type { BlogTag, Tag } from "@/types/strapi";

/**
 * BLOG HELPERS - Centralne funkcje pomocnicze dla systemu blogowego
 * 
 * Zawiera:
 * - Formatowanie daty (locale PL)
 * - Limitowanie tagów
 * - Renderowanie tagów jako JSX badges
 * - Przetwarzanie treści HTML (dodawanie ID do nagłówków)
 * - Ekstrakcja plain text z HTML
 */

// ============================================================================
// DATE FORMATTING
// ============================================================================

/**
 * Formatuje datę w polskim formacie (np. "15 grudnia 2024")
 */
export const formatDate = (dateString?: string): string => {
  if (!dateString) return "Brak daty";
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// ============================================================================
// TAG HELPERS
// ============================================================================

/**
 * Limituje liczbę tagów do wyświetlenia
 */
export const limitTags = (tags?: BlogTag[], limit?: number): BlogTag[] => {
  if (!tags || !Array.isArray(tags)) return [];
  return limit ? tags.slice(0, limit) : tags;
};

/**
 * Renderuje tagi jako JSX badge components
 */
export const renderTags = (tags?: BlogTag[] | Tag[], limit?: number) => {
  const allTags = limitTags(tags, limit);
  return allTags.map((tag, index) => (
    <Badge key={index} variant="outline" className="text-xs">
      #{tag.name}
    </Badge>
  ));
};

/**
 * Process blog content and add IDs to headings for Table of Contents
 * Server-safe version using regex instead of DOMParser
 */
export function processBlogContent(content: string): string {
  let counter = 0;
  return content.replace(/<(h[23])([^>]*)>/gi, (match, tag, attrs) => {
    const id = `heading-${counter++}`;
    // Check if id already exists
    if (attrs.includes('id=')) {
      return match;
    }
    return `<${tag}${attrs} id="${id}">`;
  });
}

/**
 * Extract plain text from HTML content
 * Server-safe version using regex
 */
export function extractPlainText(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

