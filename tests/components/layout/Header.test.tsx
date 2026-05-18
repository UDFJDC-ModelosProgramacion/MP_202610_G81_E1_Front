import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from '../../../src/components/layout/Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
  it('renders header with logo and navigation', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText('PetMatch')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Pets')).toBeInTheDocument();
    expect(screen.getByText('Veterinarians')).toBeInTheDocument();
  });
});
