export function trim(string: string, maxLen: number): string {
  if (string.length <= maxLen) return string;

  return string.slice(0, String(string + " ").lastIndexOf(" ", maxLen)) + "...";
}
