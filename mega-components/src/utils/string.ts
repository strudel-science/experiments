/**
 * Converts a snake_case string into Title Case.
 * Example: 'sample_collection_date' -> 'Sample Collection Date'
 *
 * @param str - The snake_case string to format
 * @returns The formatted Title Case string
 */
export function snakeToTitleCase(str: string): string {
  if (!str) return "";
  return str
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Converts camelCase, kebab-case, or snake_case string to Title Case.
 * Example: 'firstName' -> 'First Name', 'target-temp' -> 'Target Temp'
 *
 * @param str - The input string
 * @returns The formatted Title Case string
 */
export function toTitleCase(str: string): string {
  if (!str) return "";
  // Replace underscores and hyphens with space, and insert space before uppercase letters
  const spaced = str
    .replace(/[-_]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .trim();

  return spaced
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Truncates a string to a specified max length and appends an ellipsis.
 *
 * @param str - The string to truncate
 * @param maxLength - The maximum allowed length
 * @returns The truncated string
 */
export function truncateString(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str;
  return `${str.slice(0, Math.max(0, maxLength - 3))}...`;
}
