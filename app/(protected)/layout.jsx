// app/(protected)/layout.jsx

import { redirect } from "next/navigation";
import { createServerClient } from "@/supabase/server";
import { UserProvider } from "@/app/providers/UserProvider";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import GlobalTopBar from "@/components/dashboard/GlobalTopBar";

export default async function ProtectedLayout({ children }) {
  // ---------- AUTH ----------
  const supabase = await createServerClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) redirect("/login");

  // ---------- PROFILE ----------
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authUser.id)
    .single();

  const fullUser = { ...authUser, ...profile };

  return (
    <UserProvider initialUser={fullUser}>
      <SidebarProvider>
        {/* LEFT SIDEBAR */}
        <AppSidebar />

        {/* RIGHT CONTENT AREA */}
        <SidebarInset>
          {/* GLOBAL TOP HEADER */}
          <GlobalTopBar />

          {/* ROUTE CONTENT */}
          <main className="flex-1 p-4 overflow-y-auto">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
}
