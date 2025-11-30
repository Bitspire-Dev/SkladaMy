'use client';

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  User, 
  Share2, 
  Eye,
  BookOpen,
  ChevronRight,
  Home
} from "lucide-react";
import Link from "next/link";
import { getCategoryColor, formatDate } from "@/lib/blog-utils";
import { renderTags } from "@/lib/blog-render";
import { getMediaURL } from "@/lib/axios-client";
import type { BlogPost } from "@/types/strapi";

interface BlogPostContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

// Funkcja do renderowania markdown-like content
const renderContent = (content: string) => {
  const lines = content.split('\n');
  const elements: React.ReactElement[] = [];
  
  const parseInlineText = (text: string) => {
    const parts: (string | React.ReactElement)[] = [];
    let currentIndex = 0;
    
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    const boldMatches: Array<{start: number, end: number, content: string}> = [];
    
    while ((match = boldRegex.exec(text)) !== null) {
      boldMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        content: match[1]
      });
    }
    
    boldMatches.sort((a, b) => a.start - b.start);
    
    boldMatches.forEach((boldMatch, index) => {
      if (boldMatch.start > currentIndex) {
        const beforeText = text.slice(currentIndex, boldMatch.start);
        if (beforeText) parts.push(beforeText);
      }
      
      parts.push(
        <strong key={`bold-${index}`} className="font-semibold">
          {boldMatch.content}
        </strong>
      );
      
      currentIndex = boldMatch.end;
    });
    
    if (currentIndex < text.length) {
      parts.push(text.slice(currentIndex));
    }
    
    if (boldMatches.length === 0) {
      return text;
    }
    
    return parts;
  };
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('# ')) {
      elements.push(<h1 key={index} className="text-3xl font-bold text-foreground mb-6 mt-8">{parseInlineText(trimmed.slice(2))}</h1>);
    } else if (trimmed.startsWith('## ')) {
      elements.push(<h2 key={index} className="text-2xl font-semibold text-foreground mb-4 mt-6">{parseInlineText(trimmed.slice(3))}</h2>);
    } else if (trimmed.startsWith('### ')) {
      elements.push(<h3 key={index} className="text-xl font-semibold text-foreground mb-3 mt-5">{parseInlineText(trimmed.slice(4))}</h3>);
    } else if (trimmed.startsWith('#### ')) {
      elements.push(<h4 key={index} className="text-lg font-semibold text-foreground mb-2 mt-4">{parseInlineText(trimmed.slice(5))}</h4>);
    } else if (trimmed.startsWith('- ')) {
      elements.push(<li key={index} className="text-muted-foreground mb-1 ml-4">{parseInlineText(trimmed.slice(2))}</li>);
    } else if (trimmed.startsWith('1. ') || trimmed.match(/^\d+\. /)) {
      const match = trimmed.match(/^\d+\. (.+)/);
      if (match) {
        elements.push(<li key={index} className="text-muted-foreground mb-1 ml-4 list-decimal">{parseInlineText(match[1])}</li>);
      }
    } else if (trimmed === '') {
      elements.push(<br key={index} />);
    } else if (trimmed.length > 0) {
      elements.push(<p key={index} className="text-muted-foreground mb-3 leading-relaxed">{parseInlineText(trimmed)}</p>);
    }
  });
  
  return elements;
};

export function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  return (
    <main className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{post.title}</span>
        </nav>

        {/* Back button */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Powrót do bloga
            </Link>
          </Button>
        </div>

        {/* Article header */}
        <article className="mb-16">
          <header className="mb-8">
            {/* Category badge */}
            <Badge className={`mb-4 ${getCategoryColor(post.category ?? 'ogolne')}`}>
              {post.category ? post.category.charAt(0).toUpperCase() + post.category.slice(1) : 'Ogólne'}
            </Badge>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author || "SkładaMy Team"}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime || 5} min czytania
              </div>
              {post.views !== undefined && (
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  {post.views} wyświetleń
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {renderTags(post.tags)}
              </div>
            )}

            {/* Share button */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShareMenuOpen(!shareMenuOpen)}
                className="relative"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Udostępnij
              </Button>
              
              {shareMenuOpen && (
                <div className="absolute top-full left-0 mt-2 bg-background border rounded-lg shadow-lg p-2 z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        navigator.clipboard.writeText(window.location.href);
                      }
                      setShareMenuOpen(false);
                    }}
                  >
                    Skopiuj link
                  </Button>
                </div>
              )}
            </div>
          </header>

          {/* Featured image */}
          {post.featuredImage && (
            <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-8 relative overflow-hidden">
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
          <div className="prose prose-lg max-w-none">
            <div className="text-base leading-relaxed">
              {renderContent(post.content)}
            </div>
          </div>
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t pt-12">
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center">
              <BookOpen className="h-6 w-6 mr-2" />
              Powiązane artykuły
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: BlogPost) => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/9] bg-gradient-to-br from-muted to-muted/50 relative">
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
                    <Badge className={`absolute top-3 left-3 ${getCategoryColor(relatedPost.category ?? 'ogolne')}`}>
                      {relatedPost.category || 'Ogólne'}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>{formatDate(relatedPost.publishedAt)}</span>
                      <span>{relatedPost.readTime || 5} min</span>
                    </div>
                    
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        Czytaj więcej
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Potrzebujesz pomocy z montażem?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Nasz zespół ma doświadczenie w montażu wszystkich rodzajów mebli IKEA. 
            Skontaktuj się z nami dla bezpłatnej wyceny.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/kontakt">
                Bezpłatna wycena
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">
                Zobacz nasze realizacje
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
