// =============================================================================
// PAGE CONTENT (TinaCMS "page" collection)
// Fetches `content/pages/<slug>.md` documents.
//
// - Outside of `next build` we try the local GraphQL datalayer on :4001 first,
//   so `useTina` gets a live query string when `tinacms dev` is running and
//   edits update the preview instantly. NODE_ENV is unreliable here because
//   .env may pin it to "production".
// - When the datalayer is unreachable (plain `next dev`/`next start`) or during
//   `next build` (NEXT_PHASE=phase-production-build) content is read straight
//   from the filesystem — no Tina server needed.
// =============================================================================

import "server-only";
import { loadPage } from "./reader";

export interface PageQueryResult {
  /** `data.page` matches Tina's `page` query result shape */
  data: { page: Record<string, unknown> | null };
  /** GraphQL query text used for live preview updates ("" when offline) */
  query: string;
  variables: { relativePath: string };
}

// Cache datalayer availability so an absent Tina server costs one probe.
let tinaUnavailable = false;

/**
 * Load a page document. `slug` is the markdown filename without extension
 * (e.g. "home", "o-nas"). Returns null when the page doesn't exist.
 */
export async function getPage(slug: string): Promise<PageQueryResult | null> {
  const relativePath = `${slug}.md`;

  if (process.env.NEXT_PHASE !== "phase-production-build" && !tinaUnavailable) {
    try {
      const { client } = await import("../../../tina/__generated__/client");
      const res = await client.queries.page({ relativePath });
      return {
        data: res.data as PageQueryResult["data"],
        query: res.query,
        variables: res.variables as { relativePath: string },
      };
    } catch {
      // `tinacms dev` is not running — fall back to the filesystem reader.
      tinaUnavailable = true;
    }
  }

  const page = loadPage(slug);
  if (!page) return null;
  return { data: { page }, query: "", variables: { relativePath } };
}
