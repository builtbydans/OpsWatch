"use client";

import Profile from "@/components/dashboard/Profile";
import { useUser } from "@/app/providers/UserProvider";

export default function Dashboard() {
  const { user } = useUser();
  const firstName = user?.full_name?.split(" ")[0] ?? "User";

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Bermondsey SE1 Dashboard</h2>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>

      <div className="bg-muted/50 min-h-[200px] rounded-xl p-3">
        <Profile />
      </div>
    </div>
  );
}
