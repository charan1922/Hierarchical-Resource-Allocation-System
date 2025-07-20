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
  IconPlus,
  IconEdit,
  IconTrash,
  IconCurrency,
  IconUsers,
  IconBuilding,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useState } from "react";

// Mock data for resource types
const mockResourceTypes = [
  {
    id: "1",
    name: "Financial Resources",
    description: "Budget allocations and financial assets",
    unit: "INR",
    totalAllocated: 50000000,
    totalUtilized: 43500000,
    activeUnits: 24,
    status: "active",
  },
  {
    id: "2",
    name: "Human Resources",
    description: "Personnel and workforce allocation",
    unit: "Employees",
    totalAllocated: 1250,
    totalUtilized: 1180,
    activeUnits: 18,
    status: "active",
  },
  {
    id: "3",
    name: "Infrastructure",
    description: "Physical assets and facilities",
    unit: "Sq.Ft",
    totalAllocated: 500000,
    totalUtilized: 420000,
    activeUnits: 12,
    status: "active",
  },
  {
    id: "4",
    name: "Technology Assets",
    description: "IT equipment and software licenses",
    unit: "Assets",
    totalAllocated: 850,
    totalUtilized: 720,
    activeUnits: 15,
    status: "under_review",
  },
];

// Mock data for resource units
const mockResourceUnits = [
  {
    id: "1",
    name: "North Region Budget",
    type: "Financial Resources",
    owner: "North Regional Office",
    allocated: 20000000,
    utilized: 18500000,
    utilizationRate: 92.5,
    status: "optimal",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "Delhi IT Infrastructure",
    type: "Technology Assets",
    owner: "Delhi State Office",
    allocated: 150,
    utilized: 135,
    utilizationRate: 90,
    status: "optimal",
    lastUpdated: "5 hours ago",
  },
  {
    id: "3",
    name: "South Region Workforce",
    type: "Human Resources",
    owner: "South Regional Office",
    allocated: 300,
    utilized: 280,
    utilizationRate: 93.3,
    status: "optimal",
    lastUpdated: "1 day ago",
  },
  {
    id: "4",
    name: "Punjab Office Space",
    type: "Infrastructure",
    owner: "Punjab State Office",
    allocated: 50000,
    utilized: 35000,
    utilizationRate: 70,
    status: "underutilized",
    lastUpdated: "3 hours ago",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "optimal":
      return "bg-blue-100 text-blue-800";
    case "underutilized":
      return "bg-yellow-100 text-yellow-800";
    case "overutilized":
      return "bg-red-100 text-red-800";
    case "under_review":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Financial Resources":
      return <IconCurrency className="h-4 w-4" />;
    case "Human Resources":
      return <IconUsers className="h-4 w-4" />;
    case "Infrastructure":
      return <IconBuilding className="h-4 w-4" />;
    case "Technology Assets":
      return <IconTrendingUp className="h-4 w-4" />;
    default:
      return <IconBuilding className="h-4 w-4" />;
  }
};

export default function ResourcesPage() {
  const [selectedTab, setSelectedTab] = useState("types");

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Resource Types & Units" },
  ];

  const formatValue = (value: number, unit: string) => {
    if (unit === "INR") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
      }).format(value);
    }
    return `${value.toLocaleString()} ${unit}`;
  };

  const getUtilizationPercentage = (allocated: number, utilized: number) => {
    return ((utilized / allocated) * 100).toFixed(1);
  };

  return (
    <PageLayout title="Resource Types & Units" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button>
              <IconPlus className="h-4 w-4 mr-2" />
              Add Resource Type
            </Button>
            <Button variant="outline">
              <IconPlus className="h-4 w-4 mr-2" />
              Add Resource Unit
            </Button>
          </div>
        </div>

        {/* Tabs for Resource Types and Units */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="types">Resource Types</TabsTrigger>
            <TabsTrigger value="units">Resource Units</TabsTrigger>
          </TabsList>

          <TabsContent value="types" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockResourceTypes.map((type) => (
                <Card key={type.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(type.name)}
                        <div>
                          <CardTitle className="text-lg">{type.name}</CardTitle>
                          <CardDescription>{type.description}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(type.status)}>
                        {type.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">
                          Total Allocated
                        </div>
                        <div className="font-semibold">
                          {formatValue(type.totalAllocated, type.unit)}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          Total Utilized
                        </div>
                        <div className="font-semibold">
                          {formatValue(type.totalUtilized, type.unit)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">
                          Active Units
                        </div>
                        <div className="font-semibold">{type.activeUnits}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Utilization</div>
                        <div className="font-semibold">
                          {getUtilizationPercentage(
                            type.totalAllocated,
                            type.totalUtilized
                          )}
                          %
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Button size="sm" variant="outline">
                        <IconEdit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        View Units
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        <IconTrash className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="units" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockResourceUnits.map((unit) => (
                <Card key={unit.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{unit.name}</CardTitle>
                        <CardDescription>{unit.type}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(unit.status)}>
                        {unit.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <div className="text-muted-foreground">Owner</div>
                      <div className="font-medium">{unit.owner}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Allocated</div>
                        <div className="font-semibold">
                          {unit.type === "Financial Resources"
                            ? formatValue(unit.allocated, "INR")
                            : unit.allocated.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Utilized</div>
                        <div className="font-semibold">
                          {unit.type === "Financial Resources"
                            ? formatValue(unit.utilized, "INR")
                            : unit.utilized.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Utilization Rate
                        </span>
                        <span className="font-semibold">
                          {unit.utilizationRate}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            unit.utilizationRate >= 85
                              ? "bg-green-500"
                              : unit.utilizationRate >= 70
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${unit.utilizationRate}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Last updated: {unit.lastUpdated}
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Button size="sm" variant="outline">
                        <IconEdit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        View History
                      </Button>
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
