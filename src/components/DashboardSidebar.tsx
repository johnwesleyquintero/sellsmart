import { useLocation, useNavigate } from "react-router-dom";
import { Home, BarChart2, Target, History, Database, Download, FileInput } from "lucide-react";
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

const analyticItems = [
  { title: "Overview", icon: Home, path: "/dashboard" },
  { title: "Insights", icon: BarChart2, path: "/dashboard/insights" },
  { title: "Targets & Search Terms", icon: Target, path: "/dashboard/targets" },
  { title: "History", icon: History, path: "/dashboard/history" },
  { title: "DSP", icon: Database, path: "/dashboard/dsp" },
];

const dataSourceItems = [
  { title: "Import Amazon Ads", icon: FileInput, path: "/dashboard/import" },
  { title: "Download Reports", icon: Download, path: "/dashboard/reports" },
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
              {analyticItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleNavigation(item.path)}
                    isActive={location.pathname === item.path}
                    className="flex items-center gap-2"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel>Data Sources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dataSourceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleNavigation(item.path)}
                    isActive={location.pathname === item.path}
                    className="flex items-center gap-2"
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