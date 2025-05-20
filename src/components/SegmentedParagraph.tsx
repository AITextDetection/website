import { useState } from "react";
import { Legend } from "./Legend";

interface SentenceData {
  sentence: string;
  score: number;
}

interface Props {
  data: SentenceData[];
}

const getHighlightByScore = (score: number): string => {
  if (score > 90)
    return "bg-red-500 text-red-800 dark:bg-red-800 dark:text-red-100"; 
  if (score > 70)
    return "bg-red-300 text-red-800 dark:bg-red-700 dark:text-red-100";
  if (score > 50)
    return "bg-orange-300 text-orange-800 dark:bg-orange-700 dark:text-orange-100"; 
  if (score > 30)
    return "bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100";
    return "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100"; 
};

const SegmentedParagraph = ({ data }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6 mt-8 relative">
      <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-100">
        AI Detection Confidence
      </h3>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        The paragraph below is colored based on how likely each sentence is to
        be AI-generated.
      </p>
      <Legend />
      <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-white/10 relative">
        <p className="leading-relaxed text-gray-900 dark:text-gray-100">
          {data.map((item, index) => (
            <span
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              tabIndex={0}
              className={`rounded-full px-2 mr-1 transition-all duration-300 relative cursor-pointer ${getHighlightByScore(
                item.score
              )}`}
            >
              {item.sentence + " "}

              {/* Tooltip */}
              {hoveredIndex === index && (
                <div
                  className="absolute z-10 w-44 p-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-lg
                    -translate-x-1/2 left-1/2 top-full mt-2
                    pointer-events-none
                    select-none
                    whitespace-normal
                    font-semibold
                    border border-gray-300 dark:border-gray-700
                    transition-opacity duration-200 opacity-100"
                >
                  AI Probability:{" "}
                  <span className="font-bold">{item.score.toFixed(2)}%</span>
                </div>
              )}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default SegmentedParagraph;
