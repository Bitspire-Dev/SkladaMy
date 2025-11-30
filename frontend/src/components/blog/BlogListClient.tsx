'use client';

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, User, Search } from "lucide-react";
import { getCategoryColor, formatDate } from "@/lib/blog-utils";
import { renderTags } from "@/lib/blog-render";
import { getMediaURL } from "@/lib/axios-client";
import type { BlogPost, BlogTag } from "@/types/strapi";

interface BlogListClientProps {
  allPosts: BlogPost[];
  featuredPosts: BlogPost[];
}

const renderTagsLocal = (tags: BlogTag[] | undefined, limit: number = 3) => {
  return renderTags(tags, limit);
};

export function BlogListClient({ allPosts, featuredPosts }: BlogListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const regularPosts = useMemo(
    () => allPosts.filter((post) => !post.featured),
    [allPosts]
  );

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allPosts, searchTerm, selectedCategory]);

  const categories = useMemo(() => [
    { key: "all", label: "Wszystkie", count: allPosts.length },
    { key: "poradniki", label: "Poradniki", count: allPosts.filter((p) => p.category === "poradniki").length },
    { key: "inspiracje", label: "Inspiracje", count: allPosts.filter((p) => p.category === "inspiracje").length },
    { key: "trendy", label: "Trendy", count: allPosts.filter((p) => p.category === "trendy").length },
    { key: "narzedzia", label: "Narzędzia", count: allPosts.filter((p) => p.category === "narzedzia").length },
    { key: "bezpieczenstwo", label: "Bezpieczeństwo", count: allPosts.filter((p) => p.category === "bezpieczenstwo").length },
  ], [allPosts]);

  const results = searchTerm ? filteredPosts : regularPosts;

  return (
    <main className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Blog SkładaMy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Praktyczne porady, inspiracje aranżacyjne i wszystko co musisz wiedzieć o montażu mebli.
            Dzielimy się naszym doświadczeniem z ponad 300 realizacji.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Szukaj artykułów..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.label}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Polecane artykuły</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-primary/5 relative">
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
                    <Badge className={`absolute top-4 left-4 ${getCategoryColor(post.category)}`}>
                      {categories.find((c) => c.key === post.category)?.label}
                    </Badge>
                    <Badge variant="secondary" className="absolute top-4 right-4">
                      Polecane
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author || "SkładaMy Team"}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(post.publishedAt)}
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

                    <div className="flex flex-wrap gap-2 mb-4">{renderTagsLocal(post.tags, 3)}</div>

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

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Wszystkie artykuły</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <div className="aspect-[16/9] bg-gradient-to-br from-muted to-muted/50 relative">
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
                  <Badge className={`absolute top-3 left-3 ${getCategoryColor(post.category)}`}>
                    {categories.find((c) => c.key === post.category)?.label}
                  </Badge>
                </div>

                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime || 5} min
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 flex-grow-0">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-1 mb-4">{renderTagsLocal(post.tags, 2)}</div>

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

        {!searchTerm && regularPosts.length >= 9 && (
          <div className="text-center">
            <Button variant="outline" size="lg">
              Załaduj więcej artykułów
            </Button>
          </div>
        )}

        {searchTerm && filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-semibold text-foreground mb-2">Brak wyników wyszukiwania</h3>
            <p className="text-muted-foreground mb-6">
              Nie znaleźliśmy artykułów pasujących do frazy &quot;{searchTerm}&quot;. Spróbuj innych słów kluczowych.
            </p>
            <Button onClick={() => setSearchTerm("")} variant="outline">
              Wyczyść wyszukiwanie
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
