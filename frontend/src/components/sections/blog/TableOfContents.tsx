'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const tocItems = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');

    const items: TOCItem[] = [];
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent || '';
      const id = `heading-${index}`;

      items.push({ id, text, level });
    });

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
        rootMargin: '-80px 0px -80% 0px',
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
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
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
              'w-full text-left text-sm py-2 px-3 rounded-md transition-all',
              'hover:bg-accent hover:text-accent-foreground',
              item.level === 3 && 'pl-6 text-xs',
              activeId === item.id
                ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary'
                : 'text-muted-foreground border-l-2 border-transparent'
            )}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </div>
  );
}
