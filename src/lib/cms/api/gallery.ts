import "server-only";

import type { Gallery, SingleResponse } from "@/types/cms";
import { loadGallery } from "../reader";

/**
 * Fetch gallery data
 */
export const getGallery = async (): Promise<SingleResponse<Gallery>> => {
  try {
    const gallery = loadGallery();
    return {
      data: gallery ?? { images: [], featuredImages: [] },
      meta: {},
    };
  } catch {
    return {
      data: { images: [], featuredImages: [] },
      meta: {},
    };
  }
};
