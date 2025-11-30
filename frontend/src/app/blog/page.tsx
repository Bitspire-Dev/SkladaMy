import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import { BlogListClient } from "@/components/blog/BlogListClient";
import { getBlogPosts, getFeaturedBlogPosts } from "@/lib/strapi-client";
import type { BlogPost } from "@/types/strapi";

export const metadata: Metadata = {
  title: "Blog - Porady i inspiracje | SkładaMy",
  description: "Praktyczne porady dotyczące montażu mebli, inspiracje aranżacyjne i najnowsze trendy w urządzaniu wnętrz. Eksperci od montażu dzielą się wiedzą.",
  keywords: ["blog montaż mebli", "porady IKEA", "inspiracje wnętrz", "montaż poradnik", "aranżacja mieszkania"],
};

export default async function BlogPage() {
  // Fetch data on the server during build
  let allPosts: BlogPost[] = [];
  let featuredPosts: BlogPost[] = [];

  try {
    const allPostsResponse = await getBlogPosts({ limit: 50 });
    const featuredPostsResponse = await getFeaturedBlogPosts(6);

    allPosts = allPostsResponse.data || [];
    featuredPosts = featuredPostsResponse.data || [];
  } catch (error) {
    console.warn("CMS not available during build - blog will show empty state:", error);
  }

  return (
    <>
      <Header />
      <BlogListClient allPosts={allPosts} featuredPosts={featuredPosts} />
      <Footer />
      <StickyCTA />
    </>
  );
}
