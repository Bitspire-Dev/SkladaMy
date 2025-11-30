import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { getBlogPost, getBlogPosts } from "@/lib/strapi-client";
import { getMediaURL } from "@/lib/axios-client";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const response = await getBlogPost(slug);
    const post = response.data;

    if (!post) {
      return {
        title: "Artykuł nie znaleziony | SkładaMy",
      } satisfies Metadata;
    }

    const description = post.excerpt || post.content?.slice(0, 155);
    const ogImage = post.featuredImage
      ? {
          url: getMediaURL(post.featuredImage),
          alt: post.featuredImage.alternativeText || post.title,
        }
      : undefined;

    return {
      title: `${post.title} | Blog SkładaMy`,
      description,
      openGraph: {
        title: post.title,
        description,
        type: "article",
        url: `/blog/${post.slug}`,
        images: ogImage ? [ogImage] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description,
        images: ogImage?.url ? [ogImage.url] : undefined,
      },
    } satisfies Metadata;
  } catch (error) {
    console.error("Failed to generate metadata for blog post:", error);
    return {
      title: "Blog | SkładaMy",
    } satisfies Metadata;
  }
}

export async function generateStaticParams() {
  // For static export, we MUST return at least one item for dynamic routes
  // Otherwise Next.js will fail the build with output: 'export'
  try {
    const posts = await getBlogPosts({ limit: 100 });
    const slugs = posts.data
      .filter((post) => Boolean(post.slug))
      .map((post) => ({ slug: post.slug }));
    
    // If we got data, return it
    if (slugs.length > 0) {
      console.log(`✓ Pre-generating ${slugs.length} blog post pages`);
      return slugs;
    }
  } catch (error) {
    console.error("CMS not available during build - generating placeholder:", error);
  }

  // CRITICAL: With output: 'export', Next.js requires at least one param
  // Return a placeholder that will 404 gracefully if accessed
  console.warn("⚠ No blog posts available - generating placeholder page");
  return [{ slug: '_placeholder' }];
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  // Fetch post data on the server during build
  let post;
  let relatedPosts;
  
  try {
    const response = await getBlogPost(slug);
    post = response.data;

    // Fetch related posts
    const allPostsResponse = await getBlogPosts({ limit: 20 });
    relatedPosts = allPostsResponse.data
      .filter((p) => p.slug !== slug)
      .slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <BlogPostContent post={post} relatedPosts={relatedPosts} />
      <Footer />
      <StickyCTA />
    </>
  );
}
