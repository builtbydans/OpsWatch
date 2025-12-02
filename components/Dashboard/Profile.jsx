"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/supabase/client";

export default function ProfileWidget() {
  const supabase = createClient();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function load() {
      // 1. get logged-in user (client session)
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 2. fetch profile row
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
    }

    load();
  }, []);

  if (!profile) return <p>Loading…</p>;

  return (
    <div>
      <h2>{profile.full_name}</h2>
    </div>
  );
}
