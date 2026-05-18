import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ImageWithFallback } from '../../../src/components/shared/ImageWithFallback';

describe('ImageWithFallback', () => {
  it('renders image with correct src and alt', () => {
    render(<ImageWithFallback src="test.jpg" alt="Test image" />);
    const img = screen.getByAltText('Test image') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('test.jpg');
  });

  it('shows fallback on error', () => {
    render(<ImageWithFallback src="invalid.jpg" alt="Test image" className="test-class" />);
    const img = screen.getByAltText('Test image') as HTMLImageElement;
    img.onerror?.(new Event('error'));
    
    const fallbackDiv = document.querySelector('.test-class');
    expect(fallbackDiv).toBeInTheDocument();
  });
});
