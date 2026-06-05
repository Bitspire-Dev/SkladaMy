"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Calendar,
  Clock,
  ArrowLeft,
  User,
  Eye,
  BookOpen,
  ChevronRight,
  Home,
  Tag as TagIcon,
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/content/formatters/dates";
import { processBlogContent } from "@/lib/content/processors/html";
import { getMediaURL } from "@/lib/cms/client";
import AuthorCard from "@/components/sections/blog/AuthorCard";
import ShareButtons from "@/components/sections/blog/ShareButtons";
import TableOfContents from "@/components/sections/blog/TableOfContents";
import TagBadges from "@/components/sections/blog/TagBadges";
import type { BlogPost } from "@/types/strapi";
import { usePathname } from "next/navigation";
import { getCurrentUrl } from "@/lib/config";

interface BlogPostContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

/* eslint-disable max-lines-per-function, complexity */
export function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const pathname = usePathname();
  const fullUrl = getCurrentUrl(pathname || `/blog/${post.slug}`);
  const processedContent = processBlogContent(post.content);

  return (
    <main className="py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground truncate max-w-50">{post.title}</span>
        </nav>

        {/* Back button */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Powrót do bloga
            </Link>
          </Button>
        </div>

        {/* Main content with sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Article content */}
          <article>
            <header className="mb-8">
              {/* Category badge */}
              {post.category && (
                <Badge
                  className="mb-4 border-0 text-white"
                  style={{ backgroundColor: post.category.color }}
                >
                  {post.category.name}
                </Badge>
              )}

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg lg:text-xl text-muted-foreground mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {post.author?.name || "SkładaMy Team"}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(post.publishDate || post.publishedAt)}
                </div>
                {post.lastModified && (
                  <div className="flex items-center text-xs">
                    Aktualizacja: {formatDate(post.lastModified)}
                  </div>
                )}
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {post.readTime || 5} min
                </div>
                {post.views !== undefined && (
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    {post.views}
                  </div>
                )}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <TagIcon className="h-4 w-4 text-muted-foreground" />
                  <TagBadges tags={post.tags} className="flex flex-wrap gap-2" />
                </div>
              )}
            </header>

            {/* Featured image */}
            {post.featuredImage && (
              <div className="aspect-video bg-linear-to-br from-primary/20 to-primary/5 rounded-lg mb-8 relative overflow-hidden">
                <Image
                  src={getMediaURL(post.featuredImage)}
                  alt={post.featuredImage.alternativeText || post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority
                />
              </div>
            )}

            {/* Article content */}
            <div
              className="prose prose-base lg:prose-lg max-w-none 
                prose-headings:font-semibold prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 
                prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-li:text-muted-foreground prose-li:leading-relaxed
                prose-strong:text-foreground prose-strong:font-semibold
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* Related posts */}
            {(relatedPosts?.length > 0 || (post.relatedPosts && post.relatedPosts.length > 0)) && (
              <section className="border-t mt-12 pt-12">
                <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center">
                  <BookOpen className="h-6 w-6 mr-2" />
                  Powiązane artykuły
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(post.relatedPosts || relatedPosts).slice(0, 3).map((relatedPost: BlogPost) => (
                    <Card
                      key={relatedPost.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                    >
                      <div className="aspect-video bg-linear-to-br from-muted to-muted/50 relative">
                        {relatedPost.featuredImage ? (
                          <Image
                            src={getMediaURL(relatedPost.featuredImage)}
                            alt={relatedPost.featuredImage.alternativeText || relatedPost.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">Zdjęcie artykułu</span>
                          </div>
                        )}
                        {relatedPost.category && (
                          <Badge
                            className="absolute top-3 left-3 border-0 text-white"
                            style={{ backgroundColor: relatedPost.category.color }}
                          >
                            {relatedPost.category.name}
                          </Badge>
                        )}
                      </div>

                      <CardContent className="p-4 flex flex-col grow">
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 grow">
                          {relatedPost.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <span>
                            {formatDate(relatedPost.publishDate || relatedPost.publishedAt)}
                          </span>
                          <span>{relatedPost.readTime || 5} min</span>
                        </div>

                        <Button asChild variant="outline" size="sm" className="w-full mt-auto">
                          <Link href={`/blog/${relatedPost.slug}`}>Czytaj więcej</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* CTA Section */}
            <section className="bg-linear-to-r from-primary/10 to-primary/5 rounded-lg p-6 lg:p-8 mt-12 text-center">
              <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
                Potrzebujesz pomocy z montażem?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Nasz zespół ma doświadczenie w montażu wszystkich rodzajów mebli IKEA. Skontaktuj
                się z nami dla bezpłatnej wyceny.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/kontakt">Bezpłatna wycena</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/portfolio">Zobacz nasze realizacje</Link>
                </Button>
              </div>
            </section>
          </article>

          {/* Sidebar - sticky on desktop */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Author Card */}
            {post.author && <AuthorCard author={post.author} />}

            {/* Share Buttons */}
            <ShareButtons url={fullUrl} title={post.title} description={post.excerpt} />

            {/* Table of Contents */}
            <TableOfContents content={post.content} />
          </aside>
        </div>
      </div>
    </main>
  );
}
