// Counter.jsx
const Counter = ({ counter, onIncrement }) => {
  return (
    <div className="flex gap-3">
      <p className="text-2xl">{counter.value}</p>
      <button
        className="cursor-pointer bg-red-300 p-2 mb-3"
        onClick={() => onIncrement(counter)}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
