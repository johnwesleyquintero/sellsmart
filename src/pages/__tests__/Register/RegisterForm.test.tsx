import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../../Register';
import { vi, describe, it, expect } from 'vitest';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  BrowserRouter: ({ children }) => children,
  useNavigate: vi.fn(),
}));

describe('Register Form Rendering', () => {
  it('renders registration form with all fields', () => {
    const { getByPlaceholderText, getByRole } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/company name/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/^password$/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });
});
