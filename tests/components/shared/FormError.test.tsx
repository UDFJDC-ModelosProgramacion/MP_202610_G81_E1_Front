import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormError } from '../../../src/components/shared/FormError';

describe('FormError', () => {
  it('renders error message', () => {
    render(<FormError message="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders with alert icon', () => {
    render(<FormError message="Error message" />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
