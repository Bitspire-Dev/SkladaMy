"use client";

import { Badge } from "@/components/ui/Badge";
import type { BlogTag, Tag } from "@/types/strapi";

type TagLike = Pick<BlogTag, "name"> | Pick<Tag, "name">;

interface TagBadgesProps {
  tags?: TagLike[];
  limit?: number;
  className?: string;
}

export default function TagBadges({ tags, limit, className }: TagBadgesProps) {
  if (!tags || tags.length === 0) return null;

  const visible = typeof limit === "number" ? tags.slice(0, limit) : tags;

  return (
    <div className={className}>
      {visible.map((tag, index) => (
        <Badge key={`${tag.name}-${index}`} variant="outline" className="text-xs">
          #{tag.name}
        </Badge>
      ))}
    </div>
  );
}
