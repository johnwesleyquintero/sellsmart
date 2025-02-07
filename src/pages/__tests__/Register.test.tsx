import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Mock dependencies
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders registration form', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/company name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('shows error when passwords do not match', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: 'password456' },
    });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(toast.error).toHaveBeenCalledWith('Passwords do not match');
  });

  it('handles successful registration', async () => {
    (supabase.auth.signUp as jest.Mock).mockResolvedValueOnce({
      data: { user: { id: '123' } },
      error: null,
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/company name/i), {
      target: { value: 'Test Company' },
    });
    fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Registration successful! Please check your email to verify your account.'
      );
    });
  });

  it('handles registration error', async () => {
    const errorMessage = 'Registration failed';
    (supabase.auth.signUp as jest.Mock).mockResolvedValueOnce({
      data: null,
      error: { message: errorMessage },
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/company name/i), {
      target: { value: 'Test Company' },
    });
    fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });
});