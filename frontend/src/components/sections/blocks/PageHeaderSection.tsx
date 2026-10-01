import { renderInlineMarkdown } from "@/lib/content/processors/markdown";
import { tinaField } from "@/lib/tina-field";
import type { PageHeaderBlock } from "./blocks";

/** Centered page header: badge, h1 title, subtitle, optional badge chips. */
export default function PageHeaderSection({ data }: { data: PageHeaderBlock }) {
  const badges = data.badges ?? [];
  const Wrapper = data.bare ? "div" : "section";
  return (
    <Wrapper className={data.bare ? "text-center mb-12" : "bg-white py-16 border-b"}>
      <div className={data.bare ? "max-w-4xl mx-auto" : "container mx-auto px-4"}>
        <div className="max-w-4xl mx-auto text-center">
          {data.badge && (
            <div
              {...tinaField(data, "badge")}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600 mb-4"
            >
              <span className="inline-block size-1.5 rounded-full bg-[#FFC400]" />
              {data.badge}
            </div>
          )}
          <h1
            {...tinaField(data, "title")}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            {data.title}
          </h1>
          {data.subtitle && (
            <p
              {...tinaField(data, "subtitle")}
              className="text-xl text-gray-700 mb-8"
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(data.subtitle) }}
            />
          )}
          {badges.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
              {badges.map((badge, i) => (
                <span key={badge} {...tinaField(data, "badges", i)}>
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
