import "server-only";

import type { Tag, CollectionResponse } from "@/types/strapi";
import { api } from "../client";

/**
 * Fetch all blog tags
 */
export const getTags = async (): Promise<CollectionResponse<Tag>> => {
  try {
    const response = await api.get("/tags", {
      params: {
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
