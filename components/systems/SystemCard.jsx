const SystemCard = ({ name, value, status, updatedAt }) => {
  // hint: define a color map for statuses
  const statusColors = {
    Stable: "bg-green-500",
    Alert: "bg-yellow-500",
    Danger: "bg-red-500",
  };

  return (
    <div className="bg-[#0f0f0f] border border-neutral-800 rounded-lg p-4 flex flex-col gap-4">
      {/* Title */}
      <div className="text-sm font-medium text-neutral-300">{name}</div>

      {/* Big value */}
      <div className="text-2xl font-semibold text-white">{value}</div>

      {/* Footer: status + updated time */}
      <div className="flex items-center justify-between text-neutral-500 text-xs">
        {/* Status indicator */}
        <span className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${statusColors[status]}`}
          ></span>
          {status}
        </span>

        {/* Timestamp */}
        <span>{new Date(updatedAt).toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default SystemCard;
