import CmsPage, { generateCmsMetadata } from "@/components/pages/CmsPage";

export const generateMetadata = () => generateCmsMetadata("slupsk");

export default function Page() {
  return <CmsPage slug="slupsk" />;
}
