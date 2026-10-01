// =============================================================================
// TinaCMS `page` collection — section block types.
// Each block is identified by `_template` (file) or `__typename` (Tina query).
// =============================================================================

export interface CtaLink {
  label: string;
  /** URL; the magic values "tel:" / "mail:" resolve to company phone/email */
  href: string;
}

export interface CardItemData {
  /** Lucide icon name, e.g. "Shield" */
  icon?: string;
  title: string;
  description?: string;
  details?: string[];
}

export interface PageHeaderBlock {
  badge?: string;
  title: string;
  subtitle?: string;
  badges?: string[];
  /** Render without the white band/border (e.g. inside a shaded main) */
  bare?: boolean;
}

export interface HeroBlock {
  badge?: string;
  image?: string;
  heading: string;
  headingAccent?: string;
  headingSuffix?: string;
  subtext?: string;
  badges?: string[];
  cards?: { title: string; text: string }[];
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  areaText?: string;
  areaLinkLabel?: string;
  areaLinkHref?: string;
}

export interface ServicesBlock {
  heading: string;
  subtext?: string;
  items?: CardItemData[];
}

export interface FeaturesBlock {
  heading: string;
  subtext?: string;
  items?: CardItemData[];
  footerNotes?: string[];
}

export interface ProcessBlock {
  heading: string;
  subtext?: string;
  steps?: CardItemData[];
  ctaText?: string;
  ctaPrimary?: CtaLink;
  ctaSecondary?: CtaLink;
}

export interface TestimonialItem {
  name: string;
  content: string;
  rating?: number;
  location?: string;
  service?: string;
  date?: string;
  verified?: boolean;
}

export interface TestimonialsBlock {
  heading: string;
  subtext?: string;
  items?: TestimonialItem[];
  footnotes?: string[];
  note?: string;
}

export interface FaqItemData {
  question: string;
  answer: string;
  category?: string;
  featured?: boolean;
}

export interface FaqBlock {
  heading: string;
  subtext?: string;
  categories?: { key: string; label: string }[];
  items?: FaqItemData[];
  ctaText?: string;
  ctaPrimary?: CtaLink;
  ctaSecondary?: CtaLink;
}

export interface QaBlock {
  heading: string;
  items?: { question: string; answer: string }[];
}

export interface CtaBlock {
  heading: string;
  text?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  infoItems?: string[];
  trustItems?: string[];
}

export interface StatsBlock {
  heading?: string;
  items?: { value: string; label: string }[];
}

export interface ListGridBlock {
  heading: string;
  subtext?: string;
  entries?: string[];
  note?: string;
}

export interface RichTextBlock {
  heading?: string;
  /** Markdown or inline HTML */
  content?: string;
}

export interface ContactPanelBlock {
  infoHeading?: string;
  contacts?: { icon?: string; title: string; text?: string; note?: string; href?: string }[];
  prepTitle?: string;
  prepItems?: string[];
  formHeading?: string;
}

export type PageBlock = { _template?: string; __typename?: string } & (
  | PageHeaderBlock
  | HeroBlock
  | ServicesBlock
  | FeaturesBlock
  | ProcessBlock
  | TestimonialsBlock
  | FaqBlock
  | QaBlock
  | CtaBlock
  | StatsBlock
  | ListGridBlock
  | RichTextBlock
  | ContactPanelBlock
);

/** Normalize the block discriminator: `_template` (file) or `__typename` (query). */
export function blockType(block: { _template?: string; __typename?: string }): string {
  if (block._template) return block._template;
  const t = block.__typename ?? "";
  // e.g. "PageSectionsFaq" -> "faq", "PageSectionsPageHeader" -> "pageHeader"
  const stripped = t.replace(/^PageSections/, "");
  return stripped ? stripped.charAt(0).toLowerCase() + stripped.slice(1) : "";
}

export function getBlocks(page: Record<string, unknown> | null | undefined): PageBlock[] {
  const sections = page?.sections;
  return Array.isArray(sections) ? (sections as PageBlock[]) : [];
}
