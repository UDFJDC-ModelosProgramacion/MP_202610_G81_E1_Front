import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/App';

describe('App', () => {
  it('renders the app and shows the Professional Home Page by default', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Find Your/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Perfect Match/i)[0]).toBeInTheDocument();
  });
});
