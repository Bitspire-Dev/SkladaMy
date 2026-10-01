import CmsPage, { generateCmsMetadata } from "@/components/pages/CmsPage";

export const generateMetadata = () => generateCmsMetadata("home");

export default function Page() {
  return <CmsPage slug="home" />;
}
