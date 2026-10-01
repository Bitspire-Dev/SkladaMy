// =============================================================================
// TINA CMS CONTENT READER
// Reads Markdown/JSON documents from `content/` (managed by TinaCMS)
// and maps them to the domain types used by the site.
// Server-only: uses the filesystem.
// =============================================================================

import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Author, BlogPost, Category, CmsImage, FAQItem, Gallery, SEO, Tag } from "@/types/cms";

const CONTENT_ROOT = path.join(process.cwd(), "content");

interface RawDoc {
  /** Filename without extension */
  fileSlug: string;
  data: Record<string, unknown>;
  body: string;
  /** File mtime as ISO string — used as updatedAt */
  mtime: string;
}

// ---------------------------------------------------------------------------
// Low-level file loading (with a light mtime-based cache — the same files are
// read repeatedly during SSG builds)
// ---------------------------------------------------------------------------

const docCache = new Map<string, { mtimeMs: number; doc: RawDoc }>();

const str = (v: unknown): string | undefined =>
  typeof v === "string" && v.length > 0 ? v : undefined;

const num = (v: unknown): number | undefined => {
  const n = typeof v === "string" ? Number(v) : v;
  return typeof n === "number" && Number.isFinite(n) ? n : undefined;
};

const readDocFile = (filePath: string): RawDoc | null => {
  try {
    const stat = fs.statSync(filePath);
    const cached = docCache.get(filePath);
    if (cached && cached.mtimeMs === stat.mtimeMs) return cached.doc;

    const raw = fs.readFileSync(filePath, "utf8");
    const mtime = stat.mtime.toISOString();
    const fileSlug = path.basename(filePath).replace(/\.(md|mdx|json)$/i, "");

    let doc: RawDoc;
    if (filePath.endsWith(".json")) {
      doc = { fileSlug, data: JSON.parse(raw) as Record<string, unknown>, body: "", mtime };
    } else {
      const parsed = matter(raw);
      doc = {
        fileSlug,
        data: parsed.data as Record<string, unknown>,
        body: parsed.content,
        mtime,
      };
    }

    docCache.set(filePath, { mtimeMs: stat.mtimeMs, doc });
    return doc;
  } catch {
    return null;
  }
};

const listDocs = (collection: string): RawDoc[] => {
  const dir = path.join(CONTENT_ROOT, collection);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(md|mdx|json)$/i.test(f))
      .map((f) => readDocFile(path.join(dir, f)))
      .filter((d): d is RawDoc => d !== null);
  } catch {
    return [];
  }
};

/** Resolve a Tina reference path like `content/categories/poradniki.md` */
const readRef = (refPath: unknown): RawDoc | null => {
  if (typeof refPath !== "string" || !refPath) return null;
  // Tina stores paths relative to the repo root (e.g. "content/posts/x.md"),
  // but tolerate relative "./x.md" and bare filenames too.
  const normalized = refPath.replace(/^\.?\//, "");
  const abs = normalized.startsWith("content/")
    ? path.join(process.cwd(), normalized)
    : path.join(CONTENT_ROOT, normalized);
  return readDocFile(abs);
};

// ---------------------------------------------------------------------------
// Value mappers
// ---------------------------------------------------------------------------

const toCmsImage = (value: unknown): CmsImage | undefined => {
  if (!value) return undefined;
  if (typeof value === "string") return value ? { src: value } : undefined;
  if (typeof value !== "object") return undefined;
  const v = value as Record<string, unknown>;
  const src = str(v.src) ?? str(v.url);
  if (!src) return undefined;
  return { src, alt: str(v.alt) ?? str(v.alternativeText), caption: str(v.caption) };
};

const toCmsImages = (value: unknown): CmsImage[] =>
  Array.isArray(value) ? (value.map(toCmsImage).filter(Boolean) as CmsImage[]) : [];

const toSeo = (value: unknown): SEO | undefined => {
  if (!value || typeof value !== "object") return undefined;
  const v = value as Record<string, unknown>;

  let structuredData: Record<string, unknown> | undefined;
  if (typeof v.structuredData === "string") {
    try {
      structuredData = JSON.parse(v.structuredData) as Record<string, unknown>;
    } catch {
      structuredData = undefined;
    }
  } else if (v.structuredData && typeof v.structuredData === "object") {
    structuredData = v.structuredData as Record<string, unknown>;
  }

  return {
    metaTitle: str(v.metaTitle),
    metaDescription: str(v.metaDescription),
    keywords: str(v.keywords),
    ogTitle: str(v.ogTitle),
    ogDescription: str(v.ogDescription),
    ogType: str(v.ogType),
    ogImage: str(v.ogImage) ?? toCmsImage(v.ogImage)?.src,
    canonicalUrl: str(v.canonicalUrl),
    noindex: v.noindex === true,
    nofollow: v.nofollow === true,
    twitterCard:
      v.twitterCard === "summary" || v.twitterCard === "summary_large_image"
        ? v.twitterCard
        : undefined,
    structuredData,
    lastmod: str(v.lastmod),
  };
};

const toAuthor = (value: unknown): Author => {
  if (!value || typeof value !== "object") return { name: "Zespół SkładaMy" };
  const v = value as Record<string, unknown>;
  return {
    name: str(v.name) ?? "Zespół SkładaMy",
    role: str(v.role),
    bio: str(v.bio),
    email: str(v.email),
    avatar: toCmsImage(v.avatar),
    website: str(v.website),
    linkedin: str(v.linkedin),
    twitter: str(v.twitter),
  };
};

const toFaq = (value: unknown): FAQItem[] | undefined => {
  if (!Array.isArray(value)) return undefined;
  const items = value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const v = item as Record<string, unknown>;
      const question = str(v.question);
      const answer = str(v.answer);
      return question && answer ? { question, answer } : null;
    })
    .filter((i): i is FAQItem => i !== null);
  return items.length ? items : undefined;
};

