import type { BlogTag } from "@/types/strapi";

/**
 * Limit number of tags to display
 */
export const limitTags = (tags?: BlogTag[], limit?: number): BlogTag[] => {
  if (!tags || !Array.isArray(tags)) return [];
  return limit ? tags.slice(0, limit) : tags;
};
