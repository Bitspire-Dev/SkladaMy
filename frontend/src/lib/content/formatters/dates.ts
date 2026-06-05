/**
 * Format date in Polish locale (e.g. "15 grudnia 2024")
 */
export const formatDate = (dateString?: string): string => {
  if (!dateString) return "Brak daty";
  const date = new Date(dateString);
  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
