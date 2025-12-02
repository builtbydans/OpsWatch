import { createServerClient } from "@/supabase/server";

export const ProfileProvider = async () => {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("USER IN API ROUTE:", user);

  if (!user) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }
};

export default ProfileProvider;
