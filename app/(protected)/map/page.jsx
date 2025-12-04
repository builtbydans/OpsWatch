"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import DriverList from "@/components/Map/DriverList";

const Map = dynamic(() => import("@/components/Map/map"), {
  ssr: false,
});

export default function LiveMap() {
  const [selectedDriver, setSelectedDriver] = useState(null);
  return (
    <div className="w-full h-[750px] flex gap-3">
      <Map selectedDriver={selectedDriver} />
      <div className="w-100">
        <DriverList onSelectDriver={setSelectedDriver} />
      </div>
    </div>
  );
}
