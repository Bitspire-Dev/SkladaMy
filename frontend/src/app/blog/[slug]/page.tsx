import type { Metadata } from 'next';
import BlogPostPage, { generateBlogPostMetadata } from '@/components/pages/BlogPostPage';
import { getBlogPosts } from '@/lib/strapi.server';


interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const blogPostsResponse = await getBlogPosts({ pageSize: 100 });
    const blogPosts = blogPostsResponse.data || [];

    return blogPosts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.warn('Warning: Could not fetch blog posts for static generation:', error);
    return [] as Array<{ slug: string }>;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return generateBlogPostMetadata(slug);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} />;
}
