import { describe, expect, it } from 'vitest';
import { aggregateByCountry, mergeCountsWithCentroids } from '../map';

describe('map utils', () => {
  it('aggregateByCountry counts by code with fallback', () => {
    const signals = [
      { id: '1', quote: 'a', timestamp: 't', countryCode: 'DE' },
      { id: '2', quote: 'b', timestamp: 't', countryCode: 'DE' },
      { id: '3', quote: 'c', timestamp: 't', countryCode: 'FR' },
      { id: '4', quote: 'd', timestamp: 't' },
    ];
    const counts = aggregateByCountry(signals as any);
    expect(counts.get('DE')).toBe(2);
    expect(counts.get('FR')).toBe(1);
    expect(counts.get('—')).toBe(1);
  });

  it('mergeCountsWithCentroids returns only points with coordinates', () => {
    const counts = new Map<string, number>([
      ['DE', 2],
      ['—', 3],
      ['XX', 1],
    ]);
    const centroids = { DE: { lat: 51, lng: 10 } } as any;
    const points = mergeCountsWithCentroids(counts, centroids);
    expect(points).toHaveLength(1);
    expect(points[0]).toMatchObject({ code: 'DE', count: 2, lat: 51, lng: 10 });
  });
});

