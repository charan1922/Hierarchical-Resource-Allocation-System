"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconClock,
  IconUsers,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface KPIData {
  totalAllocation: number;
  utilizationPercent: number;
  underAchievingUnits: number;
  pendingApprovals: number;
}

interface HeroSummaryBannerProps {
  user: { name: string };
  kpiData: KPIData;
  alerts: Array<{
    id: string;
    message: string;
    type: "warning" | "error" | "info";
  }>;
}

export function HeroSummaryBanner({
  user,
  kpiData,
  alerts,
}: HeroSummaryBannerProps) {
  const [animatedValues, setAnimatedValues] = useState({
    totalAllocation: 0,
    utilizationPercent: 0,
    underAchievingUnits: 0,
    pendingApprovals: 0,
  });

  // Animated count-up effect
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;

    const increments = {
      totalAllocation: kpiData.totalAllocation / steps,
      utilizationPercent: kpiData.utilizationPercent / steps,
      underAchievingUnits: kpiData.underAchievingUnits / steps,
      pendingApprovals: kpiData.pendingApprovals / steps,
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setAnimatedValues({
        totalAllocation: Math.min(
          increments.totalAllocation * currentStep,
          kpiData.totalAllocation
        ),
        utilizationPercent: Math.min(
          increments.utilizationPercent * currentStep,
          kpiData.utilizationPercent
        ),
        underAchievingUnits: Math.min(
          increments.underAchievingUnits * currentStep,
          kpiData.underAchievingUnits
        ),
        pendingApprovals: Math.min(
          increments.pendingApprovals * currentStep,
          kpiData.pendingApprovals
        ),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [kpiData]);

  return (
    <section className="px-4 lg:px-6 py-6">
      {/* Personalized Welcome */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground mt-1">
          Here's your resource allocation overview
        </p>
      </div>

      {/* Major Alerts */}
      {alerts.length > 0 && (
        <div className="mb-6 space-y-2">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              variant={alert.type === "error" ? "destructive" : "default"}
            >
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Allocation
            </CardTitle>
            <IconTrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{Math.round(animatedValues.totalAllocation).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization %</CardTitle>
            <IconTrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(animatedValues.utilizationPercent)}%
            </div>
            <p className="text-xs text-muted-foreground">
              <Badge
                variant={
                  kpiData.utilizationPercent > 80 ? "default" : "secondary"
                }
              >
                {kpiData.utilizationPercent > 80
                  ? "On Track"
                  : "Needs Attention"}
              </Badge>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Under-achieving Units
            </CardTitle>
            <IconTrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(animatedValues.underAchievingUnits)}
            </div>
            <p className="text-xs text-muted-foreground">
              Require reallocation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <IconClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(animatedValues.pendingApprovals)}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting your review
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
