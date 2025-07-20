"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// Import new dashboard sections
import { HeroSummaryBanner } from "./HeroSummaryBanner";
import { HierarchyOverview } from "./HierarchyOverview";
import { QuickActionsPanel } from "./QuickActionsPanel";
import { ActivityFeed } from "./ActivityFeed";
import { useState, useEffect } from "react";

// Sample data - replace with real API calls
const mockData = {
  user: {
    name: "Admin User",
    email: "admin@projectb.com",
    avatar: "/avatars/admin.jpg",
  },
  kpiData: {
    totalAllocation: 50000000, // 5 Crores
    utilizationPercent: 87,
    underAchievingUnits: 12,
    pendingApprovals: 8,
  },
  alerts: [
    {
      id: "1",
      message: "3 units require immediate reallocation attention",
      type: "warning" as const,
    },
    {
      id: "2",
      message: "Q4 allocation review due in 5 days",
      type: "info" as const,
    },
  ],
  hierarchyData: [
    {
      id: "1",
      name: "National Headquarters",
      level: "National",
      allocation: 50000000,
      utilized: 43500000,
      performance: "good" as const,
      children: [
        {
          id: "1-1",
          name: "North Region",
          level: "Regional",
          allocation: 20000000,
          utilized: 18500000,
          performance: "good" as const,
          children: [
            {
              id: "1-1-1",
              name: "Delhi State",
              level: "State",
              allocation: 10000000,
              utilized: 9200000,
              performance: "good" as const,
            },
            {
              id: "1-1-2",
              name: "Punjab State",
              level: "State",
              allocation: 10000000,
              utilized: 9300000,
              performance: "warning" as const,
            },
          ],
        },
        {
          id: "1-2",
          name: "South Region",
          level: "Regional",
          allocation: 15000000,
          utilized: 12000000,
          performance: "poor" as const,
        },
      ],
    },
  ],
  currentPath: ["National", "All Regions"],
  activities: [
    {
      id: "1",
      type: "allocation" as const,
      title: "New Budget Allocation",
      description: "Allocated ₹2.5Cr to South Region operations",
      user: { name: "John Manager", avatar: "/avatars/john.jpg" },
      timestamp: "2 hours ago",
      status: "completed" as const,
      amount: 25000000,
      link: "/allocations/123",
    },
    {
      id: "2",
      type: "reallocation" as const,
      title: "Resource Reallocation Request",
      description: "Request to move ₹50L from underperforming unit",
      user: { name: "Sarah Director", avatar: "/avatars/sarah.jpg" },
      timestamp: "4 hours ago",
      status: "pending" as const,
      amount: 5000000,
      link: "/reallocation/456",
    },
    {
      id: "3",
      type: "approval" as const,
      title: "Allocation Approved",
      description: "Emergency fund allocation for disaster relief",
      user: { name: "Admin User", avatar: "/avatars/admin.jpg" },
      timestamp: "1 day ago",
      status: "completed" as const,
      amount: 10000000,
    },
  ],
};

export default function Page() {
  const [userPermissions] = useState([
    "create_allocation",
    "create_reallocation",
    "view_reports",
    "manage_users",
    "view_audit",
    "admin",
  ]);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (node: any) => {
    setSelectedNode(node);
    // Navigate to detailed view or show modal
    console.log("Selected node:", node);
  };

  const handleOrgChange = (org: string) => {
    console.log("Organization changed to:", org);
  };

  const handleActivityFilter = (type: string) => {
    console.log("Filter activities by:", type);
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col">
            {/* Hero Section / Summary Banner */}
            <HeroSummaryBanner
              user={mockData.user}
              kpiData={mockData.kpiData}
              alerts={mockData.alerts}
            />

            {/* Hierarchy Overview Visualization */}
            <HierarchyOverview
              hierarchyData={mockData.hierarchyData}
              currentPath={mockData.currentPath}
              onNodeClick={handleNodeClick}
            />

            {/* Quick Actions Panel */}
            <QuickActionsPanel
              userRole="admin"
              userPermissions={userPermissions}
            />

            {/* Activity Feed */}
            <ActivityFeed
              activities={mockData.activities}
              onFilter={handleActivityFilter}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
