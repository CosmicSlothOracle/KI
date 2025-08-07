export interface Signal {
  id: string;
  quote: string;
  timestamp: string;
  referrer?: string | null;
  countryCode?: string | null;
}

// Environment detection
// Prefer Vite env in browser builds; fall back to Node env for tests without importing Node types
function detectIsProduction(): boolean {
  // First, honor Node env (used in Vitest/tests)
  const nodeEnv = (globalThis as unknown as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV;
  if (nodeEnv === 'production') {
    return true;
  }

  // Then fall back to Vite's injected env for browser builds
  try {
    const viteEnv = (import.meta as unknown as { env?: { PROD?: boolean } }).env;
    if (viteEnv && typeof viteEnv.PROD === 'boolean') {
      return viteEnv.PROD === true;
    }
  } catch {
    // Ignore if import.meta is not available
  }

  return false;
}

const isProduction = detectIsProduction();
const isNetlify = typeof window !== 'undefined' && window.location.hostname.includes('netlify');

// Use Netlify Blobs in production/Netlify, fallback to public file in development
const BLOB_URL = (isProduction || isNetlify)
  ? '/.netlify/blobs/data/signals.json'
  : '/signals.json';

/**
 * Fetches all signals from Netlify Blob storage or local fallback.
 * Returns an empty array if the blob contains no entries.
 */
export async function getSignals(): Promise<Signal[]> {
  try {
    const res = await fetch(BLOB_URL, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`Failed to fetch signals from ${BLOB_URL}: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data as Signal[] : [];
  } catch (error) {
    console.warn('Error fetching signals, returning empty array:', error);
    return [];
  }
}

/**
 * Adds a new signal object to the blob and returns the updated list.
 * Uses PUT to overwrite the JSON array atomically.
 * In development mode, this only simulates adding (returns updated array but doesn't persist).
 */
export async function addSignal(signal: Signal): Promise<Signal[]> {
  const current = await getSignals();
  const updated = [...current, signal];

  // In development, we can't write to the public folder, so we just simulate
  if (!isProduction && !isNetlify) {
    console.warn('Development mode: Signal added to memory only (not persisted)');
    return updated;
  }

  try {
    const upload = await fetch(BLOB_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updated)
    });

    if (!upload.ok) {
      throw new Error(`Failed to upload signals.json: ${upload.status} ${upload.statusText}`);
    }

    return updated;
  } catch (error) {
    console.error('Error adding signal:', error);
    throw error;
  }
}
