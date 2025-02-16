import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarProvider } from './ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => children,
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('@/hooks/use-mobile', () => ({
  useIsMobile: jest.fn(),
}));

describe('DashboardSidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all navigation items', () => {
    (useIsMobile as jest.Mock).mockReturnValue(false); // Mock useIsMobile
    const mockLocation = { pathname: '/dashboard' };
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());

    render(
      <BrowserRouter>
        <SidebarProvider>
          <DashboardSidebar />
        </SidebarProvider>
      </BrowserRouter>
    );

    screen.getByText('Overview').toBeInTheDocument();
    screen.getByText('Insights').toBeInTheDocument();
    screen.getByText('Targets & Search Terms').toBeInTheDocument();
    screen.getByText('History').toBeInTheDocument();
    screen.getByText('DSP').toBeInTheDocument();
    screen.getByText('Data Connections').toBeInTheDocument();
    screen.getByText('Settings').toBeInTheDocument();
  });

  it('highlights the active navigation item', () => {
    (useIsMobile as jest.Mock).mockReturnValue(false); // Mock useIsMobile
    const mockLocation = { pathname: '/dashboard/insights' };
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());

    render(
      <BrowserRouter>
        <SidebarProvider>
          <DashboardSidebar />
        </SidebarProvider>
      </BrowserRouter>
    );

    const insightsLink = screen.getByText('Insights');
    insightsLink.toHaveClass('active'); // Assuming 'active' class is used for highlighting
  });

  it('navigates to the correct path when a navigation item is clicked', () => {
    (useIsMobile as jest.Mock).mockReturnValue(false); // Mock useIsMobile
    const mockNavigate = jest.fn();
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
    mockNavigate.toHaveBeenCalledWith('/dashboard/insights');
  });
});
