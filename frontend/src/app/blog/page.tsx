import BlogPage from "@/components/pages/BlogPage";
import { generateCmsMetadata } from "@/components/pages/CmsPage";
import { getPage } from "@/lib/cms/pages";

export const generateMetadata = () => generateCmsMetadata("blog");

export default async function Page() {
  const live = await getPage("blog");
  return <BlogPage live={live} />;
}
