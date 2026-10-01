import { MapPin } from "lucide-react";
import { renderInlineMarkdown } from "@/lib/content/processors/markdown";
import { tinaField } from "@/lib/tina-field";
import type { ListGridBlock } from "./blocks";

export default function ListGridSection({ data }: { data: ListGridBlock }) {
  const items = data.entries ?? [];
  return (
    <section className="py-20 bg-neutral-50 border-y border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 {...tinaField(data, "heading")} className="text-3xl font-bold text-neutral-900 mb-4">
            {data.heading}
          </h2>
          {data.subtext && (
            <p {...tinaField(data, "subtext")} className="text-neutral-800 max-w-2xl mx-auto">
              {data.subtext}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              {...tinaField(data, "entries", index)}
              className="flex items-center p-3 bg-white rounded-lg border border-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <MapPin className="h-4 w-4 text-[#6a4a00] mr-2 shrink-0" />
              <span className="text-sm text-neutral-800">{item}</span>
            </div>
          ))}
        </div>

        {data.note && (
          <div className="text-center mt-8">
            <p
              {...tinaField(data, "note")}
              className="text-sm text-neutral-700"
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(data.note) }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
