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
import {
  IconSearch,
  IconBook,
  IconLifebuoy,
  IconMail,
  IconExternalLink,
} from "@tabler/icons-react";
import { useState } from "react";

const helpCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    description:
      "Learn the basics of the hierarchical resource allocation system",
    articles: [
      "System Overview and Key Concepts",
      "Setting Up Your Organization Hierarchy",
      "Creating Your First Resource Allocation",
      "Understanding Performance Metrics",
    ],
  },
  {
    id: "allocations",
    title: "Resource Allocations",
    description: "Managing and monitoring resource allocations",
    articles: [
      "Creating New Allocations",
      "Approval Workflows and Processes",
      "Tracking Allocation Performance",
      "Budget Management Best Practices",
    ],
  },
  {
    id: "reallocations",
    title: "Manual Reallocations",
    description: "How to request and process resource reallocations",
    articles: [
      "When to Request Reallocation",
      "Reallocation Approval Process",
      "Emergency Reallocation Procedures",
      "Impact Assessment Guidelines",
    ],
  },
  {
    id: "performance",
    title: "Performance Monitoring",
    description: "Understanding and using performance analytics",
    articles: [
      "Key Performance Indicators (KPIs)",
      "Setting Performance Targets",
      "Interpreting Performance Reports",
      "Automated Alert Configuration",
    ],
  },
];

const quickActions = [
  {
    title: "Contact Support",
    description: "Get help from our support team",
    icon: <IconLifebuoy className="h-6 w-6" />,
    action: "mailto:support@projectb.com",
  },
  {
    title: "API Documentation",
    description: "Technical documentation for developers",
    icon: <IconBook className="h-6 w-6" />,
    action: "/api/docs",
  },
  {
    title: "Submit Feedback",
    description: "Share your feedback and suggestions",
    icon: <IconMail className="h-6 w-6" />,
    action: "mailto:feedback@projectb.com",
  },
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Get Help" },
  ];

  return (
    <PageLayout title="Get Help" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold mb-2">
                How can we help you?
              </h2>
              <p className="text-muted-foreground">
                Search our knowledge base or browse categories below
              </p>
            </div>
            <div className="relative max-w-md mx-auto">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-md transition-all"
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">{action.icon}</div>
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Categories */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Help Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helpCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.articles.map((article, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b last:border-b-0"
                      >
                        <span className="text-sm">{article}</span>
                        <IconExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
