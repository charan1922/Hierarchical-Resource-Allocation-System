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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconSearch,
  IconFilter,
  IconDownload,
  IconCalendar,
} from "@tabler/icons-react";
import { useState } from "react";

// Mock search data
const mockSearchResults = [
  {
    id: "1",
    type: "allocation",
    title: "Q4 2024 Budget Allocation - North Region",
    description:
      "Quarterly budget allocation of ₹2.5Cr for North Region operations",
    relevance: 95,
    lastModified: "2 hours ago",
    category: "Financial Resources",
  },
  {
    id: "2",
    type: "user",
    title: "Regional Manager North",
    description:
      "User profile for North Region Manager with allocation approval permissions",
    relevance: 88,
    lastModified: "1 day ago",
    category: "User Management",
  },
  {
    id: "3",
    type: "performance",
    title: "North Region Performance Report",
    description: "Latest performance metrics showing 92.5% utilization rate",
    relevance: 82,
    lastModified: "3 hours ago",
    category: "Performance Monitoring",
  },
  {
    id: "4",
    type: "reallocation",
    title: "Emergency Infrastructure Reallocation",
    description: "Urgent reallocation request for disaster relief funding",
    relevance: 78,
    lastModified: "5 hours ago",
    category: "Emergency Response",
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "allocation":
      return "bg-blue-100 text-blue-800";
    case "reallocation":
      return "bg-orange-100 text-orange-800";
    case "user":
      return "bg-green-100 text-green-800";
    case "performance":
      return "bg-purple-100 text-purple-800";
    case "audit":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getRelevanceColor = (relevance: number) => {
  if (relevance >= 90) return "text-green-600";
  if (relevance >= 75) return "text-blue-600";
  if (relevance >= 60) return "text-yellow-600";
  return "text-gray-600";
};

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [searchResults, setSearchResults] = useState(mockSearchResults);

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Search" },
  ];

  const handleSearch = () => {
    // In a real app, this would make an API call
    console.log("Searching for:", searchTerm, "Type:", searchType);
  };

  const filteredResults =
    searchType === "all"
      ? searchResults
      : searchResults.filter((result) => result.type === searchType);

  return (
    <PageLayout title="Search" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Search Interface */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search allocations, users, performance data, and more..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                  </div>
                </div>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="allocation">Allocations</SelectItem>
                    <SelectItem value="reallocation">Reallocations</SelectItem>
                    <SelectItem value="user">Users</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="audit">Audit Logs</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleSearch}>
                  <IconSearch className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <IconFilter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
                <Button variant="outline" size="sm">
                  <IconCalendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
                <Button variant="outline" size="sm">
                  <IconDownload className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Stats */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {filteredResults.length} results found
            {searchTerm && ` for "${searchTerm}"`}
          </div>
          <div className="text-sm text-muted-foreground">
            Search completed in 0.12 seconds
          </div>
        </div>

        {/* Search Results */}
        <div className="space-y-4">
          {filteredResults.map((result) => (
            <Card
              key={result.id}
              className="hover:shadow-md transition-all cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getTypeColor(result.type)}>
                        {result.type}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getRelevanceColor(result.relevance)}
                      >
                        {result.relevance}% match
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">
                      {result.title}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {result.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Category: {result.category}</span>
                      <span>Modified: {result.lastModified}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <IconSearch className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <div className="text-muted-foreground">
                No results found. Try different search terms or adjust your
                filters.
              </div>
            </CardContent>
          </Card>
        )}

        {/* Suggested Searches */}
        <Card>
          <CardHeader>
            <CardTitle>Suggested Searches</CardTitle>
            <CardDescription>
              Common searches that might help you find what you're looking for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                "North Region allocations",
                "Budget performance Q4",
                "Emergency reallocations",
                "User permissions",
                "Audit logs today",
              ].map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
