import { tinaField as tinaFieldBase } from "tinacms/dist/tina-field";

/**
 * Loosely-typed `tinaField` wrapper returning spreadable props.
 *
 * Emits two attributes per element:
 * - `data-tina-field` = `queryId---path` — picked up by useTina's click
 *   handler inside the preview iframe (click → selects field in the sidebar)
 * - `data-tinafield` = local field path — used by the admin to
 *   highlight/scroll the element when hovering a field in the form
 *
 * Returns `{}` for objects without Tina query metadata (filesystem
 * fallback data), so attributes are simply not rendered.
 */
export function tinaField(
  object: object | null | undefined,
  property?: string,
  index?: number
): Record<string, string | undefined> {
  const full = tinaFieldBase(object as Record<string, unknown> | null | undefined, property, index);
  if (!full) return {};
  const path = full.split("---")[1] ?? "";
  // Strip the root resolver name (e.g. "page.") — admin field names are
  // relative to the document, e.g. "sections.0.heading".
  const local = path.split(".").slice(1).join(".") || undefined;
  return { "data-tina-field": full, "data-tinafield": local };
}
