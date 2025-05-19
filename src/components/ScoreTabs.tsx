import { useState } from "react";
import SegmentedParagraph from "./SegmentedParagraph";
import ScoreBreakdown from "./ScoreBreakdown";

type SentenceData = {
  sentence: string;
  score: number;
  len: number;
};

interface ScoreTabsProps {
  data: SentenceData[];
}

const ScoreTabs = ({ data }: ScoreTabsProps) => {
  const [activeTab, setActiveTab] = useState<"highlight" | "breakdown">(
    "highlight"
  );

  return (
    <div className="mt-16">
      {/* Tabs */}
      <div className="flex justify-center space-x-8 mb-6">
        {[
          { key: "highlight", label: "Highlighted View" },
          { key: "breakdown", label: "Detailed View" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-6 py-3 rounded-full font-medium text-sm sm:text-base shadow-sm transition-all duration-200 ${
              activeTab === tab.key
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "highlight" ? (
        <SegmentedParagraph data={data} />
      ) : (
        <ScoreBreakdown data={data} />
      )}
    </div>
  );
};

export default ScoreTabs;
