import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '../../../src/components/layout/Footer';
import { BrowserRouter } from 'react-router-dom';

describe('Footer', () => {
  it('renders footer with copyright text', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByText(/2026 PetMatch/)).toBeInTheDocument();
  });
});
