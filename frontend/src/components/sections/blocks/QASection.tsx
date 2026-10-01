import { Card, CardContent } from "@/components/ui/Card";
import { tinaField } from "@/lib/tina-field";
import type { QaBlock } from "./blocks";

/** Flat Q&A list (non-accordion) used on contact and local pages. */
export default function QASection({ data }: { data: QaBlock }) {
  const items = data.items ?? [];
  return (
    <section className="py-20 bg-neutral-50 border-t border-neutral-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 {...tinaField(data, "heading")} className="text-3xl font-bold text-neutral-900 mb-4">
            {data.heading}
          </h2>
        </div>
        <div className="space-y-6">
          {items.map((item, index) => (
            <Card
              key={index}
              className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              {...tinaField(data, "items", index)}
            >
              <CardContent className="p-6">
                <h3
                  {...tinaField(item, "question")}
                  className="font-semibold text-neutral-900 mb-2"
                >
                  {item.question}
                </h3>
                <p {...tinaField(item, "answer")} className="text-neutral-800 text-sm">
                  {item.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
