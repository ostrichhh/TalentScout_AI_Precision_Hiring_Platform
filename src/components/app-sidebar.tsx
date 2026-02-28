"use client"

import * as React from "react"
import {
  LayoutDashboard,
  SearchCode,
  Users,
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
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Zap className="text-primary fill-primary w-6 h-6 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
          <span className="group-data-[collapsible=icon]:hidden bg-gradient-to-r from-black to-primary bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">
            TalentScout AI
          </span>
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
                    className="h-12 px-4 transition-colors hover:bg-black hover:text-white data-[active=true]:bg-black data-[active=true]:text-white"
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
            <SidebarMenuButton className="h-12 px-4 transition-colors hover:bg-black hover:text-white">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
