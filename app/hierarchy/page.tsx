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
  IconEdit,
  IconTrash,
  IconUsers,
  IconBuilding,
  IconMap,
} from "@tabler/icons-react";
import { useState } from "react";

// Mock data for hierarchy management
const mockHierarchyData = [
  {
    id: "1",
    name: "National Headquarters",
    type: "National",
    parent: null,
    children: 4,
    employees: 250,
    budget: 50000000,
    status: "active",
  },
  {
    id: "2",
    name: "North Region",
    type: "Regional",
    parent: "National Headquarters",
    children: 6,
    employees: 180,
    budget: 20000000,
    status: "active",
  },
  {
    id: "3",
    name: "South Region",
    type: "Regional",
    parent: "National Headquarters",
    children: 4,
    employees: 160,
    budget: 15000000,
    status: "active",
  },
  {
    id: "4",
    name: "Delhi State",
    type: "State",
    parent: "North Region",
    children: 8,
    employees: 85,
    budget: 10000000,
    status: "active",
  },
  {
    id: "5",
    name: "Punjab State",
    type: "State",
    parent: "North Region",
    children: 6,
    employees: 65,
    budget: 8000000,
    status: "under_review",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "under_review":
      return "bg-yellow-100 text-yellow-800";
    case "inactive":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "National":
      return <IconBuilding className="h-4 w-4" />;
    case "Regional":
      return <IconMap className="h-4 w-4" />;
    case "State":
      return <IconUsers className="h-4 w-4" />;
    default:
      return <IconBuilding className="h-4 w-4" />;
  }
};

export default function HierarchyPage() {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Organization Hierarchy" },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <PageLayout title="Organization Hierarchy" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button>
              <IconPlus className="h-4 w-4 mr-2" />
              Add Unit
            </Button>
            <Button variant="outline">Import Structure</Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Total Units: {mockHierarchyData.length}
          </div>
        </div>

        {/* Hierarchy Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockHierarchyData.map((unit) => (
            <Card
              key={unit.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedUnit === unit.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() =>
                setSelectedUnit(unit.id === selectedUnit ? null : unit.id)
              }
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(unit.type)}
                    <div>
                      <CardTitle className="text-lg">{unit.name}</CardTitle>
                      <CardDescription>{unit.type} Level</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(unit.status)}>
                    {unit.status.replace("_", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {unit.parent && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Parent: </span>
                    <span className="font-medium">{unit.parent}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Sub-units</div>
                    <div className="font-semibold">{unit.children}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Employees</div>
                    <div className="font-semibold">{unit.employees}</div>
                  </div>
                </div>

                <div className="text-sm">
                  <div className="text-muted-foreground">Budget Allocation</div>
                  <div className="font-semibold text-lg">
                    {formatCurrency(unit.budget)}
                  </div>
                </div>

                {selectedUnit === unit.id && (
                  <div className="flex gap-2 pt-2 border-t">
                    <Button size="sm" variant="outline">
                      <IconEdit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <IconUsers className="h-3 w-3 mr-1" />
                      View Details
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
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tree View Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hierarchy Tree View</CardTitle>
            <CardDescription>
              Interactive organizational structure visualization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <IconBuilding className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Interactive tree visualization will be implemented here</p>
              <p className="text-sm">
                Click on units above to see detailed hierarchy view
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
