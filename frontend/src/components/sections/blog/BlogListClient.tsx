'use client';

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { formatDate, renderTags } from "@/lib/blog-helpers";
import { getMediaURL } from "@/lib/strapi";
import BlogSearch from "@/components/sections/blog/BlogSearch";
import type { BlogPost, Category } from "@/types/strapi";

interface BlogListClientProps {
  allPosts: BlogPost[];
  featuredPosts: BlogPost[];
  categories: Category[];
}

export function BlogListClient({ allPosts, featuredPosts, categories }: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      // Search filter
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter  
      const matchesCategory = !selectedCategory || 
        post.category?.slug === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allPosts, searchQuery, selectedCategory]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategoryChange = useCallback((categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
  }, []);

  return (
    <main className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Blog SkładaMy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Praktyczne porady, inspiracje aranżacyjne i wszystko co musisz wiedzieć o montażu mebli.
            Dzielimy się naszym doświadczeniem z ponad 300 realizacji.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <BlogSearch
            categories={categories}
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            initialSearch={searchQuery}
            initialCategory={selectedCategory || undefined}
            totalResults={filteredPosts.length}
          />
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && !searchQuery && !selectedCategory && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Polecane artykuły</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-linear-to-br from-primary/20 to-primary/5 relative">
                    {post.featuredImage ? (
                      <Image
                        src={getMediaURL(post.featuredImage)}
                        alt={post.featuredImage.alternativeText || post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">Zdjęcie artykułu</span>
                      </div>
                    )}
                    {post.category && (
                      <Badge 
                        className="absolute top-4 left-4 border-0 text-white font-semibold" 
                        style={{ 
                          backgroundColor: post.category.color,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
                        }}
                      >
                        {post.category.name}
                      </Badge>
                    )}
                    <Badge className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 border-0 font-medium shadow-md">
                      Polecane
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 flex-wrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author?.name || "SkładaMy Team"}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(post.publishDate || post.publishedAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime || 5} min
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-4">{renderTags(post.tags, 3)}</div>

                    <Button asChild className="w-full">
                      <Link href={`/blog/${post.slug}`}>
                        Czytaj więcej
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            {searchQuery || selectedCategory ? 'Wyniki wyszukiwania' : 'Wszystkie artykuły'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <div className="aspect-video bg-linear-to-br from-muted to-muted/50 relative">
                  {post.featuredImage ? (
                    <Image
                      src={getMediaURL(post.featuredImage)}
                      alt={post.featuredImage.alternativeText || post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Zdjęcie artykułu</span>
                    </div>
                  )}
                  {post.category && (
                    <Badge 
                      className="absolute top-3 left-3 border-0 text-white font-semibold" 
                      style={{ 
                        backgroundColor: post.category.color,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
                      }}
                    >
                      {post.category.name}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-6 flex flex-col grow">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 flex-wrap">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(post.publishDate || post.publishedAt)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime || 5} min
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 grow">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">{renderTags(post.tags, 2)}</div>

                  <Button asChild variant="outline" size="sm" className="w-full mt-auto">
                    <Link href={`/blog/${post.slug}`}>
                      Czytaj więcej
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-semibold text-foreground mb-2">Brak wyników</h3>
            <p className="text-muted-foreground mb-6">
              Nie znaleźliśmy artykułów spełniających wybrane kryteria.
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }} 
              variant="outline"
            >
              Wyczyść filtry
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
