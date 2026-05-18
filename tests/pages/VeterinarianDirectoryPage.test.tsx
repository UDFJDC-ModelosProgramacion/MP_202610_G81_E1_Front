import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VeterinarianDirectoryPage } from '../../src/pages/VeterinarianDirectoryPage';
import * as vetService from '../../src/services/veterinarianService';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../src/services/veterinarianService');

describe('VeterinarianDirectoryPage', () => {
  it('renders page with header and footer', async () => {
    vi.mocked(vetService.getVeterinarians).mockResolvedValue([]);
    render(
      <BrowserRouter>
        <VeterinarianDirectoryPage />
      </BrowserRouter>
    );
    expect(screen.getByText('PetMatch')).toBeInTheDocument();
    expect(screen.getByText(/2026 PetMatch/)).toBeInTheDocument();
  });

  it('renders veterinary directory content', async () => {
    vi.mocked(vetService.getVeterinarians).mockResolvedValue([]);
    render(
      <BrowserRouter>
        <VeterinarianDirectoryPage />
      </BrowserRouter>
    );
    expect(await screen.findByText('Veterinary Directory')).toBeInTheDocument();
  });
});
