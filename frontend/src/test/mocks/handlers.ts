import { http, HttpResponse } from "msw";
import { mockBlogPosts, mockCategories, mockGallery } from "./data";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export const handlers = [
  // Blog Posts
  http.get(`${STRAPI_URL}/api/blog-posts`, () => {
    return HttpResponse.json({
      data: mockBlogPosts,
      meta: {
        pagination: {
          page: 1,
          pageSize: mockBlogPosts.length,
          pageCount: 1,
          total: mockBlogPosts.length,
        },
      },
    });
  }),

  // Categories
  http.get(`${STRAPI_URL}/api/categories`, () => {
    return HttpResponse.json({
      data: mockCategories,
      meta: {
        pagination: {
          page: 1,
          pageSize: mockCategories.length,
          pageCount: 1,
          total: mockCategories.length,
        },
      },
    });
  }),

  // Gallery
  http.get(`${STRAPI_URL}/api/gallery`, () => {
    return HttpResponse.json({
      data: mockGallery,
      meta: {},
    });
  }),
];
