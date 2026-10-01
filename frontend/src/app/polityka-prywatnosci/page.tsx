import CmsPage, { generateCmsMetadata } from "@/components/pages/CmsPage";

export const generateMetadata = () => generateCmsMetadata("polityka-prywatnosci");

export default function Page() {
  return <CmsPage slug="polityka-prywatnosci" mainClassName="bg-neutral-50" />;
}
