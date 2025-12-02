// app/api/seed-profile/route.js
import { createServerClient } from "@/supabase/server";

export async function GET() {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  await supabase.from("profiles").insert({
    id: user.id,
    full_name: "Danish Shafi",
    role: "admin",
  });

  return Response.json({ success: true });
}
