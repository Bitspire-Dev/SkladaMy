import PortfolioPage from "@/components/pages/PortfolioPage";
import { generateCmsMetadata } from "@/components/pages/CmsPage";
import { getPage } from "@/lib/cms/pages";

export const generateMetadata = () => generateCmsMetadata("portfolio");

export default async function Page() {
  const live = await getPage("portfolio");
  return <PortfolioPage live={live} />;
}
