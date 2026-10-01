import { GalleryContent } from "@/components/sections/portfolio/GalleryContent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageContent from "@/components/pages/PageContent";
import { getGallery } from "@/lib/cms/api";
import type { PageQueryResult } from "@/lib/cms/pages";
import type { CmsImage } from "@/types/cms";

export default async function PortfolioPage({ live }: { live?: PageQueryResult | null }) {
  // Fetch gallery data on the server during build
  let images: CmsImage[] = [];
  let featuredImages: CmsImage[] | undefined = undefined;

  try {
    const galleryResponse = await getGallery();
    const {
      data: { images: fetchedImages, featuredImages: fetchedFeatured },
    } = galleryResponse;
    images = fetchedImages || [];
    featuredImages = fetchedFeatured;
  } catch (error) {
    console.warn("CMS not available during build - portfolio will show empty state:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      {/* Hero Section — content comes from the Tina `page` document */}
      {live?.data.page ? (
        <PageContent data={live.data} query={live.query} variables={live.variables} lazyFrom={1} />
      ) : null}

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <GalleryContent
            images={images}
            featuredImages={featuredImages}
            className="max-w-7xl mx-auto"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}
