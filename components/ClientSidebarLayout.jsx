"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import GlobalTopBar from "@/components/dashboard/GlobalTopBar";

export default function ClientSidebarLayout({ children }) {
  const pathname = usePathname();

  // --- controlled state for the sidebar ---
  const [open, setOpen] = useState(pathname === "/");

  // --- update when route changes, NOT when user toggles ---
  useEffect(() => {
    setOpen(pathname === "/");
  }, [pathname]);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar />
      <SidebarInset>
        <GlobalTopBar />
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
