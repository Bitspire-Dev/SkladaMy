/**
 * Blog Post Lifecycle Hooks
 * Auto-calculate readTime, excerpt, breadcrumbs, and structured data
 */
// Opaque CMS-managed structures — typed with minimal shapes to avoid `any`
// while not depending on a generated schema (no codegen step in this repo).
interface AuthorRef {
  name?: string;
  website?: string;
}
interface MediaRef {
  url?: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}
interface CategoryRef {
  id?: number;
  name?: string;
  slug?: string;
  // Strapi v5 relation wrappers
  set?: unknown;
  connect?: unknown;
}
interface BlogPostData {
  title?: string;
  content?: string;
  excerpt?: string;
  readTime?: number;
  breadcrumbs?: Record<string, unknown>;
  category?: CategoryRef | number | string;
  slug?: string;
  publishDate?: string;
  author?: AuthorRef;
  featuredImage?: MediaRef;
  seo?: Record<string, unknown>;
  relatedPosts?: unknown;
}

type LifecycleEvent = {
  params?: {
    data?: BlogPostData;
  };
  data?: BlogPostData;
};

function getEventData(event: LifecycleEvent): BlogPostData {
  if (event?.params?.data && typeof event.params.data === 'object') {
    return event.params.data;
  }

  if (event?.data && typeof event.data === 'object') {
    return event.data;
  }

  if (event?.params) {
    event.params.data = {};
    return event.params.data;
  }

  event.data = {};
  return event.data;
}

function extractTextFromNode(node: unknown): string {
  if (node === null || node === undefined) return '';

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).filter(Boolean).join(' ');
  }

  if (typeof node === 'object') {
    const record = node as Record<string, unknown>;

    if (typeof record.text === 'string') {
      return record.text;
    }

    if (Array.isArray(record.children)) {
      return record.children.map(extractTextFromNode).filter(Boolean).join(' ');
    }
  }

  return '';
}

function toPlainText(content: unknown): string {
  if (!content) return '';

  if (typeof content === 'string') {
    return content
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const extracted = extractTextFromNode(content).replace(/\s+/g, ' ').trim();
  return extracted;
}

/**
 * Calculate reading time from content
 * Average reading speed: 200 words per minute
 */
function calculateReadingTime(plainText: string): number {
  if (!plainText) return 1;

  // Count words
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;

  // Calculate minutes (minimum 1 minute)
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Generate excerpt from content if not provided
 */
function generateExcerpt(plainText: string, maxLength: number = 297): string {
  if (!plainText) return '';

  // Remove extra spaces
  const cleaned = plainText.replace(/\s+/g, ' ');

  // Truncate and add ellipsis
  if (cleaned.length > maxLength) {
    return cleaned.substring(0, maxLength) + '...';
  }

  return cleaned;
}

function resolveCategoryId(category: BlogPostData['category']): number | null {
  if (typeof category === 'number') return category;

  if (!category || typeof category !== 'object') return null;

  if (typeof category.id === 'number') return category.id;

  const record = category as Record<string, unknown>;
  const relationValue = record.set ?? record.connect;

  if (typeof relationValue === 'number') return relationValue;

  if (Array.isArray(relationValue) && relationValue.length > 0) {
    const first = relationValue[0] as Record<string, unknown>;
    if (typeof first?.id === 'number') return first.id;
  }

  if (relationValue && typeof relationValue === 'object') {
    const valueRecord = relationValue as Record<string, unknown>;
    if (typeof valueRecord.id === 'number') return valueRecord.id;
  }

  return null;
}

/**
 * Generate breadcrumbs structured data
 * Uses PUBLIC_URL from Strapi config - no hardcoded URLs!
 */
function generateBreadcrumbs(data: BlogPostData, baseUrl: string): Record<string, unknown> | null {
  if (!data.category || !data.title) return null;
  const category = typeof data.category === 'object' ? data.category : null;
  if (!category) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Blog',
        item: `${baseUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category.name ?? 'Kategoria',
        item: `${baseUrl}/blog?category=${category.slug ?? ''}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.title,
      },
    ],
  };
}

/**
 * Generate Article structured data for SEO
 * Uses PUBLIC_URL from Strapi config - no hardcoded URLs!
 */
function generateArticleStructuredData(data: BlogPostData, baseUrl: string): Record<string, unknown> | null {
  if (!data.title) return null;

  const structuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.excerpt ?? '',
    datePublished: data.publishDate ?? new Date().toISOString(),
    dateModified: data.publishDate ?? new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: data.author?.name ?? 'SkładaMy Team',
      ...(data.author?.website && { url: data.author.website }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'SkładaMy',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${data.slug || ''}`,
    },
  };

  // Add image if featured image exists
  if (data.featuredImage?.url) {
    const imageUrl = data.featuredImage.url.startsWith('http')
      ? data.featuredImage.url
      : `${baseUrl}${data.featuredImage.url}`;

    structuredData.image = [imageUrl];
  }

  return structuredData;
}

/**
 * Process blog post data before create/update
 */
async function processData(event: LifecycleEvent) {
  const data = getEventData(event);

  // Get base URL from Strapi config - REQUIRED, no fallback
  const baseUrl = strapi.config.get('server.url');
  if (!baseUrl || typeof baseUrl !== 'string') {
    throw new Error('PUBLIC_URL is not configured in server config!');
  }

  const plainText = toPlainText(data.content);

  // Auto-calculate reading time from content — only when the author hasn't
  // set a manual value. Preserves editorial overrides.
  if (data.readTime == null) {
    if (plainText) {
      data.readTime = calculateReadingTime(plainText);
    } else {
      data.readTime = 1;
    }
  }

  // Auto-generate excerpt if missing
  if (!data.excerpt && plainText) {
    data.excerpt = generateExcerpt(plainText);
  }

  // Populate category for breadcrumbs generation
  let category: CategoryRef | null = null;
  const categoryId = resolveCategoryId(data.category);
  if (categoryId) {
    const found = await strapi.db.query('api::category.category').findOne({
      where: { id: categoryId },
      select: ['name', 'slug'],
    });
    category = found as CategoryRef | null;
  }

  // Generate breadcrumbs if category exists
  if (category) {
    data.breadcrumbs = generateBreadcrumbs(
      {
        ...data,
        category,
      },
      baseUrl,
    );
  }

  // Auto-generate structured data for SEO if not manually set
  if (data.seo && typeof data.seo === 'object') {
    const seo = data.seo as Record<string, unknown>;
    if (!seo.structuredData) {
      seo.structuredData = generateArticleStructuredData(
        {
          ...data,
          category,
        },
        baseUrl,
      );
    }

    // Set lastmod in SEO component
    data.seo.lastmod = new Date().toISOString();
  }
}

export default {
  async beforeCreate(event: LifecycleEvent) {
    await processData(event);
  },

  async beforeUpdate(event: LifecycleEvent) {
    await processData(event);
  },
};
