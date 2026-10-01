import { renderMarkdown } from "@/lib/content/processors/markdown";
import { tinaField } from "@/lib/tina-field";
import type { RichTextBlock } from "./blocks";

/** Free-form prose block (markdown/inline HTML) inside a page. */
export default function RichTextSection({ data }: { data: RichTextBlock }) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {data.heading && (
          <h2
            {...tinaField(data, "heading")}
            className="text-3xl font-bold text-neutral-900 text-center mb-12"
          >
            {data.heading}
          </h2>
        )}
        {data.content && (
          <div
            {...tinaField(data, "content")}
            className="prose prose-base max-w-none text-neutral-800 prose-headings:text-neutral-900 prose-a:text-[#6a4a00]"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(data.content) }}
          />
        )}
      </div>
    </section>
  );
}
