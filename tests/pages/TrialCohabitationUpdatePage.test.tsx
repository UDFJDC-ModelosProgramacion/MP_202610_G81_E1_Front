import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TrialCohabitationUpdatePage } from '../../src/pages/TrialCohabitationUpdatePage';
import { BrowserRouter } from 'react-router-dom';

describe('TrialCohabitationUpdatePage', () => {
  it('renders trial cohabitation update form', () => {
    render(
      <BrowserRouter>
        <TrialCohabitationUpdatePage />
      </BrowserRouter>
    );
    expect(screen.getByText('Update Trial Cohabitation Result')).toBeInTheDocument();
  });
});
