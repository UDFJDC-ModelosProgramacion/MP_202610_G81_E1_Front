import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PetCard } from '../../../../src/features/pet-inventory/components/PetCard';

describe('PetCard', () => {
  const mockProps = {
    name: 'Buddy',
    breed: 'Labrador',
    age: 2,
    photos: 'photo.jpg',
    shelterName: 'Happy Paws',
  };

  it('renders pet name and breed', () => {
    render(<PetCard {...mockProps} />);
    expect(screen.getByText('Buddy')).toBeInTheDocument();
    expect(screen.getByText('Labrador')).toBeInTheDocument();
  });

  it('renders pet age with correct pluralization for singular', () => {
    render(<PetCard {...mockProps} age={1} />);
    expect(screen.getByText('1 year')).toBeInTheDocument();
  });

  it('renders pet age with correct pluralization for plural', () => {
    render(<PetCard {...mockProps} age={3} />);
    expect(screen.getByText('3 years')).toBeInTheDocument();
  });

  it('renders shelter name', () => {
    render(<PetCard {...mockProps} />);
    expect(screen.getByText('Happy Paws')).toBeInTheDocument();
  });

  it('renders default shelter name when empty', () => {
    render(<PetCard {...mockProps} shelterName="" />);
    expect(screen.getByText('Refugio Local')).toBeInTheDocument();
  });

  it('renders available badge', () => {
    render(<PetCard {...mockProps} />);
    expect(screen.getByText('AVAILABLE')).toBeInTheDocument();
  });

  it('renders view profile button', () => {
    render(<PetCard {...mockProps} />);
    expect(screen.getByText('View Profile')).toBeInTheDocument();
  });
});
