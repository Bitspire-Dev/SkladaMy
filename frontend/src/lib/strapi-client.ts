import api, { buildQueryString, getMediaURL } from './axios-client';
import {
  BlogPost,
  Gallery,
  CollectionResponse,
  SingleResponse
} from '@/types/strapi';

// Blog API
export const getBlogPosts = async (params?: {
  featured?: boolean;
  limit?: number;
  sort?: string;
  search?: string;
}): Promise<CollectionResponse<BlogPost>> => {
  const queryParams: Record<string, string> = {};
  
  if (params?.featured !== undefined) {
    queryParams['filters[featured][$eq]'] = params.featured.toString();
  }
  if (params?.limit) {
    queryParams['pagination[limit]'] = params.limit.toString();
  }
  if (params?.sort) {
    queryParams['sort'] = params.sort;
  }
  if (params?.search) {
    queryParams['filters[title][$containsi]'] = params.search;
  }

  // Populate relations for blog posts
  queryParams['populate'] = '*';

  try {
    const response = await api.get(`/blog-posts?${buildQueryString(queryParams)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

// Get single blog post by slug
export const getBlogPost = async (slug: string): Promise<SingleResponse<BlogPost>> => {
  try {
    const response = await api.get(`/blog-posts`, {
      params: {
        'filters[slug][$eq]': slug,
        'populate': '*',
      }
    });

    // Strapi returns array for collection endpoints, get first item
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

// Get featured blog posts
export const getFeaturedBlogPosts = async (limit: number = 3): Promise<CollectionResponse<BlogPost>> => {
  return getBlogPosts({ 
    featured: true, 
    limit,
    sort: 'publishedAt:desc'
  });
};

// Gallery API (nowa pojedyncza galeria)
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

// Search function
export const searchContent = async (query: string, limit: number = 10) => {
  try {
    const [blogResults] = await Promise.all([
      getBlogPosts({ 
        search: query, 
        limit: Math.ceil(limit / 2)
      })
    ]);

    return {
      blog: blogResults.data || [],
      total: (blogResults.data?.length || 0)
    };
  } catch (error) {
    console.error('Error searching content:', error);
    throw error;
  }
};

// Contact form submission
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
    // Jeśli nie ma plików, wyślij jako JSON
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

    // Jeśli są pliki, najpierw uploaduj pliki
    const uploadedFiles = [];
    if (formData.files && formData.files.length > 0) {
      for (const file of formData.files) {
        const fileFormData = new FormData();
        fileFormData.append('files', file);
        
        const uploadResponse = await api.post('/upload', fileFormData);
        uploadedFiles.push(...uploadResponse.data);
      }
    }

    // Następnie wyślij dane formularza z ID uploadowanych plików
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

const strapiClient = {
  // Gallery (nowe)
  getGallery,
  updateGallery,
  
  // Blog
  getBlogPosts,
  getBlogPost,
  getFeaturedBlogPosts,
  
  // Search
  searchContent,
  
  // Contact
  submitContactForm,
  
  // Media
  getMediaURL,
};

export default strapiClient;
