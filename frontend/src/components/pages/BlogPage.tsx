import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import { BlogListClient } from "@/components/sections/blog/BlogListClient";
import PageContent from "@/components/pages/PageContent";
import { getBlogPosts, getFeaturedBlogPosts, getCategories } from "@/lib/cms/api";
import type { PageQueryResult } from "@/lib/cms/pages";
import type { BlogPost, Category } from "@/types/cms";

export default async function BlogPage({ live }: { live?: PageQueryResult | null }) {
  let allPosts: BlogPost[] = [];
  let featuredPosts: BlogPost[] = [];
  let categories: Category[] = [];

  try {
    const [allPostsResponse, featuredPostsResponse, categoriesResponse] = await Promise.all([
      getBlogPosts({ pageSize: 50 }),
      getFeaturedBlogPosts(6),
      getCategories(),
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
      {live?.data.page ? (
        <PageContent data={live.data} query={live.query} variables={live.variables} lazyFrom={1} />
      ) : null}
      <BlogListClient allPosts={allPosts} featuredPosts={featuredPosts} categories={categories} />
      <Footer />
      <StickyCTA />
    </>
  );
}
