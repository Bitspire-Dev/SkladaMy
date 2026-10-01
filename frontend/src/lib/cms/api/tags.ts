import "server-only";

import type { Tag, CollectionResponse } from "@/types/cms";
import { loadTags } from "../reader";

/**
 * Fetch all blog tags
 */
export const getTags = async (): Promise<CollectionResponse<Tag>> => {
  try {
    const tags = loadTags();
    return {
      data: tags,
      meta: {
        pagination: {
          page: 1,
          pageSize: tags.length,
          pageCount: 1,
          total: tags.length,
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
