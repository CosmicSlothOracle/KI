import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../../testServer';

// Before importing the module, set env to production to test production branch
const ORIGINAL_ENV = { ...process.env };

import type { Signal } from '../netlifyBlob';

// Using dynamic import after env setup to ensure code path
function importModule() {
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

    const { getSignals } = await importModule();
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

    const { addSignal } = await importModule();
    const result = await addSignal(newSignal);
    expect(result).toEqual(updated);
  });

  it('dev fallback returns updated array without network', async () => {
    process.env.NODE_ENV = 'test'; // Not production
    const { addSignal } = await import('../netlifyBlob');
    const s: Signal = { id: '3', quote: 'x', timestamp: 'y' };
    const res = await addSignal(s);
    expect(res).toContain(s);
  });
});
