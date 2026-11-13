const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * "2026-11-12T15:43:59Z" → "Nov 2026". Parsed by hand (no Date/locale) so the
 * server and the browser always render the same string.
 */
export function formatMonth(iso: string): string {
  const year = iso.slice(0, 4);
  const month = Number(iso.slice(5, 7));
  return `${MONTHS[month - 1]} ${year}`;
}
