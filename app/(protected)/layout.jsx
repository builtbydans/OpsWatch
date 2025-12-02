import { redirect } from "next/navigation";
import { createServerClient } from "@/supabase/server";
import { UserProvider } from "../providers/UserProvider";

const ProtectedLayout = async ({ children }) => {
  const supabase = await createServerClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authUser.id)
    .single();

  const fullUser = {
    ...authUser,
    ...profile,
  };

  return <UserProvider initialUser={fullUser}>{children}</UserProvider>;
};

export default ProtectedLayout;
