"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import type { Category } from "@/types/strapi";
import { cn } from "@/lib/styles";

interface BlogSearchProps {
  categories: Category[];
  onSearch: (query: string) => void;
  onCategoryChange: (categorySlug: string | null) => void;
  initialSearch?: string;
  initialCategory?: string;
  totalResults?: number;
}

export default function BlogSearch({
  categories,
  onSearch,
  onCategoryChange,
  initialSearch = "",
  initialCategory,
  totalResults,
}: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Trigger search when debounced query changes
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleCategoryClick = (categorySlug: string) => {
    if (selectedCategory === categorySlug) {
      setSelectedCategory(null);
      onCategoryChange(null);
    } else {
      setSelectedCategory(categorySlug);
      onCategoryChange(categorySlug);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  const clearAll = () => {
    clearSearch();
    setSelectedCategory(null);
    onCategoryChange(null);
  };

  const hasActiveFilters = searchQuery || selectedCategory;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Szukaj artykułów..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-12 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Wyczyść wyszukiwanie"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Kategorie</h3>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Wyczyść filtry
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                "border border-border hover:border-primary/50",
                selectedCategory === category.slug
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background text-foreground hover:bg-accent"
              )}
              style={{
                backgroundColor: selectedCategory === category.slug ? category.color : undefined,
                borderColor: selectedCategory === category.slug ? category.color : undefined,
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      {totalResults !== undefined && (
        <div className="flex items-center justify-between py-2 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {(() => {
              if (totalResults === 0) return "Nie znaleziono artykułów";
              if (totalResults === 1) return "1 artykuł";
              if (totalResults < 5) return `${totalResults} artykuły`;
              return `${totalResults} artykułów`;
            })()}
            {hasActiveFilters && " spełniających kryteria"}
          </p>

          {hasActiveFilters && (
            <div className="flex gap-2 text-xs">
              {searchQuery && (
                <span className="px-2 py-1 bg-accent rounded-md text-foreground">
                  Szukaj: &quot;{searchQuery}&quot;
                </span>
              )}
              {selectedCategory && (
                <span
                  className="px-2 py-1 rounded-md text-white"
                  style={{
                    backgroundColor:
                      categories.find((c) => c.slug === selectedCategory)?.color || "#3b82f6",
                  }}
                >
                  {categories.find((c) => c.slug === selectedCategory)?.name}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
