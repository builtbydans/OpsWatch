"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  Settings2,
  SquareTerminal,
  House,
  Map,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/NavMain";
import { NavProjects } from "@/components/dashboard/NavProjects";
import { NavUser } from "@/components/dashboard/NavUser";
import { TeamSwitcher } from "@/components/dashboard/TeamSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  teams: [
    {
      name: "Bermondsey SE1",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Wembley HA9",
      logo: AudioWaveform,
      plan: "Enterprise",
    },
    {
      name: "Rainham RM13",
      logo: AudioWaveform,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: House,
    },
    {
      title: "Live Map",
      url: "/map",
      icon: Map,
    },
    {
      title: "Reports",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "New Report",
          url: "/report",
        },
        {
          title: "Current Reports",
          url: "#",
        },
        {
          title: "Archived Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Systems Overview",
      url: "/systems-overview",
      icon: SquareTerminal,
    },
    {
      title: "User Management",
      url: "",
      icon: SquareTerminal,
      items: [
        {
          title: "Add User",
          url: "/users/add",
        },
      ],
    },
    {
      title: "Crew Manfiest",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Navigation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Event Logs",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Mission Control",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
