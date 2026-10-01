// Resolves CTA hrefs stored in Tina content. The magic values "tel:" and
// "mail:" expand to the configured company phone / e-mail.
import { COMPANY_CONFIG, formatPhoneForTel } from "@/lib/config";

export function resolveHref(href: string): string {
  if (href === "tel:") return `tel:${formatPhoneForTel()}`;
  if (href === "mail:") return `mailto:${COMPANY_CONFIG.email}`;
  return href;
}

/** For display text: "tel:" → formatted phone, "mail:" → e-mail address. */
export function resolveText(text?: string): string | undefined {
  if (text === "tel:") return COMPANY_CONFIG.phone;
  if (text === "mail:") return COMPANY_CONFIG.email;
  return text;
}
