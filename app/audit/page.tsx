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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconSearch,
  IconDownload,
  IconFilter,
  IconCalendar,
  IconUser,
  IconActivity,
  IconEdit,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react";
import { useState } from "react";

// Mock audit log data
const mockAuditLogs = [
  {
    id: "1",
    timestamp: "2024-01-22 14:30:15",
    user: "Admin User",
    action: "CREATE_ALLOCATION",
    resource: "Budget Allocation ALL-001",
    details: "Created new budget allocation of ₹2.5Cr for North Region",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome 121.0",
    severity: "info",
    category: "allocation",
  },
  {
    id: "2",
    timestamp: "2024-01-22 13:45:22",
    user: "Regional Manager",
    action: "APPROVE_REALLOCATION",
    resource: "Reallocation REA-002",
    details: "Approved IT equipment reallocation from Delhi to Punjab",
    ipAddress: "192.168.1.105",
    userAgent: "Firefox 122.0",
    severity: "info",
    category: "reallocation",
  },
  {
    id: "3",
    timestamp: "2024-01-22 12:15:08",
    user: "IT Admin",
    action: "UPDATE_USER_PERMISSIONS",
    resource: "User: john.manager@projectb.com",
    details: "Updated user permissions - added allocation approval rights",
    ipAddress: "192.168.1.110",
    userAgent: "Chrome 121.0",
    severity: "warning",
    category: "user_management",
  },
  {
    id: "4",
    timestamp: "2024-01-22 11:30:45",
    user: "System",
    action: "AUTO_PERFORMANCE_ALERT",
    resource: "Punjab State Performance",
    details: "Automated alert: Performance score dropped below 80% threshold",
    ipAddress: "System",
    userAgent: "System Process",
    severity: "warning",
    category: "performance",
  },
  {
    id: "5",
    timestamp: "2024-01-22 10:20:33",
    user: "Finance Director",
    action: "DELETE_ALLOCATION",
    resource: "Budget Allocation ALL-005",
    details: "Deleted cancelled budget allocation request",
    ipAddress: "192.168.1.108",
    userAgent: "Safari 17.0",
    severity: "error",
    category: "allocation",
  },
  {
    id: "6",
    timestamp: "2024-01-22 09:15:12",
    user: "Data Admin",
    action: "EXPORT_REPORT",
    resource: "Performance Report Q4-2024",
    details: "Exported quarterly performance report",
    ipAddress: "192.168.1.115",
    userAgent: "Chrome 121.0",
    severity: "info",
    category: "reporting",
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "info":
      return "bg-blue-100 text-blue-800";
    case "warning":
      return "bg-yellow-100 text-yellow-800";
    case "error":
      return "bg-red-100 text-red-800";
    case "success":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "allocation":
      return "bg-purple-100 text-purple-800";
    case "reallocation":
      return "bg-orange-100 text-orange-800";
    case "user_management":
      return "bg-teal-100 text-teal-800";
    case "performance":
      return "bg-indigo-100 text-indigo-800";
    case "reporting":
      return "bg-cyan-100 text-cyan-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getActionIcon = (action: string) => {
  if (action.includes("CREATE") || action.includes("ADD"))
    return <IconPlus className="h-4 w-4" />;
  if (action.includes("UPDATE") || action.includes("EDIT"))
    return <IconEdit className="h-4 w-4" />;
  if (action.includes("DELETE")) return <IconTrash className="h-4 w-4" />;
  if (action.includes("USER")) return <IconUser className="h-4 w-4" />;
  return <IconActivity className="h-4 w-4" />;
};

export default function AuditPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Audit Logs" },
  ];

  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch =
      searchTerm === "" ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || log.category === selectedCategory;
    const matchesSeverity =
      selectedSeverity === "all" || log.severity === selectedSeverity;

    return matchesSearch && matchesCategory && matchesSeverity;
  });

  return (
    <PageLayout title="Audit Logs" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs by user, action, resource, or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="allocation">Allocation</SelectItem>
                <SelectItem value="reallocation">Reallocation</SelectItem>
                <SelectItem value="user_management">User Management</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="reporting">Reporting</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedSeverity}
              onValueChange={setSelectedSeverity}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <IconDownload className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{filteredLogs.length}</div>
              <div className="text-sm text-muted-foreground">Total Logs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {filteredLogs.filter((log) => log.severity === "error").length}
              </div>
              <div className="text-sm text-muted-foreground">Errors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {
                  filteredLogs.filter((log) => log.severity === "warning")
                    .length
                }
              </div>
              <div className="text-sm text-muted-foreground">Warnings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredLogs.filter((log) => log.severity === "info").length}
              </div>
              <div className="text-sm text-muted-foreground">Info</div>
            </CardContent>
          </Card>
        </div>

        {/* Audit Logs List */}
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <Card key={log.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getActionIcon(log.action)}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">
                            {log.action.replace(/_/g, " ")}
                          </span>
                          <Badge className={getCategoryColor(log.category)}>
                            {log.category.replace("_", " ")}
                          </Badge>
                          <Badge className={getSeverityColor(log.severity)}>
                            {log.severity}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">
                          <span className="font-medium">{log.user}</span> •{" "}
                          {log.resource}
                        </div>
                        <div className="text-sm">{log.details}</div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        <div>{log.timestamp}</div>
                        <div>IP: {log.ipAddress}</div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground border-t pt-2">
                      <span>User Agent: {log.userAgent}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <IconSearch className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <div className="text-muted-foreground">
                No audit logs found matching your search criteria.
              </div>
            </CardContent>
          </Card>
        )}

        {/* Load More Button */}
        {filteredLogs.length > 0 && (
          <div className="text-center">
            <Button variant="outline">Load More Logs</Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
