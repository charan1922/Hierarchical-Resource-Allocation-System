"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconClock, IconFilter } from "@tabler/icons-react";

interface ActivityItem {
  id: string;
  type: "allocation" | "reallocation" | "approval" | "audit";
  title: string;
  description: string;
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  status: "completed" | "pending" | "rejected";
  amount?: number;
  link?: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  onFilter: (type: string) => void;
}

export function ActivityFeed({ activities, onFilter }: ActivityFeedProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    const iconClass = "h-8 w-8 rounded-full p-1.5";
    switch (type) {
      case "allocation":
        return (
          <div className={`${iconClass} bg-blue-100 text-blue-600`}>💰</div>
        );
      case "reallocation":
        return (
          <div className={`${iconClass} bg-purple-100 text-purple-600`}>🔄</div>
        );
      case "approval":
        return (
          <div className={`${iconClass} bg-green-100 text-green-600`}>✅</div>
        );
      case "audit":
        return (
          <div className={`${iconClass} bg-gray-100 text-gray-600`}>📋</div>
        );
      default:
        return (
          <div className={`${iconClass} bg-gray-100 text-gray-600`}>📄</div>
        );
    }
  };

  return (
    <section className="px-4 lg:px-6 py-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <IconClock className="h-5 w-5" />
              Activity Feed
            </CardTitle>
            <Button variant="outline" size="sm">
              <IconFilter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="flex gap-4 pb-4 border-b last:border-b-0"
              >
                {/* Activity Icon */}
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-sm">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      {activity.amount && (
                        <p className="text-sm font-medium text-primary">
                          ₹{activity.amount.toLocaleString()}
                        </p>
                      )}
                    </div>
                    {getStatusBadge(activity.status)}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={activity.user.avatar}
                          alt={activity.user.name}
                        />
                        <AvatarFallback className="text-xs">
                          {activity.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {activity.user.name}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </span>
                    </div>

                    {activity.link && (
                      <Button variant="ghost" size="sm" className="text-xs">
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Button variant="outline" className="w-full">
              Load More Activities
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
