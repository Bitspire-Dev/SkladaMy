import "server-only";

import type { Category, CollectionResponse } from "@/types/cms";
import { loadCategories } from "../reader";

/**
 * Fetch all blog categories
 */
export const getCategories = async (): Promise<CollectionResponse<Category>> => {
  try {
    const categories = loadCategories();
    return {
      data: categories,
      meta: {
        pagination: {
          page: 1,
          pageSize: categories.length,
          pageCount: 1,
          total: categories.length,
        },
      },
    };
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
