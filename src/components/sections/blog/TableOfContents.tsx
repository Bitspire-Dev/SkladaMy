"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/styles";
import { processBlogContent } from "@/lib/content/processors/html";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Build TOC from the SAME processed output that BlogPostContent renders,
  // so the IDs we scroll to match the IDs in the DOM. processBlogContent
  // preserves existing CMS IDs and only generates new ones for headings
  // without an id.
  const tocItems = useMemo(() => {
    const processed = processBlogContent(content);
    const items: TOCItem[] = [];
    // Match h2/h3 with optional attributes (including id).
    const headingRegex = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi;
    let match: RegExpExecArray | null;

    while ((match = headingRegex.exec(processed)) !== null) {
      const level = Number.parseInt(match[1], 10);
      const attrs = match[2] || "";
      const text = match[3].replace(/<[^>]*>/g, "").trim();

      if (!text) {
        continue;
      }

      // Extract the id attribute that processBlogContent assigned (or that
      // the CMS already had). Fall back to a slugified text if missing.
      const idMatch = attrs.match(/\sid\s*=\s*["']([^"']*)["']/i);
      const id = idMatch
        ? idMatch[1]
        : text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

      items.push({ id, text, level });
    }

    return items;
  }, [content]);

  // Setup intersection observer for scroll spy
  useEffect(() => {
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 1,
      }
    );

    // Observe all heading elements
    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveId(id);
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4 sticky top-24">
      <div className="flex items-center gap-2">
        <List className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Spis treści</h3>
      </div>

      <nav className="space-y-1">
        {tocItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={cn(
              "w-full text-left text-sm py-2 px-3 rounded-md transition-all",
              "hover:bg-accent hover:text-accent-foreground",
              item.level === 3 && "pl-6 text-xs",
              activeId === item.id
                ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                : "text-muted-foreground border-l-2 border-transparent"
            )}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </div>
  );
}
