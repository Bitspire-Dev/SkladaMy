import CmsPage, { generateCmsMetadata } from "@/components/pages/CmsPage";

export const generateMetadata = () => generateCmsMetadata("kontakt");

export default function Page() {
  return <CmsPage slug="kontakt" mainClassName="py-20 bg-neutral-50" />;
}
