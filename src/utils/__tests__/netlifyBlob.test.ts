import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../../testServer';

// Before importing the module, set env to production to test production branch
const ORIGINAL_ENV = { ...process.env };

import type { Signal } from '../netlifyBlob';

// Using dynamic import after env setup to ensure code path
async function importFreshModule() {
  vi.resetModules();
  return import('../netlifyBlob');
}

describe('netlifyBlob utility', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('getSignals returns array from server', async () => {
    const mockSignals: Signal[] = [
      { id: '1', quote: 'test', timestamp: '2025-01-01T00:00:00Z' }
    ];

    server.use(
      http.get('/.netlify/blobs/data/signals.json', () =>
        HttpResponse.json(mockSignals, { status: 200 })
      )
    );

    const { getSignals } = await importFreshModule();
    const result = await getSignals();
    expect(result).toEqual(mockSignals);
  });

  it('addSignal uploads and returns updated list', async () => {
    const initial: Signal[] = [];
    const newSignal: Signal = { id: '2', quote: 'q', timestamp: '2025' };
    const updated = [...initial, newSignal];

    server.use(
      http.get('/.netlify/blobs/data/signals.json', () =>
        HttpResponse.json(initial, { status: 200 })
      ),
      http.put('/.netlify/blobs/data/signals.json', async ({ request }) => {
        const body = await request.json() as Signal[];
        return HttpResponse.json(body, { status: 200 });
      })
    );

    const { addSignal } = await importFreshModule();
    const result = await addSignal(newSignal);
    expect(result).toEqual(updated);
  });

  it('dev fallback returns updated array without network', async () => {
    // Set to development mode
    process.env.NODE_ENV = 'development';

    // Mock console.warn to avoid noise in test output
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Setup MSW to handle both GET and PUT for development endpoint
    server.use(
      http.get('/signals.json', () =>
        HttpResponse.json([], { status: 200 })
      ),
      // Mock the PUT request that would normally fail in dev mode
      http.put('/signals.json', () =>
        HttpResponse.json({}, { status: 200 })
      )
    );

    const { addSignal } = await importFreshModule();
    const testSignal: Signal = { id: '3', quote: 'test quote', timestamp: '2025-01-01T12:00:00Z' };

    const result = await addSignal(testSignal);

    expect(result).toContain(testSignal);
    expect(result).toHaveLength(1);
    expect(warnSpy).toHaveBeenCalledWith('Development mode: Signal added to memory only (not persisted)');

    warnSpy.mockRestore();
  });

  it('getSignals works in development mode with local fallback', async () => {
    // Set to development mode
    process.env.NODE_ENV = 'development';

    const mockSignals: Signal[] = [
      { id: 'dev1', quote: 'Development signal', timestamp: '2025-01-01T10:00:00Z' }
    ];

    // Setup MSW to handle the development endpoint (/signals.json)
    server.use(
      http.get('/signals.json', () =>
        HttpResponse.json(mockSignals, { status: 200 })
      )
    );

    const { getSignals } = await importFreshModule();
    const result = await getSignals();

    expect(result).toEqual(mockSignals);
  });

  it('getSignals handles fetch errors gracefully', async () => {
    process.env.NODE_ENV = 'production';

    // Mock console.warn to capture the warning
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Setup MSW to return an error
    server.use(
      http.get('/.netlify/blobs/data/signals.json', () =>
        HttpResponse.json({}, { status: 500 })
      )
    );

    const { getSignals } = await importFreshModule();
    const result = await getSignals();

    expect(result).toEqual([]);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to fetch signals from /.netlify/blobs/data/signals.json: 500')
    );

    warnSpy.mockRestore();
  });
});
