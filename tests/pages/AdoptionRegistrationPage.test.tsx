import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AdoptionRegistrationPage } from '../../src/pages/AdoptionRegistrationPage';
import { BrowserRouter } from 'react-router-dom';

describe('AdoptionRegistrationPage', () => {
  it('renders adoption registration form', () => {
    render(
      <BrowserRouter>
        <AdoptionRegistrationPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Register Formal Adoption')).toBeInTheDocument();
  });
});
