interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Create BreadcrumbList structured data
 */
export const createBreadcrumbStructuredData = (items: BreadcrumbItem[]) => ({
  "@type": "BreadcrumbList" as const,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem" as const,
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
