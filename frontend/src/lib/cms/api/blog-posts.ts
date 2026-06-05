import "server-only";

import type { BlogPost, CollectionResponse, SingleResponse, BlogFilters } from "@/types/strapi";
import { api, buildQueryString } from "../client";

/**
 * Fetch all blog posts with optional filtering
 */
export const getBlogPosts = async (
  filters?: BlogFilters
): Promise<CollectionResponse<BlogPost>> => {
  const queryParams: Record<string, string> = {};

  if (filters?.search) {
    queryParams["filters[$or][0][title][$containsi]"] = filters.search;
    queryParams["filters[$or][1][excerpt][$containsi]"] = filters.search;
    queryParams["filters[$or][2][content][$containsi]"] = filters.search;
  }

  if (filters?.category) {
    queryParams["filters[category][slug][$eq]"] = filters.category;
  }

  if (filters?.tags && filters.tags.length > 0) {
    filters.tags.forEach((tag, index) => {
      queryParams[`filters[tags][slug][$in][${index}]`] = tag;
    });
  }

  const pageSize = filters?.limit || filters?.pageSize;
  if (filters?.page) {
    queryParams["pagination[page]"] = filters.page.toString();
  }
  if (pageSize) {
    queryParams["pagination[pageSize]"] = pageSize.toString();
  }

  queryParams["populate[featuredImage][fields][0]"] = "url";
  queryParams["populate[featuredImage][fields][1]"] = "alternativeText";
  queryParams["populate[featuredImage][fields][2]"] = "width";
  queryParams["populate[featuredImage][fields][3]"] = "height";
  queryParams["populate[author][fields][0]"] = "name";
  queryParams["populate[author][fields][1]"] = "email";
  queryParams["populate[author][populate][avatar][fields][0]"] = "url";
  queryParams["populate[category][fields][0]"] = "name";
  queryParams["populate[category][fields][1]"] = "slug";
  queryParams["populate[category][fields][2]"] = "color";
  queryParams["populate[tags][fields][0]"] = "name";
  queryParams["populate[tags][fields][1]"] = "slug";
  queryParams["populate[seo][fields][0]"] = "metaTitle";
  queryParams["populate[seo][fields][1]"] = "metaDescription";
  queryParams["populate[seo][fields][2]"] = "keywords";
  queryParams["sort"] = "publishDate:desc";

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

/**
 * Fetch a single blog post by slug
 */
export const getBlogPost = async (slug: string): Promise<SingleResponse<BlogPost>> => {
  const response = await api.get("/blog-posts", {
    params: {
      "filters[slug][$eq]": slug,
      "populate[featuredImage][fields][0]": "url",
      "populate[featuredImage][fields][1]": "alternativeText",
      "populate[featuredImage][fields][2]": "width",
      "populate[featuredImage][fields][3]": "height",
      "populate[author][populate][avatar][fields][0]": "url",
      "populate[category][fields][0]": "name",
      "populate[category][fields][1]": "slug",
      "populate[tags][fields][0]": "name",
      "populate[tags][fields][1]": "slug",
      "populate[relatedPosts][populate][featuredImage][fields][0]": "url",
      "populate[relatedPosts][populate][featuredImage][fields][1]": "alternativeText",
      "populate[relatedPosts][populate][author][fields][0]": "name",
      "populate[relatedPosts][populate][category][fields][0]": "name",
      "populate[relatedPosts][populate][category][fields][1]": "slug",
      "populate[gallery][fields][0]": "url",
      "populate[gallery][fields][1]": "alternativeText",
      "populate[seo][populate][ogImage][fields][0]": "url",
      "populate[seo][fields][0]": "metaTitle",
      "populate[seo][fields][1]": "metaDescription",
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

/**
 * Fetch featured blog posts (most recent)
 */
export const getFeaturedBlogPosts = async (
  limit: number = 3
): Promise<CollectionResponse<BlogPost>> => {
  return getBlogPosts({ pageSize: limit });
};
