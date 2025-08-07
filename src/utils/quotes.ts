export interface QuoteItem {
  text: string;
  author?: string;
}

export async function fetchQuotes(): Promise<QuoteItem[]> {
  try {
    const res = await fetch('/quotes.json', { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? (data as QuoteItem[]) : [];
  } catch {
    return [];
  }
}

export function pickRandomQuote(quotes: QuoteItem[]): QuoteItem | null {
  if (!quotes.length) return null;
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index] ?? null;
}

