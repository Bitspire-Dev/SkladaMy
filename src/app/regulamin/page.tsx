import CmsPage, { generateCmsMetadata } from "@/components/pages/CmsPage";

export const generateMetadata = () => generateCmsMetadata("regulamin");

export default function Page() {
  return <CmsPage slug="regulamin" mainClassName="bg-neutral-50" />;
}
