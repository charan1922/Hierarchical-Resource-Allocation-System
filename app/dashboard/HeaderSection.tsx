import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { IconBell } from "@tabler/icons-react";
import React from "react";

interface HeaderSectionProps {
  user: { name: string; email: string; avatar: string };
  orgs: string[];
  currentOrg: string;
  onOrgChange: (org: string) => void;
}

export function HeaderSection({
  user,
  orgs,
  currentOrg,
  onOrgChange,
}: HeaderSectionProps) {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b bg-background">
      <div className="flex items-center gap-4">
        {/* Logo & Branding */}
        <span className="font-bold text-lg">ProjectB</span>
        {/* Organization/Tenant Selector (DropdownMenu) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-2 py-1 rounded bg-muted">{currentOrg}</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {orgs.map((org) => (
              <DropdownMenuItem key={org} onClick={() => onOrgChange(org)}>
                {org}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Hierarchy/Location Selector (multi-step DropdownMenu) */}
        {/* ...existing code or placeholder... */}
      </div>
      <div className="flex items-center gap-4">
        {/* Global Search Bar */}
        <Input placeholder="Search..." className="w-48" />
        {/* Notifications Bell */}
        <button className="relative">
          <IconBell />
          <Badge className="absolute -top-2 -right-2">3</Badge>
        </button>
        {/* User Avatar/Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full overflow-hidden">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
