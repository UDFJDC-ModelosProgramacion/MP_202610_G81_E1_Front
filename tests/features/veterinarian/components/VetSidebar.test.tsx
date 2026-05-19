import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VetSidebar } from '../../../../src/features/veterinarian/components/VetSidebar';

describe('VetSidebar', () => {
  const mockOnSpecialtyChange = vi.fn();

  beforeEach(() => {
    mockOnSpecialtyChange.mockClear();
  });

  it('renders sidebar title', () => {
    render(<VetSidebar selectedSpecialty="all" onSpecialtyChange={mockOnSpecialtyChange} />);
    expect(screen.getByText('Specialties')).toBeInTheDocument();
  });

  it('renders all specialty options', () => {
    render(<VetSidebar selectedSpecialty="all" onSpecialtyChange={mockOnSpecialtyChange} />);
    expect(screen.getByText('All Specialties')).toBeInTheDocument();
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.getByText('Dermatology')).toBeInTheDocument();
    expect(screen.getByText('Pediatrics')).toBeInTheDocument();
    expect(screen.getByText('Surgery')).toBeInTheDocument();
    expect(screen.getByText('Vaccination')).toBeInTheDocument();
  });

  it('calls onSpecialtyChange when specialty is clicked', () => {
    render(<VetSidebar selectedSpecialty="all" onSpecialtyChange={mockOnSpecialtyChange} />);
    fireEvent.click(screen.getByText('Cardiology'));
    expect(mockOnSpecialtyChange).toHaveBeenCalledWith('cardiology');
  });

  it('highlights selected specialty', () => {
    render(<VetSidebar selectedSpecialty="cardiology" onSpecialtyChange={mockOnSpecialtyChange} />);
    const cardiologyButton = screen.getByText('Cardiology').closest('button');
    expect(cardiologyButton).toHaveClass('bg-blue-50');
  });
});
