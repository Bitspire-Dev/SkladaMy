/**
 * Blog Post Lifecycle Hooks
 * Auto-calculate readTime, excerpt, breadcrumbs, and structured data
 */

interface BlogPostData {
  title?: string;
  content?: string;
  excerpt?: string;
  readTime?: number;
  breadcrumbs?: any;
  category?: any;
  slug?: string;
  publishDate?: string;
  author?: any;
  featuredImage?: any;
  seo?: any;
}

/**
 * Calculate reading time from content
 * Average reading speed: 200 words per minute
 */
function calculateReadingTime(content: string): number {
  if (!content) return 1;
  
  // Remove HTML tags
  const plainText = content.replace(/<[^>]*>/g, ' ');
  
  // Count words
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  
  // Calculate minutes (minimum 1 minute)
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Generate excerpt from content if not provided
 */
function generateExcerpt(content: string, maxLength: number = 297): string {
  if (!content) return '';
  
  // Remove HTML tags
  const plainText = content.replace(/<[^>]*>/g, ' ').trim();
  
  // Remove extra spaces
  const cleaned = plainText.replace(/\s+/g, ' ');
  
  // Truncate and add ellipsis
  if (cleaned.length > maxLength) {
    return cleaned.substring(0, maxLength) + '...';
  }
  
  return cleaned;
}

/**
 * Generate breadcrumbs structured data
 */
function generateBreadcrumbs(data: BlogPostData, baseUrl: string = 'https://skladamy.pl'): any {
  if (!data.category || !data.title) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Blog',
        item: `${baseUrl}/blog`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: data.category.name || 'Kategoria',
        item: `${baseUrl}/blog?category=${data.category.slug || ''}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.title
      }
    ]
  };
}

/**
 * Generate Article structured data for SEO
 */
function generateArticleStructuredData(data: BlogPostData, baseUrl: string = 'https://skladamy.pl'): any {
  if (!data.title) return null;
  
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.excerpt || '',
    datePublished: data.publishDate || new Date().toISOString(),
    dateModified: data.publishDate || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: data.author?.name || 'SkładaMy Team',
      ...(data.author?.website && { url: data.author.website })
    },
    publisher: {
      '@type': 'Organization',
      name: 'SkładaMy',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${data.slug || ''}`
    }
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
async function processData(event: any) {
  const { data } = event.params;
  
  // Auto-calculate reading time from content
  if (data.content) {
    data.readTime = calculateReadingTime(data.content);
  }
  
  // Auto-generate excerpt if missing
  if (!data.excerpt && data.content) {
    data.excerpt = generateExcerpt(data.content);
  }
  
  // Populate category for breadcrumbs generation
  let category = data.category;
  if (typeof data.category === 'number' || (typeof data.category === 'object' && data.category?.id)) {
    const categoryId = typeof data.category === 'number' ? data.category : data.category.id;
    category = await strapi.db.query('api::category.category').findOne({
      where: { id: categoryId },
      select: ['name', 'slug']
    });
  }
  
  // Generate breadcrumbs if category exists
  if (category) {
    data.breadcrumbs = generateBreadcrumbs({
      ...data,
      category
    });
  }
  
  // Auto-generate structured data for SEO if not manually set
  if (data.seo && !data.seo.structuredData) {
    data.seo.structuredData = generateArticleStructuredData({
      ...data,
      category
    });
  }
  
  // Set lastmod in SEO component
  if (data.seo) {
    data.seo.lastmod = new Date().toISOString();
  }
}

export default {
  async beforeCreate(event: any) {
    await processData(event);
  },
  
  async beforeUpdate(event: any) {
    await processData(event);
  }
};
