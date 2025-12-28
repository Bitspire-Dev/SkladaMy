import axios from 'axios';
import {
  BlogPost,
  Category,
  Tag,
  Gallery,
  CollectionResponse,
  SingleResponse,
  BlogFilters
} from '@/types/strapi';

// Configuration
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.skladamy.com.pl';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Create axios instance with default config
const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth
api.interceptors.request.use(
  (config) => {
    if (API_TOKEN) {
      config.headers.Authorization = `Bearer ${API_TOKEN}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          console.error('Unauthorized access - check API token');
          break;
        case 403:
          console.error('Forbidden - insufficient permissions');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 429:
          console.error('Rate limit exceeded');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error(`API Error ${status}:`, data?.error?.message || 'Unknown error');
      }
    } else if (error.request) {
      console.error('Network error - no response received');
    } else {
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Helper function for building query strings
export const buildQueryString = (params?: Record<string, string | number | boolean | string[]>): string => {
  if (!params) return '';
  
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(`${key}[]`, item.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

// Media URL helper
export const getMediaURL = (media: { url?: string; attributes?: { url?: string } } | null | undefined): string => {
  if (!media) return '';
  
  const url = media.url || media.attributes?.url;
  if (!url) return '';
  
  // If URL is relative, prepend Strapi URL
  if (url.startsWith('/')) {
    return `${STRAPI_URL}${url}`;
  }
  
  return url;
};

// ============================================================================
// Blog API
// ============================================================================

export const getCategories = async (): Promise<CollectionResponse<Category>> => {
  try {
    const response = await api.get('/categories', {
      params: {
        populate: '*',
        sort: 'name:asc'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getTags = async (): Promise<CollectionResponse<Tag>> => {
  try {
    const response = await api.get('/tags', {
      params: {
        sort: 'name:asc'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

export const getBlogPosts = async (filters?: BlogFilters): Promise<CollectionResponse<BlogPost>> => {
  const queryParams: Record<string, string> = {};
  
  // Search filter
  if (filters?.search) {
    queryParams['filters[$or][0][title][$containsi]'] = filters.search;
    queryParams['filters[$or][1][excerpt][$containsi]'] = filters.search;
    queryParams['filters[$or][2][content][$containsi]'] = filters.search;
  }

  // Category filter
  if (filters?.category) {
    queryParams['filters[category][slug][$eq]'] = filters.category;
  }

  // Tags filter
  if (filters?.tags && filters.tags.length > 0) {
    filters.tags.forEach((tag, index) => {
      queryParams[`filters[tags][slug][$in][${index}]`] = tag;
    });
  }

  // Pagination - handle both 'limit' (alias) and 'pageSize'
  const pageSize = filters?.limit || filters?.pageSize;
  if (filters?.page) {
    queryParams['pagination[page]'] = filters.page.toString();
  }
  if (pageSize) {
    queryParams['pagination[pageSize]'] = pageSize.toString();
  }

  // Populate relations (Strapi v5 syntax)
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
    const response = await api.get(`/blog-posts?${buildQueryString(queryParams)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

export const getBlogPost = async (slug: string): Promise<SingleResponse<BlogPost>> => {
  try {
    const response = await api.get(`/blog-posts`, {
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
      }
    });

    const posts = response.data.data;
    if (posts.length === 0) {
      throw new Error(`Blog post with slug "${slug}" not found`);
    }

    return {
      data: posts[0],
      meta: response.data.meta
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error);
    throw error;
  }
};

export const getFeaturedBlogPosts = async (limit: number = 3): Promise<CollectionResponse<BlogPost>> => {
  return getBlogPosts({ 
    pageSize: limit
  });
};

// ============================================================================
// Gallery API
// ============================================================================

export const getGallery = async (): Promise<SingleResponse<Gallery>> => {
  try {
    const response = await api.get('/gallery', {
      params: {
        populate: '*'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching gallery:', error);
    throw error;
  }
};

export const updateGallery = async (data: Partial<Gallery>): Promise<SingleResponse<Gallery>> => {
  try {
    const response = await api.put('/gallery', { data });
    return response.data;
  } catch (error) {
    console.error('Error updating gallery:', error);
    throw error;
  }
};

// ============================================================================
// Search
// ============================================================================

export const searchContent = async (query: string, limit: number = 10) => {
  try {
    const blogResults = await getBlogPosts({ 
      search: query, 
      pageSize: limit
    });

    return {
      blog: blogResults.data || [],
      total: (blogResults.data?.length || 0)
    };
  } catch (error) {
    console.error('Error searching content:', error);
    throw error;
  }
};

// ============================================================================
// Contact Form
// ============================================================================

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  files?: File[];
}

export const submitContactForm = async (formData: ContactFormData) => {
  try {
    // If no files, send as JSON
    if (!formData.files || formData.files.length === 0) {
      const response = await api.post('/contacts', {
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          subject: formData.subject,
          message: formData.message
        }
      });
      return response.data;
    }

    // Upload files first
    const uploadedFiles = [];
    for (const file of formData.files) {
      const fileFormData = new FormData();
      fileFormData.append('files', file);
      
      const uploadResponse = await api.post('/upload', fileFormData);
      uploadedFiles.push(...uploadResponse.data);
    }

    // Submit form with file IDs
    const response = await api.post('/contacts', {
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        subject: formData.subject,
        message: formData.message,
        files: uploadedFiles.map(file => file.id)
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

// Export configured axios instance
export default api;
