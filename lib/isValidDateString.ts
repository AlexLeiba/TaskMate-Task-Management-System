export function isValidDateString(dateString: string): boolean {
  if (!dateString) return false;
  const isoUtcRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  if (!isoUtcRegex.test(dateString)) return false;

  const date = new Date(dateString);

  // Check if invalid date
  if (isNaN(date.getTime())) return false;

  // Ensure no auto-correction occurred
  return date.toISOString() === dateString;
}
