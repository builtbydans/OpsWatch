import React from "react";

const SecondarySystemCard = ({ name, value, status, updatedAt }) => {
  return (
    <div className="p-6 rounded-xl border bg-neutral-900 text-white h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{name}</h2>
        <span className={`flex justify-between items-start ${status}`}>
          {status}
        </span>
      </div>

      {/* Primary metric */}
      <div className="text-8xl font-bold mt-4">{value}</div>

      {/* Footer */}
      <div className="text-xs text-neutral-500 mt-6">
        Last updated: {new Date(updatedAt).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default SecondarySystemCard;
