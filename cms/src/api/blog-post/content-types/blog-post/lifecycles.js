"use strict";
/**
 * Blog Post Lifecycle Hooks
 * Auto-calculate readTime, excerpt, breadcrumbs, and structured data
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Calculate reading time from content
 * Average reading speed: 200 words per minute
 */
function calculateReadingTime(content) {
    if (!content)
        return 1;
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
function generateExcerpt(content, maxLength = 297) {
    if (!content)
        return '';
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
 * Uses PUBLIC_URL from Strapi config - no hardcoded URLs!
 */
function generateBreadcrumbs(data, baseUrl) {
    var _a, _b;
    if (!data.category || !data.title)
        return null;
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
                name: (_a = data.category.name) !== null && _a !== void 0 ? _a : 'Kategoria',
                item: `${baseUrl}/blog?category=${(_b = data.category.slug) !== null && _b !== void 0 ? _b : ''}`
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
 * Uses PUBLIC_URL from Strapi config - no hardcoded URLs!
 */
function generateArticleStructuredData(data, baseUrl) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!data.title)
        return null;
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: (_a = data.excerpt) !== null && _a !== void 0 ? _a : '',
        datePublished: (_b = data.publishDate) !== null && _b !== void 0 ? _b : new Date().toISOString(),
        dateModified: (_c = data.publishDate) !== null && _c !== void 0 ? _c : new Date().toISOString(),
        author: {
            '@type': 'Person',
            name: (_e = (_d = data.author) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : 'SkładaMy Team',
            ...(((_f = data.author) === null || _f === void 0 ? void 0 : _f.website) && { url: data.author.website })
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
    if ((_g = data.featuredImage) === null || _g === void 0 ? void 0 : _g.url) {
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
async function processData(event) {
    var _a;
    const { data } = event;
    // Get base URL from Strapi config - REQUIRED, no fallback
    const baseUrl = strapi.config.get('server.url');
    if (!baseUrl || typeof baseUrl !== 'string') {
        throw new Error('PUBLIC_URL is not configured in server config!');
    }
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
    if (typeof data.category === 'number' || (typeof data.category === 'object' && ((_a = data.category) === null || _a === void 0 ? void 0 : _a.id))) {
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
        }, baseUrl);
    }
    // Auto-generate structured data for SEO if not manually set
    if (data.seo && !data.seo.structuredData) {
        data.seo.structuredData = generateArticleStructuredData({
            ...data,
            category
        }, baseUrl);
    }
    // Set lastmod in SEO component
    if (data.seo) {
        data.seo.lastmod = new Date().toISOString();
    }
}
exports.default = {
    async beforeCreate(event) {
        await processData(event);
    },
    async beforeUpdate(event) {
        await processData(event);
    }
};
