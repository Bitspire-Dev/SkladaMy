import CmsPage, { generateCmsMetadata } from "@/components/pages/CmsPage";

export const generateMetadata = () => generateCmsMetadata("deklaracja-dostepnosci");

export default function Page() {
  return <CmsPage slug="deklaracja-dostepnosci" mainClassName="bg-neutral-50" />;
}
