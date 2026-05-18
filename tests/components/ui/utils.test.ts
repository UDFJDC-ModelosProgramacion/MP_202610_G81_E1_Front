import { describe, it, expect } from 'vitest';
import { cn } from '../../../src/components/ui/utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    const result = cn('class1', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    const result = cn('base', true && 'conditional');
    expect(result).toBe('base conditional');
  });

  it('handles empty values', () => {
    const result = cn('base', '', null, undefined);
    expect(result).toBe('base');
  });

  it('handles array of classes', () => {
    const result = cn(['class1', 'class2']);
    expect(result).toBe('class1 class2');
  });
});
