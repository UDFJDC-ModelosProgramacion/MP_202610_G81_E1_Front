import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AdopterRegistrationPage } from '../../src/pages/AdopterRegistrationPage';
import { BrowserRouter } from 'react-router-dom';

describe('AdopterRegistrationPage', () => {
  it('renders adopter registration form', () => {
    render(
      <BrowserRouter>
        <AdopterRegistrationPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { name: 'Register as Adopter' })).toBeInTheDocument();
  });
});
