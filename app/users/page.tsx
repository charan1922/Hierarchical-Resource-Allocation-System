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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconMail,
  IconPhone,
  IconShield,
  IconUser,
} from "@tabler/icons-react";

const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@projectb.com",
    role: "Administrator",
    unit: "National Headquarters",
    status: "active",
    lastLogin: "2 hours ago",
    permissions: ["all"],
  },
  {
    id: "2",
    name: "Regional Manager North",
    email: "north.manager@projectb.com",
    role: "Regional Manager",
    unit: "North Region",
    status: "active",
    lastLogin: "5 hours ago",
    permissions: ["view_allocations", "create_allocations", "view_performance"],
  },
  {
    id: "3",
    name: "Finance Director",
    email: "finance@projectb.com",
    role: "Finance Director",
    unit: "National Headquarters",
    status: "active",
    lastLogin: "1 day ago",
    permissions: [
      "view_allocations",
      "approve_allocations",
      "view_audit",
      "export_reports",
    ],
  },
  {
    id: "4",
    name: "State Coordinator",
    email: "delhi.coord@projectb.com",
    role: "State Coordinator",
    unit: "Delhi State",
    status: "inactive",
    lastLogin: "1 week ago",
    permissions: ["view_allocations", "view_performance"],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case "Administrator":
      return "bg-purple-100 text-purple-800";
    case "Regional Manager":
      return "bg-blue-100 text-blue-800";
    case "Finance Director":
      return "bg-green-100 text-green-800";
    case "State Coordinator":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function UsersPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "User Management" },
  ];

  return (
    <PageLayout title="User Management" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button>
              <IconPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
            <Button variant="outline">Import Users</Button>
          </div>
          <div className="text-sm text-muted-foreground">
            {mockUsers.length} total users
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockUsers.map((user) => (
            <Card key={user.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src={`/avatars/${user.id}.jpg`} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </div>
                    <CardDescription>{user.unit}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <IconMail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconUser className="h-4 w-4 text-muted-foreground" />
                    <span>Last login: {user.lastLogin}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Permissions</div>
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.map((permission, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {permission === "all"
                          ? "All Permissions"
                          : permission.replace("_", " ")}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <Button size="sm" variant="outline">
                    <IconEdit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <IconShield className="h-3 w-3 mr-1" />
                    Permissions
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
      </div>
    </PageLayout>
  );
}