const toCategory = (doc: RawDoc): Category => {
  const slug = str(doc.data.slug) ?? doc.fileSlug;
  return {
    id: slug,
    name: str(doc.data.name) ?? slug,
    slug,
    description: str(doc.data.description),
    color: str(doc.data.color) ?? "#3b82f6",
    icon: str(doc.data.icon),
    order: num(doc.data.order),
    seo: toSeo(doc.data.seo),
  };
};

const toTag = (doc: RawDoc): Tag => {
  const slug = str(doc.data.slug) ?? doc.fileSlug;
  return {
    id: slug,
    name: str(doc.data.name) ?? slug,
    slug,
    color: str(doc.data.color),
    description: str(doc.data.description),
  };
};

/** Render the Markdown body to the HTML string the blog renderer expects. */
const renderBody = (body: string): string => (body ? (marked.parse(body) as string) : "");

// ---------------------------------------------------------------------------
// Public loaders used by the api/ layer
// ---------------------------------------------------------------------------

export const loadTagDocs = (): RawDoc[] => listDocs("tags");

export const loadCategoryDocs = (): RawDoc[] => listDocs("categories");

export const loadPostDocs = (): RawDoc[] => listDocs("posts");

export const mapTag = toTag;
export const mapCategory = toCategory;

/**
 * Resolve a post's tag slugs (stored as a string list in frontmatter)
 * against the tag collection. Unknown slugs fall back to a minimal Tag.
 */
const resolveTags = (value: unknown, tagDocs: RawDoc[]): Tag[] => {
  if (!Array.isArray(value)) return [];
  const bySlug = new Map(tagDocs.map((d) => [str(d.data.slug) ?? d.fileSlug, d]));
  return value
    .map((entry) => {
      const slug = str(entry);
      if (!slug) return null;
      const doc = bySlug.get(slug);
      return doc ? toTag(doc) : { id: slug, name: slug, slug };
    })
    .filter((t): t is Tag => t !== null);
};

const toPost = (doc: RawDoc, tagDocs: RawDoc[], resolveRelated: boolean): BlogPost => {
  const d = doc.data;
  const slug = str(d.slug) ?? doc.fileSlug;
  const seo = toSeo(d.seo);
  const publishDate = str(d.publishDate) ?? doc.mtime;

  const categoryDoc = readRef(d.category);
  const category = categoryDoc ? toCategory(categoryDoc) : undefined;

  let relatedPosts: BlogPost[] | undefined;
  if (resolveRelated && Array.isArray(d.relatedPosts)) {
    relatedPosts = d.relatedPosts
      .map((entry) => {
        // Items are { post: "content/posts/x.md" } (object list wrapping a ref)
        const ref =
          entry && typeof entry === "object" ? (entry as Record<string, unknown>).post : entry;
        const relDoc = readRef(ref);
        return relDoc ? toPost(relDoc, tagDocs, false) : null;
      })
      .filter((p): p is BlogPost => p !== null);
  }

  return {
    id: slug,
    title: str(d.title) ?? slug,
    slug,
    excerpt: str(d.excerpt),
    content: renderBody(doc.body),
    featured: d.featured === true,
    publishDate,
    lastModified: seo?.lastmod,
    publishedAt: publishDate,
    createdAt: publishDate,
    updatedAt: doc.mtime,
    featuredImage: toCmsImage(d.featuredImage),
    author: toAuthor(d.author),
    category,
    tags: resolveTags(d.tags, tagDocs),
    relatedPosts,
    readTime: num(d.readTime),
    views: num(d.views),
    gallery: toCmsImages(d.gallery),
    seo,
    faq: toFaq(d.faq),
    breadcrumbs:
      d.breadcrumbs && typeof d.breadcrumbs === "object"
        ? (d.breadcrumbs as Record<string, unknown>)
        : undefined,
  };
};

/** Load all posts mapped to BlogPost (sorted by publishDate desc). */
export const loadPosts = (): BlogPost[] => {
  const tagDocs = loadTagDocs();
  return loadPostDocs()
    .map((doc) => toPost(doc, tagDocs, true))
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
};

/** Load a single post by its `slug` field (falling back to filename). */
export const loadPostBySlug = (slug: string): BlogPost | null => {
  const tagDocs = loadTagDocs();
  const doc = loadPostDocs().find((d) => (str(d.data.slug) ?? d.fileSlug) === slug);
  return doc ? toPost(doc, tagDocs, true) : null;
};

export const loadCategories = (): Category[] =>
  loadCategoryDocs()
    .map(toCategory)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.name.localeCompare(b.name));

export const loadTags = (): Tag[] =>
  loadTagDocs()
    .map(toTag)
    .sort((a, b) => a.name.localeCompare(b.name));

/** Load the gallery singleton (first JSON/MD doc in content/gallery). */
export const loadGallery = (): Gallery | null => {
  const doc = listDocs("gallery")[0];
  if (!doc) return null;
  return {
    images: toCmsImages(doc.data.images),
    featuredImages: toCmsImages(doc.data.featuredImages),
  };
};

/**
 * Load a `page` document by filename (without extension), e.g. "home".
 * Returns the raw frontmatter shape (sections keep their `_template` key),
 * mirroring the `page` field of Tina's generated queries.
 */
export const loadPage = (slug: string): Record<string, unknown> | null => {
  const doc = readDocFile(path.join(CONTENT_ROOT, "pages", `${slug}.md`));
  if (!doc) return null;
  return { ...doc.data, body: doc.body, _sys: { filename: doc.fileSlug } };
};
