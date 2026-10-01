import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Loads the real Tina page document for tests so section components receive
 * the same props they get in production.
 */
const { data } = matter(fs.readFileSync(path.join(process.cwd(), "content/pages/home.md"), "utf8"));

export const homeSections = (data.sections ?? []) as Record<string, unknown>[];

/** First block of a given `_template` from the home page document. */
export function homeSection<T>(template: string): T {
  const block = homeSections.find((s) => s._template === template);
  if (!block) throw new Error(`No "${template}" section in content/pages/home.md`);
  return block as T;
}
