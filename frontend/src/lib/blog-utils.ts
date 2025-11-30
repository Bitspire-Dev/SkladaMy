import type { BlogTag } from "@/types/strapi";

export const getCategoryColor = (category?: string) => {
  if (!category) return "bg-gray-100 text-gray-800";
  
  const colors = {
    poradniki: "bg-blue-100 text-blue-800",
    inspiracje: "bg-purple-100 text-purple-800",
    trendy: "bg-pink-100 text-pink-800", 
    narzedzia: "bg-green-100 text-green-800",
    bezpieczenstwo: "bg-red-100 text-red-800",
    "ikea-tips": "bg-yellow-100 text-yellow-800",
    cennik: "bg-indigo-100 text-indigo-800"
  };
  return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

export const formatDate = (dateString?: string) => {
  if (!dateString) return "Brak daty";
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const limitTags = (tags?: BlogTag[], limit?: number) => {
  if (!tags || !Array.isArray(tags)) return [];
  return limit ? tags.slice(0, limit) : tags;
};
