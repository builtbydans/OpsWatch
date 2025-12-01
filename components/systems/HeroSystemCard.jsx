"use client";

import { Button } from "@/components/ui/button";

console.log("HERO RUNNING ON CLIENT");

const HeroSystemCard = ({
  name,
  primaryMetric,
  status,
  submetrics,
  updatedAt,
}) => {
  return (
    <div className="p-6 rounded-xl border bg-neutral-900 text-white h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Systems Overview - {name}</h2>
        <span className={`flex justify-between items-start ${status}`}>
          {status}
        </span>
      </div>

      {/* Primary metric */}
      <div className="text-8xl font-bold mt-4">{primaryMetric}</div>

      {/* Submetrics grid */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {submetrics.map((m) => (
          <div key={m.label} className="flex flex-col text-sm">
            <span className="text-neutral-400">{m.label}</span>
            <span className="text-neutral-200 font-medium">{m.value}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={() => alert("Are you sure?")}
        variant="outline"
        className="cursor-pointer"
      >
        FTL Jump Authorisation
      </Button>

      {/* Footer */}
      <div className="text-xs text-neutral-500 mt-6">
        Synchronised: {new Date(updatedAt).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default HeroSystemCard;
