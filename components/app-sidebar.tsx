"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "admin",
    email: "admin@projectb.com",
    avatar: "/avatars/admin.jpg",
  },
  navCore: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Organization Hierarchy",
      url: "/hierarchy",
      icon: IconListDetails,
    },
    { title: "Resource Types & Units", url: "/resources", icon: IconDatabase },
    { title: "Allocations", url: "/allocations", icon: IconChartBar },
    { title: "Performance Monitoring", url: "/performance", icon: IconReport },
    { title: "Manual Reallocation", url: "/reallocation", icon: IconFileAi },
  ],
  navManagement: [
    { title: "Audit Logs", url: "/audit", icon: IconFileDescription },
    { title: "User Management", url: "/users", icon: IconUsers },
    {
      title: "Integrations / API Settings",
      url: "/integrations",
      icon: IconSettings,
    },
  ],
  navSettings: [
    { title: "Get Help", url: "/help", icon: IconHelp },
    { title: "Search", url: "/search", icon: IconSearch },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">ProjectB</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* Organization/Tenant Switcher Placeholder */}
        <div className="mt-2 mb-2 px-2">
          <select className="w-full rounded border p-1 text-sm">
            <option>Project-B Inc.</option>
            <option>Tenant X</option>
          </select>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Core Section */}
        <div className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground">
          Core
        </div>
        <NavMain items={data.navCore} />
        <div className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground">
          Management
        </div>
        <NavMain items={data.navManagement} />
        <div className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground">
          Settings
        </div>
        <NavMain items={data.navSettings} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
