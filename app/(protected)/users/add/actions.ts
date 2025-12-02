"use server";

import { createServerClient } from "@/supabase/server";

export async function addDriver(formData: FormData) {
  const first = formData.get("first_name") as string;
  const last = formData.get("last_name") as string;
  const baseId = formData.get("base_id") as string;

  if (!first || !last || !baseId) {
    throw new Error("Missing required fields");
  }

  const supabase = await createServerClient();

  const { error } = await supabase.from("drivers").insert({
    first_name: first,
    last_name: last,
    base_id: baseId,
  });

  if (error) {
    console.error("Failed to create driver:", error);
    throw new Error("Driver creation failed");
  }

  // Later: redirect or revalidate
}
