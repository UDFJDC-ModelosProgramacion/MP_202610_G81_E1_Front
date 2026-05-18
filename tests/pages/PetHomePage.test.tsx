import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PetHomePage } from '../../src/pages/PetHomePage';
import * as petService from '../../src/services/petService';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../src/services/petService');

const mockRender = () => render(
  <BrowserRouter>
    <PetHomePage />
  </BrowserRouter>
);

describe('PetHomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders page structure', async () => {
    vi.mocked(petService.getAvailablePets).mockResolvedValue([]);
    mockRender();
    expect(await screen.findByText('Available Pets')).toBeInTheDocument();
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('shows pets from service', async () => {
    const mockPets = [
      { id: 1, name: 'Fido', species: 'Dog', breed: 'Labrador', age: 2, size: 'Large', gender: 'MALE', description: 'Friendly' }
    ];
    vi.mocked(petService.getAvailablePets).mockResolvedValue(mockPets as any);
    mockRender();
    
    await waitFor(() => {
      expect(screen.getByText('Fido')).toBeInTheDocument();
    });
  });

  it('filters pets by species', async () => {
    vi.mocked(petService.getAvailablePets).mockResolvedValue([]);
    mockRender();
    
    await screen.findByText('Available Pets');
    
    // Find the select next to "Species" text
    const speciesHeading = screen.getByText('Species');
    const speciesSelect = speciesHeading.parentElement?.querySelector('select')!;
    fireEvent.change(speciesSelect, { target: { value: 'DOG' } });
    
    await waitFor(() => {
      expect(petService.getAvailablePets).toHaveBeenCalledWith(expect.objectContaining({ species: 'DOG' }));
    });
  });

  it('filters pets by size', async () => {
    vi.mocked(petService.getAvailablePets).mockResolvedValue([]);
    mockRender();
    
    await screen.findByText('Available Pets');
    
    const sizeHeading = screen.getByText('Size');
    const sizeSelect = sizeHeading.parentElement?.querySelector('select')!;
    fireEvent.change(sizeSelect, { target: { value: 'LARGE' } });
    
    await waitFor(() => {
      expect(petService.getAvailablePets).toHaveBeenCalledWith(expect.objectContaining({ size: 'LARGE' }));
    });
  });

  it('shows empty state when no pets found', async () => {
    vi.mocked(petService.getAvailablePets).mockResolvedValue([]);
    mockRender();
    
    await waitFor(() => {
      expect(screen.getByText(/No pets available at the moment/i)).toBeInTheDocument();
    });
  });
});
