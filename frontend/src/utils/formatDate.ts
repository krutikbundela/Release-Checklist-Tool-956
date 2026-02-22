/**
 * Formats a date string into a human-readable format.
 * Example: "2026-02-22" → "February 22, 2026"
 */
export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}
