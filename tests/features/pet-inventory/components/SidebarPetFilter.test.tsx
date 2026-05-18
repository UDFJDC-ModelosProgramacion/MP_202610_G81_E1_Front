import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Sidebar as SidebarPetFilter } from '../../../../src/features/pet-inventory/components/SidebarPetFilter';

describe('SidebarPetFilter', () => {
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('renders filter sidebar', () => {
    render(<SidebarPetFilter onFilterChange={mockOnFilterChange} />);
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Species')).toBeInTheDocument();
    expect(screen.getByText('Size')).toBeInTheDocument();
  });

  it('calls onFilterChange when species filter changes', () => {
    render(<SidebarPetFilter onFilterChange={mockOnFilterChange} />);
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'DOG' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({ species: 'DOG' });
  });

  it('calls onFilterChange when size filter changes', () => {
    render(<SidebarPetFilter onFilterChange={mockOnFilterChange} />);
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[1], { target: { value: 'LARGE' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({ size: 'LARGE' });
  });
});
