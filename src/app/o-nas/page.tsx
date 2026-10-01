import CmsPage, { generateCmsMetadata } from "@/components/pages/CmsPage";

export const generateMetadata = () => generateCmsMetadata("o-nas");

export default function Page() {
  return <CmsPage slug="o-nas" />;
}
