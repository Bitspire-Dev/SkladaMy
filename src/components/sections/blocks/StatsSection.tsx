import { tinaField } from "@/lib/tina-field";
import type { StatsBlock } from "./blocks";

export default function StatsSection({ data }: { data: StatsBlock }) {
  const items = data.items ?? [];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {data.heading && (
          <div className="text-center mb-12">
            <h2
              {...tinaField(data, "heading")}
              className="text-3xl font-bold text-neutral-900 mb-4"
            >
              {data.heading}
            </h2>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((stat, index) => (
            <div key={index} className="text-center" {...tinaField(data, "items", index)}>
              <div {...tinaField(stat, "value")} className="text-3xl font-bold text-[#FFC400] mb-1">
                {stat.value}
              </div>
              <div {...tinaField(stat, "label")} className="text-sm text-neutral-700">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
