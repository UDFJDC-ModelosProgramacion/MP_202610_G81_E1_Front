import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VeterinarianCard } from '../../../../src/features/veterinarian/components/VeterinarianCard';

describe('VeterinarianCard Component', () => {
  const mockVet = {
    id: 1,
    name: 'Dr. Test',
    specialty: 'Surgery',
    availability: 'Mon-Fri',
    phone: '123',
    email: 'test@test.com',
    shelter: { name: 'Test Shelter' } as any,
  };

  it('should render veterinarian details correctly', () => {
    render(<VeterinarianCard vet={mockVet as any} />);
    
    expect(screen.getByText('Dr. Test')).toBeInTheDocument();
    expect(screen.getByText('Surgery')).toBeInTheDocument();
    expect(screen.getByText('Mon-Fri')).toBeInTheDocument();
    expect(screen.getByText('Test Shelter')).toBeInTheDocument();
  });
});
