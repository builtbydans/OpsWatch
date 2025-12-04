import { redirect } from "next/navigation";
import { createServerClient } from "@/supabase/server";
import { UserProvider } from "@/app/providers/UserProvider";
import ClientSidebarLayout from "@/components/ClientSidebarLayout";

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
      <ClientSidebarLayout>{children}</ClientSidebarLayout>
    </UserProvider>
  );
}
