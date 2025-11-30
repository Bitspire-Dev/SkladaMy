import { Badge } from "@/components/ui/badge";
import { limitTags } from "@/lib/blog-utils";
import type { BlogTag } from "@/types/strapi";

export const renderTags = (tags?: BlogTag[], limit?: number) => {
  const allTags = limitTags(tags, limit);
  return allTags.map((tag, index) => (
    <Badge key={index} variant="outline" className="text-xs">
      #{tag.name}
    </Badge>
  ));
};
