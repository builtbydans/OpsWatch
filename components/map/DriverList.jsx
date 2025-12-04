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

const DriverList = ({ onSelectDriver }) => {
  return (
    <div className="p-3 text-sm">
      <h3 className="font-semibold mb-2">Active Drivers</h3>

      <ul className="space-y-2">
        {fakeDrivers.map((driver) => (
          <li
            key={driver.id}
            onClick={() => onSelectDriver(driver)}
            className="p-2 rounded bg-zinc-800/50 hover:bg-zinc-700/50 cursor-pointer flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{driver.name}</p>
              <p className="text-xs opacity-70">{driver.vehicle}</p>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded ${
                driver.status === "online"
                  ? "bg-green-600/30 text-green-300"
                  : "bg-red-600/30 text-red-300"
              }`}
            >
              {driver.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriverList;
