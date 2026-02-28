"use client"

import * as React from "react"
import {
  LayoutDashboard,
  SearchCode,
  Users,
  Settings,
  FileText,
  BarChart3,
  LogOut,
  Zap
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  {
    title: "Overview",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Analysis",
    label: "Analyze Resume",
    icon: SearchCode,
    href: "/analyze",
  },
  {
    title: "Talent Pool",
    label: "Candidates",
    icon: Users,
    href: "/candidates",
  },
  {
    title: "Reports",
    label: "Hiring Insights",
    icon: BarChart3,
    href: "/reports",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <SidebarHeader className="h-16 flex items-center px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-sidebar-primary">
          <Zap className="fill-current w-6 h-6" />
          <span className="group-data-[collapsible=icon]:hidden">HireFlow AI</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className="h-12 px-4 transition-colors hover:bg-sidebar-accent"
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-12 px-4 transition-colors hover:bg-sidebar-accent">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}