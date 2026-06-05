import "server-only";

import type { Gallery, SingleResponse } from "@/types/strapi";
import { api } from "../client";

/**
 * Fetch gallery data
 */
export const getGallery = async (): Promise<SingleResponse<Gallery>> => {
  try {
    const response = await api.get("/gallery", {
      params: {
        populate: "*",
      },
    });
    return response.data;
  } catch {
    return {
      data: {
        id: 0,
        images: [],
        featuredImages: [],
        createdAt: "",
        updatedAt: "",
        publishedAt: "",
      },
      meta: {},
    };
  }
};
