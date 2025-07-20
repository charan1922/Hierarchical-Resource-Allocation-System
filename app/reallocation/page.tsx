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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ArrowRight, Send, Save, RefreshCw } from "lucide-react";
import { useState } from "react";

// Mock data for reallocation requests
const mockReallocations = [
  {
    id: "REA-001",
    title: "Emergency Fund Reallocation",
    fromUnit: "South Region Reserve",
    toUnit: "North Region Emergency",
    resourceType: "Financial Resources",
    amount: 5000000,
    reason: "Emergency disaster relief funding required",
    status: "pending_approval",
    priority: "urgent",
    requestedBy: "Regional Director",
    requestDate: "2024-01-22",
    justification:
      "Natural disaster in north region requires immediate financial support for relief operations and infrastructure repairs.",
    approver: "National Headquarters",
    estimatedImpact: "High positive impact on disaster response capabilities",
  },
  {
    id: "REA-002",
    title: "IT Equipment Redistribution",
    fromUnit: "Delhi IT Pool",
    toUnit: "Punjab State Office",
    resourceType: "Technology Assets",
    amount: 50,
    reason: "Underutilized equipment in Delhi, high demand in Punjab",
    status: "approved",
    priority: "medium",
    requestedBy: "IT Manager",
    requestDate: "2024-01-20",
    justification:
      "Delhi office has surplus IT equipment while Punjab office has critical shortage affecting productivity.",
    approver: "Regional IT Director",
    estimatedImpact: "Medium positive impact on operational efficiency",
  },
  {
    id: "REA-003",
    title: "Workforce Rebalancing",
    fromUnit: "Karnataka Field Office",
    toUnit: "Tamil Nadu Expansion",
    resourceType: "Human Resources",
    amount: 15,
    reason: "Support new expansion project",
    status: "under_review",
    priority: "high",
    requestedBy: "HR Director",
    requestDate: "2024-01-18",
    justification:
      "New expansion project in Tamil Nadu requires experienced personnel. Karnataka office can spare resources without impacting operations.",
    approver: "HR Committee",
    estimatedImpact: "High positive impact on expansion timeline",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "pending_approval":
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

export default function ReallocationPage() {
  const [selectedTab, setSelectedTab] = useState("requests");
  const [formData, setFormData] = useState({
    title: "",
    fromUnit: "",
    toUnit: "",
    resourceType: "",
    amount: "",
    reason: "",
    justification: "",
    priority: "",
  });

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Manual Reallocation" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting reallocation request:", formData);
    // Reset form
    setFormData({
      title: "",
      fromUnit: "",
      toUnit: "",
      resourceType: "",
      amount: "",
      reason: "",
      justification: "",
      priority: "",
    });
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

  return (
    <PageLayout title="Manual Reallocation" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="requests">Reallocation Requests</TabsTrigger>
            <TabsTrigger value="create">Create New Request</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            {/* Action Bar */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button onClick={() => setSelectedTab("create")}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Reallocation
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                {mockReallocations.length} total requests
              </div>
            </div>

            {/* Reallocation Requests List */}
            <div className="space-y-4">
              {mockReallocations.map((reallocation) => (
                <Card key={reallocation.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">
                            {reallocation.title}
                          </CardTitle>
                          <Badge variant="outline">{reallocation.id}</Badge>
                        </div>
                        <CardDescription>{reallocation.reason}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge
                          className={getPriorityColor(reallocation.priority)}
                        >
                          {reallocation.priority}
                        </Badge>
                        <Badge className={getStatusColor(reallocation.status)}>
                          {reallocation.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Reallocation Flow */}
                    <div className="flex items-center gap-4 text-sm bg-gray-50 p-3 rounded-lg">
                      <div className="flex-1 text-center">
                        <div className="font-medium">
                          {reallocation.fromUnit}
                        </div>
                        <div className="text-muted-foreground">From</div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1 text-center">
                        <div className="font-medium">{reallocation.toUnit}</div>
                        <div className="text-muted-foreground">To</div>
                      </div>
                    </div>

                    {/* Resource Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">
                          Resource Type
                        </div>
                        <div className="font-medium">
                          {reallocation.resourceType}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Amount</div>
                        <div className="font-semibold text-lg">
                          {formatAmount(
                            reallocation.amount,
                            reallocation.resourceType
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          Requested By
                        </div>
                        <div className="font-medium">
                          {reallocation.requestedBy}
                        </div>
                      </div>
                    </div>

                    {/* Justification */}
                    <div className="text-sm">
                      <div className="text-muted-foreground mb-1">
                        Justification
                      </div>
                      <div className="bg-gray-50 p-3 rounded text-sm">
                        {reallocation.justification}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">
                          Request Date
                        </div>
                        <div className="font-medium">
                          {reallocation.requestDate}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Approver</div>
                        <div className="font-medium">
                          {reallocation.approver}
                        </div>
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="text-muted-foreground">
                        Estimated Impact
                      </div>
                      <div className="font-medium">
                        {reallocation.estimatedImpact}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      {reallocation.status === "pending_approval" && (
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
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Reallocation Request</CardTitle>
                <CardDescription>
                  Submit a new request to reallocate resources between
                  organizational units
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Request Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter request title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority *</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) =>
                        handleInputChange("priority", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromUnit">From Unit *</Label>
                    <Select
                      value={formData.fromUnit}
                      onValueChange={(value) =>
                        handleInputChange("fromUnit", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select source unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="national">
                          National Headquarters
                        </SelectItem>
                        <SelectItem value="north">North Region</SelectItem>
                        <SelectItem value="south">South Region</SelectItem>
                        <SelectItem value="delhi">Delhi State</SelectItem>
                        <SelectItem value="punjab">Punjab State</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="toUnit">To Unit *</Label>
                    <Select
                      value={formData.toUnit}
                      onValueChange={(value) =>
                        handleInputChange("toUnit", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="national">
                          National Headquarters
                        </SelectItem>
                        <SelectItem value="north">North Region</SelectItem>
                        <SelectItem value="south">South Region</SelectItem>
                        <SelectItem value="delhi">Delhi State</SelectItem>
                        <SelectItem value="punjab">Punjab State</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="resourceType">Resource Type *</Label>
                    <Select
                      value={formData.resourceType}
                      onValueChange={(value) =>
                        handleInputChange("resourceType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select resource type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="financial">
                          Financial Resources
                        </SelectItem>
                        <SelectItem value="human">Human Resources</SelectItem>
                        <SelectItem value="infrastructure">
                          Infrastructure
                        </SelectItem>
                        <SelectItem value="technology">
                          Technology Assets
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount *</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={formData.amount}
                      onChange={(e) =>
                        handleInputChange("amount", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Reallocation *</Label>
                  <Input
                    id="reason"
                    placeholder="Brief reason for reallocation"
                    value={formData.reason}
                    onChange={(e) =>
                      handleInputChange("reason", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="justification">
                    Detailed Justification *
                  </Label>
                  <Textarea
                    id="justification"
                    placeholder="Provide detailed justification for this reallocation request..."
                    rows={4}
                    value={formData.justification}
                    onChange={(e) =>
                      handleInputChange("justification", e.target.value)
                    }
                  />
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button onClick={handleSubmit}>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Request
                  </Button>
                  <Button variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTab("requests")}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
