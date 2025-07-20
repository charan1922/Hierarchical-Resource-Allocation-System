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
  IconEye,
  IconDownload,
  IconFilter,
  IconCalendar,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons-react";
import { useState } from "react";

// Mock data for allocations
const mockAllocations = [
  {
    id: "ALL-001",
    title: "Q4 2024 Budget Allocation",
    fromUnit: "National Headquarters",
    toUnit: "North Region",
    resourceType: "Financial Resources",
    amount: 20000000,
    status: "approved",
    priority: "high",
    requestedBy: "Regional Manager",
    requestDate: "2024-01-15",
    approvedDate: "2024-01-18",
    effectiveDate: "2024-02-01",
    notes: "Quarterly budget allocation for operational expenses",
  },
  {
    id: "ALL-002",
    title: "Emergency Infrastructure Fund",
    fromUnit: "National Headquarters",
    toUnit: "South Region",
    resourceType: "Financial Resources",
    amount: 5000000,
    status: "pending",
    priority: "urgent",
    requestedBy: "State Director",
    requestDate: "2024-01-20",
    approvedDate: null,
    effectiveDate: "2024-01-25",
    notes: "Emergency allocation for infrastructure repairs",
  },
  {
    id: "ALL-003",
    title: "IT Equipment Allocation",
    fromUnit: "North Region",
    toUnit: "Delhi State",
    resourceType: "Technology Assets",
    amount: 150,
    status: "approved",
    priority: "medium",
    requestedBy: "IT Manager",
    requestDate: "2024-01-12",
    approvedDate: "2024-01-14",
    effectiveDate: "2024-01-20",
    notes: "New laptops and networking equipment",
  },
  {
    id: "ALL-004",
    title: "Workforce Expansion",
    fromUnit: "National Headquarters",
    toUnit: "Punjab State",
    resourceType: "Human Resources",
    amount: 25,
    status: "rejected",
    priority: "low",
    requestedBy: "HR Manager",
    requestDate: "2024-01-10",
    approvedDate: null,
    effectiveDate: null,
    notes: "Request for additional staff - budget constraints",
  },
  {
    id: "ALL-005",
    title: "Office Space Expansion",
    fromUnit: "South Region",
    toUnit: "Karnataka State",
    resourceType: "Infrastructure",
    amount: 10000,
    status: "under_review",
    priority: "medium",
    requestedBy: "Facilities Manager",
    requestDate: "2024-01-18",
    approvedDate: null,
    effectiveDate: "2024-02-15",
    notes: "Additional office space for growing team",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "under_review":
      return "bg-blue-100 text-blue-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "medium":
      return "bg-blue-100 text-blue-800";
    case "low":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatAmount = (amount: number, resourceType: string) => {
  if (resourceType === "Financial Resources") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  }
  return amount.toLocaleString();
};

const getResourceUnit = (resourceType: string) => {
  switch (resourceType) {
    case "Financial Resources":
      return "";
    case "Human Resources":
      return "employees";
    case "Infrastructure":
      return "sq.ft";
    case "Technology Assets":
      return "units";
    default:
      return "";
  }
};

export default function AllocationsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedAllocation, setSelectedAllocation] = useState<string | null>(
    null
  );

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Allocations" },
  ];

  const filteredAllocations =
    selectedFilter === "all"
      ? mockAllocations
      : mockAllocations.filter(
          (allocation) => allocation.status === selectedFilter
        );

  const getStatusCounts = () => {
    return {
      all: mockAllocations.length,
      approved: mockAllocations.filter((a) => a.status === "approved").length,
      pending: mockAllocations.filter((a) => a.status === "pending").length,
      under_review: mockAllocations.filter((a) => a.status === "under_review")
        .length,
      rejected: mockAllocations.filter((a) => a.status === "rejected").length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <PageLayout title="Allocations" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button>
              <IconPlus className="h-4 w-4 mr-2" />
              New Allocation
            </Button>
            <Button variant="outline">
              <IconDownload className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <IconFilter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <IconCalendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </div>

        {/* Status Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(statusCounts).map(([status, count]) => (
            <Card
              key={status}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedFilter === status ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedFilter(status)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {status.replace("_", " ")}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Allocations List */}
        <div className="space-y-4">
          {filteredAllocations.map((allocation) => (
            <Card
              key={allocation.id}
              className={`transition-all hover:shadow-md ${
                selectedAllocation === allocation.id
                  ? "ring-2 ring-primary"
                  : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">
                        {allocation.title}
                      </CardTitle>
                      <Badge variant="outline">{allocation.id}</Badge>
                    </div>
                    <CardDescription>{allocation.notes}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(allocation.priority)}>
                      {allocation.priority}
                    </Badge>
                    <Badge className={getStatusColor(allocation.status)}>
                      {allocation.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Allocation Flow */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex-1 text-center">
                    <div className="font-medium">{allocation.fromUnit}</div>
                    <div className="text-muted-foreground">From</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconArrowDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="font-medium">{allocation.toUnit}</div>
                    <div className="text-muted-foreground">To</div>
                  </div>
                </div>

                {/* Resource Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Resource Type</div>
                    <div className="font-medium">{allocation.resourceType}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Amount</div>
                    <div className="font-semibold text-lg">
                      {formatAmount(allocation.amount, allocation.resourceType)}
                      {getResourceUnit(allocation.resourceType) &&
                        ` ${getResourceUnit(allocation.resourceType)}`}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Requested By</div>
                    <div className="font-medium">{allocation.requestedBy}</div>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Request Date</div>
                    <div className="font-medium">{allocation.requestDate}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Approved Date</div>
                    <div className="font-medium">
                      {allocation.approvedDate || "Pending"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Effective Date</div>
                    <div className="font-medium">
                      {allocation.effectiveDate || "TBD"}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button size="sm" variant="outline">
                    <IconEye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  {allocation.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:text-green-700"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {allocation.status === "approved" && (
                    <Button size="sm" variant="outline">
                      <IconEdit className="h-3 w-3 mr-1" />
                      Modify
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <IconDownload className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAllocations.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground">
                No allocations found for the selected filter.
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
}
