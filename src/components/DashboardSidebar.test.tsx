import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SidebarProvider } from './ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  BrowserRouter: ({ children }) => children,
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: vi.fn(),
}));

describe('DashboardSidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all navigation items', () => {
    (useIsMobile as jest.Mock).mockReturnValue(false); // Mock useIsMobile
    const mockLocation = { pathname: '/dashboard' };
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    (useNavigate as jest.Mock).mockReturnValue(vi.fn());

    render(
      <BrowserRouter>
        <SidebarProvider>
          <DashboardSidebar />
        </SidebarProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Insights')).toBeInTheDocument();
    expect(screen.getByText('Targets & Search Terms')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('DSP')).toBeInTheDocument();
    expect(screen.getByText('Data Connections')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('highlights the active navigation item', () => {
    (useIsMobile as jest.Mock).mockReturnValue(false); // Mock useIsMobile
    const mockLocation = { pathname: '/dashboard/insights' };
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    (useNavigate as jest.Mock).mockReturnValue(vi.fn());

    render(
      <BrowserRouter>
        <SidebarProvider>
          <DashboardSidebar />
        </SidebarProvider>
      </BrowserRouter>
    );

    const insightsLink = screen.getByText('Insights');
    expect(insightsLink).toHaveClass('active'); // Assuming 'active' class is used for highlighting
  });

  it('navigates to the correct path when a navigation item is clicked', () => {
    (useIsMobile as jest.Mock).mockReturnValue(false); // Mock useIsMobile
    const mockNavigate = vi.fn();
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/dashboard' });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <SidebarProvider>
          <DashboardSidebar />
        </SidebarProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Insights'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/insights');
  });
});
