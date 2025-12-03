"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import ThemeToggle from "@/components/ThemeToggle";
import LogoutButton from "../auth/LogoutButton";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import { useUser } from "@/app/providers/UserProvider";

export default function GlobalTopBar() {
  const { user } = useUser();
  const firstName = user?.full_name?.split(" ")[0] ?? "User";

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-5" />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Welcome back, {firstName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <p className="text-muted">No new notifications</p>
      </div>

      <div className="flex items-center gap-4">
        <LogoutButton />
        <ThemeToggle />
      </div>
    </header>
  );
}
