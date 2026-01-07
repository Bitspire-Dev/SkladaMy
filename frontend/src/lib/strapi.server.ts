import 'server-only';

import axios from 'axios';
import type {
  BlogPost,
  Category,
  Tag,
  Gallery,
  CollectionResponse,
  SingleResponse,
  BlogFilters,
} from '@/types/strapi';

const getRequiredEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} must be set in environment`);
  return value;
};

const STRAPI_URL = getRequiredEnv('NEXT_PUBLIC_STRAPI_URL');

// Token is optional: if you configure Strapi Public permissions for read, you can omit it.
// If your Strapi requires auth for these endpoints, set STRAPI_API_TOKEN on the server.
const API_TOKEN = process.env.STRAPI_API_TOKEN;

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (API_TOKEN) {
      config.headers.Authorization = `Bearer ${API_TOKEN}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const buildQueryString = (
  params?: Record<string, string | number | boolean | string[]>
): string => {
  if (!params) return '';

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(`${key}[]`, item.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

// ============================================================================
// Blog API
// ============================================================================

export const getCategories = async (): Promise<CollectionResponse<Category>> => {
  try {
    const response = await api.get('/categories', {
      params: {
        populate: '*',
        sort: 'name:asc',
      },
    });
    return response.data;
  } catch {
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 0,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
};

export const getTags = async (): Promise<CollectionResponse<Tag>> => {
  try {
    const response = await api.get('/tags', {
      params: {
        sort: 'name:asc',
      },
    });
    return response.data;
  } catch {
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 0,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
};

export const getBlogPosts = async (
  filters?: BlogFilters
): Promise<CollectionResponse<BlogPost>> => {
  const queryParams: Record<string, string> = {};

  if (filters?.search) {
    queryParams['filters[$or][0][title][$containsi]'] = filters.search;
    queryParams['filters[$or][1][excerpt][$containsi]'] = filters.search;
    queryParams['filters[$or][2][content][$containsi]'] = filters.search;
  }

  if (filters?.category) {
    queryParams['filters[category][slug][$eq]'] = filters.category;
  }

  if (filters?.tags && filters.tags.length > 0) {
    filters.tags.forEach((tag, index) => {
      queryParams[`filters[tags][slug][$in][${index}]`] = tag;
    });
  }

  const pageSize = filters?.limit || filters?.pageSize;
  if (filters?.page) {
    queryParams['pagination[page]'] = filters.page.toString();
  }
  if (pageSize) {
    queryParams['pagination[pageSize]'] = pageSize.toString();
  }

  queryParams['populate[featuredImage][fields][0]'] = 'url';
  queryParams['populate[featuredImage][fields][1]'] = 'alternativeText';
  queryParams['populate[featuredImage][fields][2]'] = 'width';
  queryParams['populate[featuredImage][fields][3]'] = 'height';
  queryParams['populate[author][fields][0]'] = 'name';
  queryParams['populate[author][fields][1]'] = 'email';
  queryParams['populate[author][populate][avatar][fields][0]'] = 'url';
  queryParams['populate[category][fields][0]'] = 'name';
  queryParams['populate[category][fields][1]'] = 'slug';
  queryParams['populate[category][fields][2]'] = 'color';
  queryParams['populate[tags][fields][0]'] = 'name';
  queryParams['populate[tags][fields][1]'] = 'slug';
  queryParams['populate[seo][fields][0]'] = 'metaTitle';
  queryParams['populate[seo][fields][1]'] = 'metaDescription';
  queryParams['populate[seo][fields][2]'] = 'keywords';
  queryParams['sort'] = 'publishDate:desc';

  try {
    const response = await api.get(`/blog-posts${buildQueryString(queryParams)}`);
    return response.data;
  } catch {
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 0,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
};

export const getBlogPost = async (slug: string): Promise<SingleResponse<BlogPost>> => {
  const response = await api.get('/blog-posts', {
    params: {
      'filters[slug][$eq]': slug,
      'populate[featuredImage][fields][0]': 'url',
      'populate[featuredImage][fields][1]': 'alternativeText',
      'populate[featuredImage][fields][2]': 'width',
      'populate[featuredImage][fields][3]': 'height',
      'populate[author][populate][avatar][fields][0]': 'url',
      'populate[category][fields][0]': 'name',
      'populate[category][fields][1]': 'slug',
      'populate[tags][fields][0]': 'name',
      'populate[tags][fields][1]': 'slug',
      'populate[relatedPosts][populate][featuredImage][fields][0]': 'url',
      'populate[relatedPosts][populate][featuredImage][fields][1]': 'alternativeText',
      'populate[relatedPosts][populate][author][fields][0]': 'name',
      'populate[relatedPosts][populate][category][fields][0]': 'name',
      'populate[relatedPosts][populate][category][fields][1]': 'slug',
      'populate[gallery][fields][0]': 'url',
      'populate[gallery][fields][1]': 'alternativeText',
      'populate[seo][populate][ogImage][fields][0]': 'url',
      'populate[seo][fields][0]': 'metaTitle',
      'populate[seo][fields][1]': 'metaDescription',
    },
  });

  const posts = response.data.data;
  if (!posts || posts.length === 0) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }

  return {
    data: posts[0],
    meta: response.data.meta,
  };
};

export const getFeaturedBlogPosts = async (
  limit: number = 3
): Promise<CollectionResponse<BlogPost>> => {
  return getBlogPosts({ pageSize: limit });
};

// ============================================================================
// Gallery API
// ============================================================================

export const getGallery = async (): Promise<SingleResponse<Gallery>> => {
  try {
    const response = await api.get('/gallery', {
      params: {
        populate: '*',
      },
    });
    return response.data;
  } catch {
    return {
      data: {
        id: 0,
        images: [],
        featuredImages: [],
        createdAt: '',
        updatedAt: '',
        publishedAt: '',
      },
      meta: {},
    };
  }
};

export const searchContent = async (query: string, limit: number = 10) => {
  const blogResults = await getBlogPosts({ search: query, pageSize: limit });
  return {
    blog: blogResults.data || [],
    total: blogResults.data?.length || 0,
  };
};
