"use client";

import { PageLayout } from "@/components/page-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconPlus,
  IconSettings,
  IconApi,
  IconDatabase,
  IconCloud,
} from "@tabler/icons-react";

const mockIntegrations = [
  {
    id: "1",
    name: "Financial Management System",
    description:
      "Integration with existing financial management system for budget data",
    status: "connected",
    type: "ERP",
    lastSync: "2 hours ago",
    endpoint: "https://api.finance.projectb.com/v1",
  },
  {
    id: "2",
    name: "HR Management System",
    description: "Human resources data synchronization",
    status: "connected",
    type: "HRMS",
    lastSync: "1 day ago",
    endpoint: "https://api.hr.projectb.com/v2",
  },
  {
    id: "3",
    name: "Performance Analytics",
    description: "Real-time performance monitoring integration",
    status: "disconnected",
    type: "Analytics",
    lastSync: "Never",
    endpoint: "https://api.analytics.projectb.com",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "connected":
      return "bg-green-100 text-green-800";
    case "disconnected":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function IntegrationsPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Integrations / API Settings" },
  ];

  return (
    <PageLayout title="Integrations / API Settings" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button>
              <IconPlus className="h-4 w-4 mr-2" />
              Add Integration
            </Button>
            <Button variant="outline">
              <IconApi className="h-4 w-4 mr-2" />
              API Documentation
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {mockIntegrations.map((integration) => (
            <Card key={integration.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <IconDatabase className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <CardTitle className="text-lg">
                        {integration.name}
                      </CardTitle>
                      <CardDescription>
                        {integration.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(integration.status)}>
                    {integration.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Type</div>
                    <div className="font-medium">{integration.type}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Last Sync</div>
                    <div className="font-medium">{integration.lastSync}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Endpoint</div>
                    <div className="font-medium text-xs">
                      {integration.endpoint}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <Button size="sm" variant="outline">
                    <IconSettings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                  <Button size="sm" variant="outline">
                    Test Connection
                  </Button>
                  {integration.status === "connected" && (
                    <Button size="sm" variant="outline">
                      Sync Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
