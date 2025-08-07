import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';

vi.mock('../QuizSlide', () => ({
  __esModule: true,
  default: ({ onFinish }: { onFinish?: () => void }) => (
    <button onClick={() => onFinish && onFinish()}>finish-quiz</button>
  ),
}));

vi.mock('../SignalBox', () => ({
  __esModule: true,
  default: () => (<div>signal-box</div>),
}));

describe('App flow', () => {
  it('renders SignalBox after quiz finish', async () => {
    render(<App />);
    expect(screen.queryByText('signal-box')).not.toBeInTheDocument();
    await screen.findByRole('button', { name: 'finish-quiz' }).then(btn => btn.click());
    expect(await screen.findByText('signal-box')).toBeInTheDocument();
  });
});

