const legendItems = [
  { color: "bg-green-200 dark:bg-green-700", label: "0–10% AI Probability" },
  { color: "bg-yellow-200 dark:bg-yellow-600", label: "11–30% AI Probability" },
  { color: "bg-orange-300 dark:bg-orange-700", label: "31–60% AI Probability" },
  { color: "bg-red-300 dark:bg-red-700", label: "61–80% AI Probability" },
  { color: "bg-red-500 dark:bg-red-800", label: "81–100% AI Probability" },
];

export const Legend = () => (
  <div className="flex flex-wrap gap-4 justify-center mt-6 mb-4">
    {legendItems.map((item, index) => (
      <div key={index} className="flex items-center space-x-2">
        <span className={`w-4 h-4 rounded ${item.color}`}></span>
        <span className="text-sm text-gray-800 dark:text-gray-200">
          {item.label}
        </span>
      </div>
    ))}
  </div>
);
