"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconPlus,
  IconArrowRight,
  IconReport,
  IconUsers,
  IconFileText,
  IconSettings,
} from "@tabler/icons-react";

import type { IconProps } from "@tabler/icons-react";

interface Action {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>;
  href: string;
  badge?: string;
  permissions: string[];
}

interface QuickActionsPanelProps {
  userRole: string;
  userPermissions: string[];
}

export function QuickActionsPanel({
  userRole,
  userPermissions,
}: QuickActionsPanelProps) {
  const actions: Action[] = [
    {
      id: "add-allocation",
      title: "Add/Request Allocation",
      description: "Create new resource allocation",
      icon: IconPlus,
      href: "/allocations/new",
      permissions: ["create_allocation"],
    },
    {
      id: "propose-reallocation",
      title: "Propose Reallocation",
      description: "Redistribute resources between units",
      icon: IconArrowRight,
      href: "/reallocation/new",
      badge: "3 pending",
      permissions: ["create_reallocation"],
    },
    {
      id: "reports",
      title: "View Reports",
      description: "Access analytics and insights",
      icon: IconReport,
      href: "/reports",
      permissions: ["view_reports"],
    },
    {
      id: "manage-users",
      title: "Manage Users",
      description: "User management and permissions",
      icon: IconUsers,
      href: "/users",
      permissions: ["manage_users"],
    },
    {
      id: "audit-trail",
      title: "Audit Trail",
      description: "View system activity logs",
      icon: IconFileText,
      href: "/audit",
      permissions: ["view_audit"],
    },
    {
      id: "settings",
      title: "System Settings",
      description: "Configure system parameters",
      icon: IconSettings,
      href: "/settings",
      permissions: ["admin"],
    },
  ];

  const allowedActions = actions.filter((action) =>
    action.permissions.some((permission) =>
      userPermissions.includes(permission)
    )
  );

  return (
    <section className="px-4 lg:px-6 py-6">
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allowedActions.map((action) => (
              <Card
                key={action.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <action.icon className="h-8 w-8 text-primary" />
                    {action.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {action.badge}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {action.description}
                  </p>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => (window.location.href = action.href)}
                  >
                    {action.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
