'use client'

import {
  LayoutDashboard,
  Video,
  Layers,
  Clock,
  Monitor,
  Users,
  Settings,
  LogOut,
  ArrowLeftIcon,
  ArrowRightIcon,
  LucideIcon
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import React from "react"

// Menu items for Digital Signage App
const menuGroups = [
  {
    label: "NeoSync",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Content",
    items: [
      {
        title: "Media Library",
        url: "/media",
        icon: Video,
      },
      {
        title: "Playlists",
        url: "/playlists",
        icon: Layers,
      },
      {
        title: "Schedules",
        url: "/schedules",
        icon: Clock,
      },
    ],
  },
  {
    label: "Devices",
    items: [
      {
        title: "Screens",
        url: "/screens",
        icon: Monitor,
      },
    ],
  },
  {
    label: "Admin",
    items: [
      {
        title: "Users",
        url: "/users",
        icon: Users,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
      },
      {
        title: "Sign Out",
        url: "/sign-out",
        icon: LogOut,
      },
    ],
  },
]


export function GradientIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="gradient-stroke" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor="#FF0F0F" />
        </linearGradient>
      </defs>
      <Icon stroke="url(#gradient-stroke)" strokeWidth="1.5" width={24} height={24} />
    </svg>
  )
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant='floating' side="left">
      <SidebarContent>
        {menuGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-2"> 
                        <GradientIcon Icon={item.icon} />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
