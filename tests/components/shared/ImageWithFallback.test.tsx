import { render, screen, fireEvent } from '@testing-library/react';
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
    
    // Simulate error
    fireEvent.error(img);
    
    const fallbackDiv = document.querySelector('.test-class');
    expect(fallbackDiv).toBeInTheDocument();
    const errorImg = screen.getByAltText('Error loading content');
    expect(errorImg).toBeInTheDocument();
  });

  it('renders with default empty className if none provided', () => {
    render(<ImageWithFallback src="invalid.jpg" alt="Test image" />);
    const img = screen.getByAltText('Test image') as HTMLImageElement;
    
    // Simulate error
    fireEvent.error(img);
    
    // The div should still render even without className prop
    const errorImg = screen.getByAltText('Error loading content');
    expect(errorImg).toBeInTheDocument();
    const parentDiv = errorImg.parentElement?.parentElement;
    expect(parentDiv).toHaveClass('inline-block');
  });
});
