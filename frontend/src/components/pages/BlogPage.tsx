import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import { BlogListClient } from "@/components/sections/blog/BlogListClient";
import { getBlogPosts, getFeaturedBlogPosts, getCategories } from "@/lib/strapi";
import type { BlogPost, Category } from "@/types/strapi";

export const metadata: Metadata = {
  title: "Blog - Porady i inspiracje | SkładaMy",
  description: "Praktyczne porady dotyczące montażu mebli, inspiracje aranżacyjne i najnowsze trendy w urządzaniu wnętrz. Eksperci od montażu dzielą się wiedzą.",
  keywords: ["blog montaż mebli", "porady IKEA", "inspiracje wnętrz", "montaż poradnik", "aranżacja mieszkania"],
};

export default async function BlogPage() {
  let allPosts: BlogPost[] = [];
  let featuredPosts: BlogPost[] = [];
  let categories: Category[] = [];

  try {
    const [allPostsResponse, featuredPostsResponse, categoriesResponse] = await Promise.all([
      getBlogPosts({ pageSize: 50 }),
      getFeaturedBlogPosts(6),
      getCategories()
    ]);

    allPosts = allPostsResponse.data || [];
    featuredPosts = featuredPostsResponse.data || [];
    categories = categoriesResponse.data || [];
  } catch (error) {
    console.warn("CMS not available during build - blog will show empty state:", error);
  }

  return (
    <>
      <Header />
      <BlogListClient 
        allPosts={allPosts} 
        featuredPosts={featuredPosts}
        categories={categories}
      />
      <Footer />
      <StickyCTA />
    </>
  );
}
