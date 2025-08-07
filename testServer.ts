import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Utility to create a mock server with dynamic handlers
export const server = setupServer(
  // default empty handler; individual tests add their own overrides
  http.get('*', () => HttpResponse.json({}, { status: 404 })),
);
