import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PetHomePage } from '../../src/pages/PetHomePage';
import * as petService from '../../src/services/petService';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../src/services/petService');

describe('PetHomePage', () => {
  it('renders page structure', async () => {
    vi.mocked(petService.getAvailablePets).mockResolvedValue([]);
    render(
      <BrowserRouter>
        <PetHomePage />
      </BrowserRouter>
    );
    expect(screen.getByText('Available Pets')).toBeInTheDocument();
  });
});
