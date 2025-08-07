import '@testing-library/jest-dom';
// import { vi } from 'vitest';

// Polyfill crypto.randomUUID if not present (Node < 19)
if (!('randomUUID' in crypto)) {
  // @ts-ignore
  crypto.randomUUID = () => 'test-uuid';
}

// Reset fetch mocks after each test
import { server } from './testServer';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
