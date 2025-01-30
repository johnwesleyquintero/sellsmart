import { useLocation, useNavigate } from "react-router-dom";
import { Home, BarChart2, Target, History, Database } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigationItems = [
  { 
    title: "Overview", 
    icon: Home, 
    path: "/dashboard",
    description: "Dashboard overview and key metrics"
  },
  { 
    title: "Insights", 
    icon: BarChart2, 
    path: "/dashboard/insights",
    description: "Detailed performance analytics"
  },
  { 
    title: "Targets & Search Terms", 
    icon: Target, 
    path: "/dashboard/targets",
    description: "Campaign targets and search term analysis"
  },
  { 
    title: "History", 
    icon: History, 
    path: "/dashboard/history",
    description: "Historical performance data"
  },
  { 
    title: "DSP", 
    icon: Database, 
    path: "/dashboard/dsp",
    description: "Demand-side platform management"
  },
];

export function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleNavigation(item.path)}
                    isActive={location.pathname === item.path}
                    className="flex items-center gap-2"
                    title={item.description}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}