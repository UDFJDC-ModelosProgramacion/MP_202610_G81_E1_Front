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

  it('triggers search on Enter key', async () => {
    vi.mocked(trialService.getTrialCohabitationById).mockResolvedValue({ id: 1 } as any);
    mockRender();
    const searchInput = screen.getByPlaceholderText(/Enter trial cohabitation ID/i);
    fireEvent.change(searchInput, { target: { value: '1' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    
    await waitFor(() => {
      expect(trialService.getTrialCohabitationById).toHaveBeenCalledWith(1);
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

  it('submits update successfully', async () => {
    const mockTrial = {
      id: 1,
      startDate: '2024-01-01',
      endDate: '2024-01-15',
      result: 'EN_PROCESO' as const,
    };
    vi.mocked(trialService.getTrialCohabitationById).mockResolvedValue(mockTrial as any);
    vi.mocked(trialService.updateTrialCohabitation).mockResolvedValue({} as any);
    
    mockRender();
    
    // Search first
    fireEvent.change(screen.getByPlaceholderText(/Enter trial cohabitation ID/i), { target: { value: '1' } });
    fireEvent.click(screen.getByText('Search'));
    
    await waitFor(() => {
      expect(screen.getByLabelText(/New Result/i)).toBeInTheDocument();
    });
    
    fireEvent.change(screen.getByLabelText(/New Result/i), { target: { value: 'EXITOSA' } });
    fireEvent.click(screen.getByText('Update Result'));
    
    await waitFor(() => {
      expect(screen.getByText(/Result Updated Successfully!/i)).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Accept'));
    expect(screen.queryByText(/Result Updated Successfully!/i)).not.toBeInTheDocument();
  });

  it('shows error dialog on update failure', async () => {
    const mockTrial = {
      id: 1,
      startDate: '2024-01-01',
      endDate: '2024-01-15',
      result: 'EN_PROCESO' as const,
    };
    vi.mocked(trialService.getTrialCohabitationById).mockResolvedValue(mockTrial as any);
    vi.mocked(trialService.updateTrialCohabitation).mockRejectedValue({
      response: { data: { message: 'Update failed' } }
    });
    
    mockRender();
    
    fireEvent.change(screen.getByPlaceholderText(/Enter trial cohabitation ID/i), { target: { value: '1' } });
    fireEvent.click(screen.getByText('Search'));
    
    await waitFor(() => {
      expect(screen.getByLabelText(/New Result/i)).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Update Result'));
    
    await waitFor(() => {
      expect(screen.getByText('Update failed')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Accept'));
    expect(screen.queryByText('Update failed')).not.toBeInTheDocument();
  });

  it('clears trial data on cancel', async () => {
    const mockTrial = { id: 1, result: 'EN_PROCESO' };
    vi.mocked(trialService.getTrialCohabitationById).mockResolvedValue(mockTrial as any);
    mockRender();
    
    fireEvent.change(screen.getByPlaceholderText(/Enter trial cohabitation ID/i), { target: { value: '1' } });
    fireEvent.click(screen.getByText('Search'));
    
    await waitFor(() => {
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });
});
