"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function CrewTable() {
  const [drivers, setDrivers] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from("drivers").select(`
          id,
          first_name,
          last_name
        `);

      if (error) console.error(error);
      setDrivers(data);
    }

    load();
  }, []);

  return (
    <div className="space-y-4">
      {drivers.map((driver) => (
        <div
          key={driver.id}
          className="rounded-lg border p-4 bg-neutral-900 text-white"
        >
          <h2 className="text-lg font-semibold">{driver.first_name}</h2>
          <h2 className="text-lg font-semibold">{driver.last_name}</h2>

          <p>Vehicle: {driver.driver_profiles?.vehicle_type}</p>
          <p>Reg: {driver.driver_profiles?.vehicle_registration}</p>
          <p>Shift: {driver.driver_profiles?.shift_type}</p>

          <span
            className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
              driver.driver_profiles?.is_active ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {driver.driver_profiles?.is_active ? "Active" : "Inactive"}
          </span>
        </div>
      ))}
    </div>
  );
}
