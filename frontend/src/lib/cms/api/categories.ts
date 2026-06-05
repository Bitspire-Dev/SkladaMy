import "server-only";

import type { Category, CollectionResponse } from "@/types/strapi";
import { api } from "../client";

/**
 * Fetch all blog categories
 */
export const getCategories = async (): Promise<CollectionResponse<Category>> => {
  try {
    const response = await api.get("/categories", {
      params: {
        populate: "*",
        sort: "name:asc",
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
