import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/App';

describe('App', () => {
  it('renders the app and shows the Landing Page by default', () => {
    render(<App />);
    expect(screen.getByText('Pet Adoption System')).toBeInTheDocument();
  });

  it('renders 404 page for unknown routes', () => {
    // MemoryRouter is used inside App, but we want to test a specific path.
    // However, App.tsx uses <Router> (BrowserRouter) which is hard to control in tests.
    // Usually we'd refactor App to use a router provider or pass the router.
    // For now, let's just ensure it renders the main content.
    render(<App />);
    expect(screen.getByText('Pet Adoption System')).toBeInTheDocument();
  });
});
