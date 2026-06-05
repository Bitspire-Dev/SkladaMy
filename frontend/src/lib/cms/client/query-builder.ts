/**
 * Build query string from params object
 * Handles arrays as repeated keys with [] suffix
 */
export const buildQueryString = (
  params?: Record<string, string | number | boolean | string[] | null | undefined>
): string => {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(`${key}[]`, item.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};
