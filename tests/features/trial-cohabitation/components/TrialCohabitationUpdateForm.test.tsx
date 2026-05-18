import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TrialCohabitationUpdateForm } from '../../../../src/features/trial-cohabitation/components/TrialCohabitationUpdateForm';
import * as trialService from '../../../../src/services/trialCohabitationService';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../../../src/services/trialCohabitationService');

const mockRender = () => render(
  <BrowserRouter>
    <TrialCohabitationUpdateForm />
  </BrowserRouter>
);

describe('TrialCohabitationUpdateForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form title', () => {
    mockRender();
    expect(screen.getByText('Update Trial Cohabitation Result')).toBeInTheDocument();
  });

  it('renders search section', () => {
    mockRender();
    expect(screen.getByText('Search Trial Cohabitation')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter trial cohabitation ID/i)).toBeInTheDocument();
  });

  it('shows error for invalid search ID', async () => {
    mockRender();
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid ID/i)).toBeInTheDocument();
    });
  });

  it('shows trial data after successful search', async () => {
    const mockTrial = {
      id: 1,
      startDate: '2024-01-01',
      endDate: '2024-01-15',
      result: 'EN_PROCESO' as const,
    };
    vi.mocked(trialService.getTrialCohabitationById).mockResolvedValue(mockTrial as any);
    mockRender();
    
    const searchInput = screen.getByPlaceholderText(/Enter trial cohabitation ID/i);
    fireEvent.change(searchInput, { target: { value: '1' } });
    fireEvent.click(screen.getByText('Search'));
    
    await waitFor(() => {
      expect(screen.getByText('2024-01-01')).toBeInTheDocument();
      expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    });
  });

  it('shows error when trial not found', async () => {
    vi.mocked(trialService.getTrialCohabitationById).mockRejectedValue({ response: { status: 404 } });
    mockRender();
    
    const searchInput = screen.getByPlaceholderText(/Enter trial cohabitation ID/i);
    fireEvent.change(searchInput, { target: { value: '999' } });
    fireEvent.click(screen.getByText('Search'));
    
    await waitFor(() => {
      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });
  });

  it('renders result selector when trial data is loaded', async () => {
    const mockTrial = {
      id: 1,
      startDate: '2024-01-01',
      endDate: '2024-01-15',
      result: 'EN_PROCESO' as const,
    };
    vi.mocked(trialService.getTrialCohabitationById).mockResolvedValue(mockTrial as any);
    mockRender();
    
    const searchInput = screen.getByPlaceholderText(/Enter trial cohabitation ID/i);
    fireEvent.change(searchInput, { target: { value: '1' } });
    fireEvent.click(screen.getByText('Search'));
    
    await waitFor(() => {
      expect(screen.getByLabelText(/New Result/i)).toBeInTheDocument();
    });
  });
});
