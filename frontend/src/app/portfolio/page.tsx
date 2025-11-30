import { Metadata } from 'next';
import { GalleryContent } from '@/components/GalleryContent';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getGallery } from '@/lib/strapi-client';
import type { StrapiImage } from '@/types/strapi';

export const metadata: Metadata = {
  title: 'Portfolio Montażu Mebli IKEA Słupsk | SkładaMy - 300+ Realizacji',
  description: '⭐ Galeria zdjęć montażu mebli IKEA w Słupsku ✓ Szafy PAX ✓ Kuchnie KNOXHULT ✓ 300+ zadowolonych klientów ✓ Zobacz nasze realizacje przed i po',
  keywords: [
    'portfolio montaż mebli Słupsk',
    'galeria montaż IKEA Słupsk',
    'zdjęcia szafy PAX Słupsk',
    'realizacje montaż kuchni',
    'przed i po montaż mebli',
    'portfolio monterzy Słupsk'
  ],
  alternates: {
    canonical: 'https://skladamy.pl/portfolio'
  },
  openGraph: {
    title: 'Portfolio Montażu Mebli IKEA Słupsk | 300+ Realizacji',
    description: '⭐ Zobacz nasze realizacje montażu mebli IKEA w Słupsku ✓ 300+ zadowolonych klientów ✓ Szafy PAX ✓ Kuchnie',
    url: 'https://skladamy.pl/portfolio',
    siteName: 'SkładaMy',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Montażu Mebli IKEA Słupsk | 300+ Realizacji',
    description: '⭐ Zobacz nasze realizacje montażu mebli IKEA w Słupsku ✓ 300+ zadowolonych klientów',
  },
};

export default async function PortfolioPage() {
  // Fetch gallery data on the server during build
  let images: StrapiImage[] = [];
  let featuredImages: StrapiImage[] | undefined = undefined;

  try {
    const galleryResponse = await getGallery();
    images = galleryResponse.data.images || [];
    featuredImages = galleryResponse.data.featuredImages;
  } catch (error) {
    console.warn("CMS not available during build - portfolio will show empty state:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      {/* Hero Section */}
      <section className="bg-white py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Portfolio Montażu Mebli IKEA Słupsk
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              ⭐ <strong>300+ zrealizowanych projektów</strong> - Zobacz nasze najlepsze realizacje montażu mebli IKEA w Słupsku. 
              Szafy PAX, kuchnie KNOXHULT, garderoby i więcej.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
              <span>✓ Szafy PAX</span>
              <span>✓ Kuchnie IKEA</span>
              <span>✓ Garderoby</span>
              <span>✓ Regały BILLY</span>
            </div>
          </div>
        </div>
      </section>

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
