import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { 
  getPageComponent, 
  segmentsToSlug, 
  slugToSegments, 
  getAllStaticSlugs 
} from "@/lib/pageRegistry";
import BlogPostPage, { generateBlogPostMetadata } from "@/components/pages/BlogPostPage";
import { getBlogPosts } from "@/lib/strapi";

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

/**
 * generateStaticParams - generuje wszystkie statyczne ścieżki dla:
 * 1. Statyczne strony z pageRegistry (home, o-nas, kontakt, portfolio, etc.)
 * 2. Dynamiczne blog posty pobrane ze Strapi (blog/[slug])
 * 
 * Next.js wywołuje tę funkcję podczas build time aby wygenerować
 * statyczne HTML dla wszystkich ścieżek.
 */
export async function generateStaticParams() {
  const params: Array<{ slug?: string[] }> = [];

  // 1. STATYCZNE STRONY - wszystkie ze slugami z pageRegistry
  const staticSlugs = getAllStaticSlugs();
  for (const slug of staticSlugs) {
    const segments = slugToSegments(slug);
    // Dla optional catch-all [[...slug]], home musi być undefined lub pusty obiekt
    if (segments.length === 0) {
      params.push({}); // home route: brak parametru slug
    } else {
      params.push({ slug: segments }); // inne: slug jako tablica
    }
  }

  // 2. BLOG POSTY - pobierz wszystkie slugi ze Strapi
  try {
    const blogPostsResponse = await getBlogPosts();
    const blogPosts = blogPostsResponse.data || [];
    
    // Only add blog posts if CMS is available and has data
    if (blogPosts.length > 0) {
      for (const post of blogPosts) {
        params.push({
          slug: ['blog', post.slug], // każdy post jako ['blog', 'slug-posta']
        });
      }
    } else {
      console.log('No blog posts found in CMS - skipping blog post generation');
    }
  } catch (error) {
    console.warn('Warning: Could not fetch blog posts for static generation:', error);
    // Nie przerywamy buildu, tylko logujemy ostrzeżenie
  }

  return params;
}

/**
 * generateMetadata - generuje metadata dla wszystkich stron
 * 1. Blog posty (/blog/[slug]) - dynamiczne metadata z CMS
 * 2. Statyczne strony - metadata z Page Components
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: slugSegments } = await params;
  
  // CASE 1: Blog post metadata
  if (slugSegments?.[0] === 'blog' && slugSegments.length === 2) {
    const postSlug = slugSegments[1];
    return await generateBlogPostMetadata(postSlug);
  }
  
  // CASE 2: Statyczne strony - metadata już jest w page components
  // Next.js automatycznie użyje exported metadata z PageComponent
  return {};
}

/**
 * Main Page Component - router dla wszystkich ścieżek
 * 
 * Obsługuje dwa rodzaje stron:
 * 1. Statyczne strony z pageRegistry (home, o-nas, kontakt, etc.)
 * 2. Dynamiczne blog posty (blog/[slug])
 */
export default async function Page({ params }: PageProps) {
  const { slug: slugSegments } = await params;
  
  // Konwertuj segmenty na string slug
  // [] -> '', ['o-nas'] -> 'o-nas', ['blog', 'moj-post'] -> 'blog/moj-post'
  const fullSlug = segmentsToSlug(slugSegments || []);

  // CASE 1: Blog post - blog/[slug]
  if (slugSegments?.[0] === 'blog' && slugSegments.length === 2) {
    const postSlug = slugSegments[1];
    
    // Renderuj BlogPostPage z przekazaniem slug jako prop
    return <BlogPostPage slug={postSlug} />;
  }

  // CASE 2: Statyczna strona z pageRegistry
  const PageComponent = getPageComponent(fullSlug);
  
  if (PageComponent) {
    return <PageComponent />;
  }

  // CASE 3: Nieznana ścieżka - 404
  notFound();
}
