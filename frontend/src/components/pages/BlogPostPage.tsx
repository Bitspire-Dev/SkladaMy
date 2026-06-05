import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import { BlogPostContent } from "@/components/sections/blog/BlogPostContent";
import { getMediaURL } from "@/lib/cms/client";
import { getBlogPost, getBlogPosts } from "@/lib/cms/api";
import { getSiteUrl } from "@/lib/config";

interface BlogPostPageProps {
  slug: string;
}

/* eslint-disable complexity */
export async function generateBlogPostMetadata(slug: string): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  try {
    const response = await getBlogPost(slug);
    const post = response.data;

    if (!post) {
      return {
        title: "Artykuł nie znaleziony | SkładaMy",
      };
    }

    // Use SEO component data if available, fallback to post data
    const { seo } = post;
    const title = seo?.metaTitle || `${post.title} | Blog SkładaMy`;
    const description = seo?.metaDescription || post.excerpt || post.content?.slice(0, 155);
    const keywords = seo?.keywords || undefined;
    const canonicalUrl = seo?.canonicalUrl || `${siteUrl}/blog/${post.slug}`;

    const ogImage =
      seo?.ogImage || post.featuredImage
        ? {
            url: getMediaURL(seo?.ogImage || post.featuredImage),
            alt: (seo?.ogImage || post.featuredImage)?.alternativeText || post.title,
          }
        : undefined;

    return {
      title,
      description,
      keywords: keywords?.split(",").map((k) => k.trim()),
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: seo?.ogTitle || post.title,
        description: seo?.ogDescription || description,
        type: "article",
        url: canonicalUrl,
        images: ogImage ? [ogImage] : undefined,
        publishedTime: post.publishDate,
        modifiedTime: post.lastModified || post.updatedAt,
        authors: [post.author?.name || "SkładaMy"],
        tags: post.tags?.map((t) => t.name),
      },
      twitter: {
        card: seo?.twitterCard || "summary_large_image",
        title: seo?.ogTitle || post.title,
        description: seo?.ogDescription || description,
        images: ogImage?.url ? [ogImage.url] : undefined,
      },
      robots: {
        index: !seo?.noindex,
        follow: !seo?.nofollow,
      },
    };
  } catch (error) {
    console.error("Failed to generate metadata for blog post:", error);
    return {
      title: "Blog | SkładaMy",
    };
  }
}

export default async function BlogPostPage({ slug }: BlogPostPageProps) {
  if (!slug) {
    notFound();
  }

  let post;
  let relatedPosts;

  try {
    const response = await getBlogPost(slug);
    post = response.data;

    // Fetch related posts
    const allPostsResponse = await getBlogPosts({ limit: 20 });
    relatedPosts = allPostsResponse.data.filter((p) => p.slug !== slug).slice(0, 3);
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
