"use client";

import { useState } from "react";
import OnlineDrivers from "@/components/state/OnlineDrivers";
import OfflineDrivers from "@/components/state/OfflineDrivers";
import Counter from "@/components/state/Counter";
import React from "react";

const fakeDrivers = [
  {
    id: 1,
    name: "Ali Khan",
    status: "online",
    vehicle: "Toyota Prius",
    lat: 51.509,
    lng: -0.118,
  },
  {
    id: 2,
    name: "Sarah Malik",
    status: "offline",
    vehicle: "VW Golf",
    lat: 51.523,
    lng: -0.08,
  },
  {
    id: 3,
    name: "Mohammed Yousuf",
    status: "online",
    vehicle: "Honda Civic",
    lat: 51.495,
    lng: -0.142,
  },
];

const State = () => {
  const [drivers, setDrivers] = useState(fakeDrivers);
  const [counters, setCounters] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
  ]);

  const handleSelectDriver = (driver) => {
    const updated = drivers.map((d) => {
      if (d.id !== driver.id) {
        return d;
      } else {
        return {
          ...d,
          status: d.status === "online" ? "offline" : "online",
        };
      }
    });
    setDrivers(updated);
  };

  const handleIncrement = (id) => {
    const updated = counters.map((c) => {
      if (c.id !== id.id) {
        return c;
      } else {
        return {
          ...c,
          value: c.value + 1,
        };
      }
    });
    setCounters(updated);
  };

  return (
    <div>
      <OnlineDrivers onSelectDriver={handleSelectDriver} data={drivers} />
      <OfflineDrivers onSelectDriver={handleSelectDriver} data={drivers} />
      <div>
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            counter={counter}
            onIncrement={handleIncrement}
          />
        ))}
      </div>
    </div>
  );
};

export default State;
