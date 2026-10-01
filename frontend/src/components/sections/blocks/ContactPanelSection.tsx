import ContactForm from "@/components/sections/ContactForm";
import { getIcon } from "./icons";
import { resolveHref, resolveText } from "./resolve";
import { tinaField } from "@/lib/tina-field";
import type { ContactPanelBlock } from "./blocks";

/** Two-column contact info + form panel (kontakt page). */
export default function ContactPanelSection({ data }: { data: ContactPanelBlock }) {
  const infoItems = data.contacts ?? [];
  const prepItems = data.prepItems ?? [];
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Contact Info */}
        <div>
          {data.infoHeading && (
            <h2
              {...tinaField(data, "infoHeading")}
              className="text-2xl font-semibold text-neutral-900 mb-6"
            >
              {data.infoHeading}
            </h2>
          )}

          <div className="grid grid-cols-1 gap-4">
            {infoItems.map((item, index) => {
              const Icon = getIcon(item.icon);
              const text = resolveText(item.text);
              const href =
                item.href ||
                (item.text === "tel:" || item.text === "mail:"
                  ? resolveHref(item.text)
                  : undefined);
              return (
                <div
                  key={index}
                  {...tinaField(data, "contacts", index)}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg border border-neutral-200 shadow-sm"
                >
                  <div
                    {...tinaField(item, "icon")}
                    className="shrink-0 w-10 h-10 rounded-md bg-[#FFC400]/20 text-[#6a4a00] flex items-center justify-center"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div {...tinaField(item, "title")} className="font-semibold text-neutral-900">
                      {item.title}
                    </div>
                    {text && (
                      <div {...tinaField(item, "text")} className="text-neutral-700">
                        {href ? (
                          <a href={href} className="hover:underline">
                            {text}
                          </a>
                        ) : (
                          text
                        )}
                      </div>
                    )}
                    {item.note && (
                      <div {...tinaField(item, "note")} className="text-sm text-neutral-600 mt-1">
                        {item.note}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional info */}
          {(data.prepTitle || prepItems.length > 0) && (
            <div className="mt-8 p-6 bg-white rounded-lg border border-neutral-200 shadow-sm">
              {data.prepTitle && (
                <h3
                  {...tinaField(data, "prepTitle")}
                  className="font-semibold text-neutral-900 mb-3"
                >
                  {data.prepTitle}
                </h3>
              )}
              <ul className="space-y-2 text-sm text-neutral-700">
                {prepItems.map((item, i) => (
                  <li key={item} {...tinaField(data, "prepItems", i)}>
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Contact Form */}
        <div>
          {data.formHeading && (
            <h2
              {...tinaField(data, "formHeading")}
              className="text-2xl font-bold text-foreground mb-6"
            >
              {data.formHeading}
            </h2>
          )}
          <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-4">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
