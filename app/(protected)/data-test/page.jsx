// THIS PAGE IS TO DATA COMING IN FROM SUPABASE, NEEDS TO BE DELETED AFTER. DO NOT PUSH.

"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function Page() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    async function run() {
      const { data: userData } = await supabase.auth.getUser();
      console.log("USER:", userData);

      const { data, error } = await supabase.from("profiles").select("*");
      console.log("profiles:", data, error);
    }

    run();
  }, []);

  return <h1>Debugging…</h1>;
}
