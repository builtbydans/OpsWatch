import { createServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  return redirect("/login");
}
