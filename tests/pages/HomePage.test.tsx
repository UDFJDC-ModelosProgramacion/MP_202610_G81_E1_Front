import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HomePage } from '../../src/pages/HomePage';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as any),
    useNavigate: () => mockNavigate,
  };
});

describe('HomePage', () => {
  it('renders hero section with title', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { name: /Find Your/i })).toBeInTheDocument();
    // Using getAllByText because "Perfect Match" appears in heading and possibly in hidden/decorative meta text
    expect(screen.getAllByText(/Perfect Match/i)[0]).toBeInTheDocument();
  });

  it('renders call to action buttons', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Browse Available Pets/i)).toBeInTheDocument();
    expect(screen.getByText(/View HU Modules/i)).toBeInTheDocument();
  });

  it('navigates to pets page on CTA click', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const browseButton = screen.getByText(/Browse Available Pets/i);
    fireEvent.click(browseButton);
    expect(mockNavigate).toHaveBeenCalledWith('/pets');
  });

  it('navigates to test page on second CTA click', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const devButton = screen.getByText(/View HU Modules/i);
    fireEvent.click(devButton);
    expect(mockNavigate).toHaveBeenCalledWith('/test');
  });

  it('renders featured pets', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByText('Luna')).toBeInTheDocument();
    expect(screen.getByText('Rocky')).toBeInTheDocument();
  });
});
