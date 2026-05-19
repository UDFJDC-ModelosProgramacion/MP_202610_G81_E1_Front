import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../src/components/ui/select';

describe('Select components', () => {
  it('renders correctly', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option</SelectItem>
        </SelectContent>
      </Select>
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
  });
});
