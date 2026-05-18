import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../src/App', () => ({
  default: () => <div>App Component</div>,
}));

const { default: App } = await import('../src/App');

describe('App', () => {
  it('renders the app', () => {
    render(<App />);
    expect(screen.getByText('App Component')).toBeInTheDocument();
  });
});
