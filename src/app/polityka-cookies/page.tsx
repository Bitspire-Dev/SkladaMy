import CmsPage, { generateCmsMetadata } from "@/components/pages/CmsPage";

export const generateMetadata = () => generateCmsMetadata("polityka-cookies");

export default function Page() {
  return <CmsPage slug="polityka-cookies" mainClassName="bg-neutral-50" />;
}
