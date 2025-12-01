import SystemCard from "@/components/systems/SystemCard";
import HeroSystemCard from "@/components/systems/HeroSystemCard";
import SecondarySystemCard from "@/components/systems/SecondarySystemCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const heroSystem = {
  name: "FTL Drive",
  primaryMetric: "89%",
  status: "Charging",
  submetrics: [
    { label: "Heat", value: "Moderate" },
    { label: "Jump Readiness", value: "76%" },
    { label: "Element Zero Flow", value: "Stable" },
    { label: "Reactor Load", value: "89%" },
    { label: "Nearest FTL Star System", value: "Horsehead Nebula" },
    { label: "Geth Activity Measured", value: "Low" },
    { label: "Nearest Available Port", value: "Arakos C2" },
    { label: "Nearest Citadel Vessel", value: "Vikarosh Class II Turian" },
  ],
  updatedAt: new Date().toLocaleTimeString(),
};

const systems = [
  {
    id: 1,
    name: "Element Zero Reserves",
    value: "42%",
    status: "Alert",
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Reactor Output",
    value: "89%",
    status: "Stable",
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Star System",
    value: "Hades Nebula",
    status: "Danger",
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Shield Recharge Rate",
    value: "1% p.m",
    status: "Danger",
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "Impact Event Detection",
    value: "78%",
    status: "Alert",
    updatedAt: new Date(),
  },
  {
    id: 6,
    name: "Oxygen Levels",
    value: "99%",
    status: "Stable",
    updatedAt: new Date(),
  },
  {
    id: 7,
    name: "Geth Threat Level",
    value: "High",
    status: "Danger",
    updatedAt: new Date(),
  },
  {
    id: 8,
    name: "Reaper-class Signal Detection",
    value: "0",
    status: "Stable",
    updatedAt: new Date(),
  },
  {
    id: 9,
    name: "Hull Integrity",
    value: "19%",
    status: "Danger",
    updatedAt: new Date(),
  },
];

const SystemsOverview = () => {
  return (
    <div className="p-5 space-y-6">
      {/* Back link */}
      <Link
        href="/"
        className="flex items-center text-neutral-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>
      {/* SECTION 1: Hero + 3 cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* HERO (spans 2 columns on desktop) */}
        <div className="lg:col-span-2">
          <HeroSystemCard {...heroSystem} />
        </div>

        {/* First 3 small cards stack on the right */}
        <div className="flex flex-col gap-6">
          {systems.slice(0, 1).map((s) => (
            <SecondarySystemCard key={s.id} {...s} />
          ))}
        </div>
      </div>

      {/* SECTION 2: Remaining cards in a full 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems.slice(1).map((s) => (
          <SystemCard key={s.id} {...s} />
        ))}
      </div>
    </div>
  );
};

export default SystemsOverview;
