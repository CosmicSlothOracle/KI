import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { http, HttpResponse } from 'msw';
import { server } from '../../../testServer';
import SignalBox from '../SignalBox';

// Mock crypto.randomUUID
vi.stubGlobal('crypto', {
  randomUUID: () => 'uuid-test'
});

describe('<SignalBox />', () => {
  it('loads counter and increments after click', async () => {
    // Initial signals array empty
    server.use(
      http.get('/signals.json', () => HttpResponse.json([], { status: 200 }))
    );

    render(<SignalBox />);

    // Counter shows 0
    await waitFor(() => {
      expect(screen.getByText(/Bisher gesendete Signale/i)).toHaveTextContent('0');
    });

    // Click send
    const button = screen.getByRole('button', { name: /ich sende mein signal/i });
    await userEvent.click(button);

    // After click, message appears and counter increments
    await waitFor(() => {
      expect(screen.getByText(/Dein Signal wurde gespeichert/)).toBeInTheDocument();
      expect(screen.getByText(/Bisher gesendete Signale/i)).toHaveTextContent('1');
    });
  });
});
