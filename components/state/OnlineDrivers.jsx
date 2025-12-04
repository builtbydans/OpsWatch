import React from "react";

const OnlineDrivers = ({ onSelectDriver, data }) => {
  return (
    <div className="p-3 text-sm">
      <h3 className="font-semibold mb-2">Online Drivers</h3>

      <ul className="space-y-2">
        {data
          .filter((d) => d.status === "online")
          .map((driver) => (
            <li
              key={driver.id}
              onClick={() => onSelectDriver(driver)}
              className="p-2 rounded bg-zinc-800/50 hover:bg-zinc-700/50 cursor-pointer flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{driver.name}</p>
                <p className="text-xs opacity-70">{driver.vehicle}</p>
              </div>

              <span className="text-xs px-2 py-1 rounded bg-green-600/30 text-green-300">
                {driver.status}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default OnlineDrivers;
