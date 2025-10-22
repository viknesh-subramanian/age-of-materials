/**
 * Calculate the duration between a purchase date and current date
 * Returns years, months, and days
 */
export function calculateDuration(purchaseDate: string): {
  years: number;
  months: number;
  days: number;
} {
  const purchase = new Date(purchaseDate);
  const now = new Date();

  let years = now.getFullYear() - purchase.getFullYear();
  let months = now.getMonth() - purchase.getMonth();
  let days = now.getDate() - purchase.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

/**
 * Format duration as a readable string
 */
export function formatDuration(duration: {
  years: number;
  months: number;
  days: number;
}): string {
  const parts: string[] = [];

  if (duration.years > 0) {
    parts.push(`${duration.years} ${duration.years === 1 ? 'year' : 'years'}`);
  }
  if (duration.months > 0) {
    parts.push(`${duration.months} ${duration.months === 1 ? 'month' : 'months'}`);
  }
  if (duration.days > 0) {
    parts.push(`${duration.days} ${duration.days === 1 ? 'day' : 'days'}`);
  }

  return parts.length > 0 ? parts.join(', ') : '0 days';
}
