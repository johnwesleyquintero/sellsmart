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
  { title: "Overview", icon: Home, url: "/dashboard" },
  { title: "Insights", icon: BarChart2, url: "/dashboard/insights" },
  { title: "Targets & Search Terms", icon: Target, url: "/dashboard/targets" },
  { title: "History", icon: History, url: "/dashboard/history" },
  { title: "DSP", icon: Database, url: "/dashboard/dsp" },
];

const dataSourceItems = [
  { title: "Import Amazon Ads", icon: FileInput, url: "/dashboard/import" },
  { title: "Download Reports", icon: Download, url: "/dashboard/reports" },
];

export function DashboardSidebar() {
  return (
    <Sidebar className="bg-[#232F3E] text-white min-h-screen w-64 border-r border-[#3a4553]">
      <SidebarContent>
        <div className="p-4 mb-6">
          <h2 className="text-xl font-bold text-white">Amazon Analytics</h2>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#879596] text-sm font-medium px-4 mb-2">
            Analytics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.url} 
                      className="flex items-center gap-3 px-4 py-2 text-[#D5DBDB] hover:bg-[#37475A] hover:text-white rounded-sm transition-colors duration-200"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-[#879596] text-sm font-medium px-4 mb-2">
            Data Sources
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dataSourceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.url} 
                      className="flex items-center gap-3 px-4 py-2 text-[#D5DBDB] hover:bg-[#37475A] hover:text-white rounded-sm transition-colors duration-200"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.title}</span>
                    </a>
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