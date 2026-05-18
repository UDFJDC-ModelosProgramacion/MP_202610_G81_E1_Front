import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '../../../src/components/layout/Footer';

describe('Footer', () => {
  it('renders footer with copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/2026 PetMatch/)).toBeInTheDocument();
  });
});
