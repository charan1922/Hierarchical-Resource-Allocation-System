"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  IconChevronRight,
  IconMapPin,
  IconTrendingUp,
  IconTrendingDown,
} from "@tabler/icons-react";
import { useState } from "react";

interface HierarchyNode {
  id: string;
  name: string;
  level: string;
  allocation: number;
  utilized: number;
  performance: "good" | "warning" | "poor";
  children?: HierarchyNode[];
}

interface HierarchyOverviewProps {
  hierarchyData: HierarchyNode[];
  currentPath: string[];
  onNodeClick: (node: HierarchyNode) => void;
}

export function HierarchyOverview({
  hierarchyData,
  currentPath,
  onNodeClick,
}: HierarchyOverviewProps) {
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) =>
      prev.includes(nodeId)
        ? prev.filter((id) => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "good":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Good
          </Badge>
        );
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Warning
          </Badge>
        );
      case "poor":
        return <Badge variant="destructive">Poor</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const renderNode = (node: HierarchyNode, depth = 0) => {
    const utilizationPercent = Math.round(
      (node.utilized / node.allocation) * 100
    );
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className={`ml-${depth * 4}`}>
        <Card className="mb-2 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleNode(node.id)}
                    className="h-6 w-6 p-0"
                  >
                    <IconChevronRight
                      className={`h-4 w-4 transition-transform ${
                        expandedNodes.includes(node.id) ? "rotate-90" : ""
                      }`}
                    />
                  </Button>
                )}
                <div>
                  <h4 className="font-semibold">{node.name}</h4>
                  <p className="text-sm text-muted-foreground">{node.level}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">
                    ₹{node.allocation.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {utilizationPercent}% utilized
                  </p>
                </div>
                {getPerformanceBadge(node.performance)}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNodeClick(node)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {hasChildren && expandedNodes.includes(node.id) && (
          <div className="ml-4 border-l-2 border-muted pl-4">
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="px-4 lg:px-6 py-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <IconMapPin className="h-5 w-5" />
              Organization Hierarchy
            </CardTitle>

            {/* Breadcrumb Navigation */}
            <Breadcrumb>
              <BreadcrumbList>
                {currentPath.map((item, index) => (
                  <BreadcrumbItem key={index}>
                    {index === currentPath.length - 1 ? (
                      <BreadcrumbPage>{item}</BreadcrumbPage>
                    ) : (
                      <>
                        <button className="hover:underline">{item}</button>
                        <BreadcrumbSeparator />
                      </>
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            {hierarchyData.map((node) => renderNode(node))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
