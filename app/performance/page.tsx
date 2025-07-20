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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconAlt,
  IconDownload,
  IconRefresh,
  IconTarget,
  IconActivity,
} from "@tabler/icons-react";
import { useState } from "react";

// Mock data for performance metrics
const mockPerformanceData = {
  kpi: [
    {
      id: "1",
      name: "Overall Utilization Rate",
      value: 87.3,
      target: 85,
      trend: "up",
      change: "+2.1%",
      status: "good",
      unit: "%",
    },
    {
      id: "2",
      name: "Budget Efficiency",
      value: 92.5,
      target: 90,
      trend: "up",
      change: "+1.8%",
      status: "excellent",
      unit: "%",
    },
    {
      id: "3",
      name: "Resource Waste",
      value: 4.2,
      target: 5,
      trend: "down",
      change: "-0.8%",
      status: "good",
      unit: "%",
    },
    {
      id: "4",
      name: "Allocation Response Time",
      value: 2.1,
      target: 3,
      trend: "down",
      change: "-0.3 days",
      status: "excellent",
      unit: "days",
    },
  ],
  unitPerformance: [
    {
      id: "1",
      name: "North Region",
      utilizationRate: 92.5,
      budgetEfficiency: 88.9,
      wastePercentage: 3.1,
      performanceScore: 89.5,
      status: "excellent",
      issues: 0,
      lastUpdated: "2 hours ago",
    },
    {
      id: "2",
      name: "South Region",
      utilizationRate: 80.2,
      budgetEfficiency: 85.1,
      wastePercentage: 6.8,
      performanceScore: 82.1,
      status: "good",
      issues: 1,
      lastUpdated: "4 hours ago",
    },
    {
      id: "3",
      name: "Delhi State",
      utilizationRate: 95.1,
      budgetEfficiency: 91.2,
      wastePercentage: 2.1,
      performanceScore: 92.8,
      status: "excellent",
      issues: 0,
      lastUpdated: "1 hour ago",
    },
    {
      id: "4",
      name: "Punjab State",
      utilizationRate: 78.5,
      budgetEfficiency: 79.2,
      wastePercentage: 8.9,
      performanceScore: 78.2,
      status: "warning",
      issues: 3,
      lastUpdated: "6 hours ago",
    },
    {
      id: "5",
      name: "Karnataka State",
      utilizationRate: 83.7,
      budgetEfficiency: 86.4,
      wastePercentage: 5.2,
      performanceScore: 84.3,
      status: "good",
      issues: 1,
      lastUpdated: "3 hours ago",
    },
  ],
  alerts: [
    {
      id: "1",
      type: "warning",
      title: "Low Utilization - Punjab State",
      message: "Utilization rate has dropped below 80% threshold",
      severity: "medium",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "info",
      title: "Performance Review Due",
      message: "Quarterly performance review scheduled for next week",
      severity: "low",
      timestamp: "1 day ago",
    },
    {
      id: "3",
      type: "error",
      title: "Budget Variance Alert",
      message: "South Region showing significant budget variance",
      severity: "high",
      timestamp: "4 hours ago",
    },
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent":
      return "bg-green-100 text-green-800";
    case "good":
      return "bg-blue-100 text-blue-800";
    case "warning":
      return "bg-yellow-100 text-yellow-800";
    case "poor":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getAlertIcon = (type: string) => {
  switch (type) {
    case "error":
      return <IconAlt className="h-4 w-4 text-red-500" />;
    case "warning":
      return <IconAlt className="h-4 w-4 text-yellow-500" />;
    case "info":
      return <IconActivity className="h-4 w-4 text-blue-500" />;
    default:
      return <IconActivity className="h-4 w-4" />;
  }
};

const getPerformanceColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 80) return "text-blue-600";
  if (score >= 70) return "text-yellow-600";
  return "text-red-600";
};

export default function PerformancePage() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Performance Monitoring" },
  ];

  return (
    <PageLayout title="Performance Monitoring" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline">
              <IconRefresh className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline">
              <IconDownload className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated: 2 hours ago
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="units">Unit Performance</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockPerformanceData.kpi.map((metric) => (
                <Card key={metric.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      {metric.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">
                          {metric.value}
                          {metric.unit}
                        </span>
                        <Badge className={getStatusColor(metric.status)}>
                          {metric.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        {metric.trend === "up" ? (
                          <IconTrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <IconTrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <span
                          className={
                            metric.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {metric.change}
                        </span>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Target: {metric.target}
                        {metric.unit}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Performance Summary Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>
                  Historical performance data and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <IconTrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    Performance charts and visualizations will be displayed here
                  </p>
                  <p className="text-sm">
                    Interactive charts showing trends over time
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="units" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockPerformanceData.unitPerformance.map((unit) => (
                <Card key={unit.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{unit.name}</CardTitle>
                        <CardDescription>
                          Performance Score:
                          <span
                            className={`font-semibold ml-1 ${getPerformanceColor(
                              unit.performanceScore
                            )}`}
                          >
                            {unit.performanceScore}%
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge className={getStatusColor(unit.status)}>
                          {unit.status}
                        </Badge>
                        {unit.issues > 0 && (
                          <Badge variant="outline" className="text-red-600">
                            {unit.issues} issues
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">
                          Utilization Rate
                        </div>
                        <div className="font-semibold">
                          {unit.utilizationRate}%
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          Budget Efficiency
                        </div>
                        <div className="font-semibold">
                          {unit.budgetEfficiency}%
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">
                          Waste Percentage
                        </div>
                        <div className="font-semibold">
                          {unit.wastePercentage}%
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          Last Updated
                        </div>
                        <div className="font-semibold">{unit.lastUpdated}</div>
                      </div>
                    </div>

                    {/* Performance Bars */}
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Utilization</span>
                          <span>{unit.utilizationRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              unit.utilizationRate >= 90
                                ? "bg-green-500"
                                : unit.utilizationRate >= 80
                                ? "bg-blue-500"
                                : "bg-yellow-500"
                            }`}
                            style={{ width: `${unit.utilizationRate}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Budget Efficiency</span>
                          <span>{unit.budgetEfficiency}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              unit.budgetEfficiency >= 90
                                ? "bg-green-500"
                                : unit.budgetEfficiency >= 80
                                ? "bg-blue-500"
                                : "bg-yellow-500"
                            }`}
                            style={{ width: `${unit.budgetEfficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Button size="sm" variant="outline">
                        <IconTarget className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Set Targets
                      </Button>
                      {unit.issues > 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600"
                        >
                          <IconAlt className="h-3 w-3 mr-1" />
                          View Issues
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="space-y-4">
              {mockPerformanceData.alerts.map((alert) => (
                <Card key={alert.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{alert.title}</h4>
                          <div className="flex gap-2">
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {alert.timestamp}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {alert.message}
                        </p>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Mark as Read
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
