import { describe, expect, it, vi, beforeEach } from 'vitest';
import { fetchQuotes, pickRandomQuote } from '../quotes';

describe('quotes utils', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchQuotes returns empty on fetch error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('fail'));
    const result = await fetchQuotes();
    expect(result).toEqual([]);
  });

  it('fetchQuotes returns array on success', async () => {
    const payload = [{ text: 'a' }];
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => payload,
    } as Response);
    const result = await fetchQuotes();
    expect(result).toEqual(payload);
  });

  it('pickRandomQuote returns null for empty list', () => {
    expect(pickRandomQuote([])).toBeNull();
  });

  it('pickRandomQuote returns an item from list', () => {
    const arr = [{ text: 'x' }, { text: 'y' }];
    const q = pickRandomQuote(arr);
    expect(q && arr.map(a => a.text)).toContain(q?.text);
  });
});

