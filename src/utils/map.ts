import type { Signal } from './netlifyBlob';

export interface CountryCentroids {
  [iso2: string]: { lat: number; lng: number };
}

export function aggregateByCountry(signals: Signal[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const s of signals) {
    const code = s.countryCode || '—';
    counts.set(code, (counts.get(code) || 0) + 1);
  }
  return counts;
}

export function mergeCountsWithCentroids(
  counts: Map<string, number>,
  centroids: CountryCentroids
) {
  const points: Array<{ code: string; count: number; lat: number; lng: number }> = [];
  for (const [code, count] of counts.entries()) {
    const c = centroids[code];
    if (!c || code === '—') continue;
    points.push({ code, count, lat: c.lat, lng: c.lng });
  }
  return points;
}

