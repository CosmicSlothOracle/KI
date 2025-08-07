import { describe, expect, it } from 'vitest';
import { buildSignalLink, detectCountryCode } from '../geo';

describe('geo utils', () => {
  it('buildSignalLink builds a URL with id', () => {
    // simulate window (minimal)
    (globalThis as any).window = { location: { origin: 'https://example.org' } };
    const url = buildSignalLink('abc');
    expect(url).toBe('https://example.org/signal.html?id=abc');
  });

  it('detectCountryCode returns null without geolocation', async () => {
    (globalThis as any).navigator = {};
    const cc = await detectCountryCode();
    expect(cc).toBeNull();
  });

  it('detectCountryCode returns null when geolocation exists but we avoid reverse geocoding', async () => {
    (globalThis as any).navigator = {
      geolocation: {
        getCurrentPosition: (success: any) => success({ coords: { latitude: 0, longitude: 0 } }),
        clearWatch: () => 0,
        watchPosition: () => 0,
      },
    };
    const cc = await detectCountryCode();
    expect(cc).toBeNull();
  });
});

