import { MessageSquareText, Brain, FileText } from "lucide-react";

export default function ScoreCards({
  data,
  len,
  sentence,
}: {
  data: number;
  len: number;
  sentence: string;
}) {
  return (
    <div className="mt-16 space-y-8 animate-fade-in">
      {/* Sentence Card */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-300 to-purple-400 dark:from-indigo-500 dark:to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-8 border border-gray-200 dark:border-white/10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 rounded-xl bg-gray-100/50 dark:bg-gray-700/50 group-hover:bg-gray-200/50 dark:group-hover:bg-gray-700/70 transition-colors duration-300">
              <MessageSquareText className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Sentence</h3>
          </div>
          <p className="text-lg text-gray-800 dark:text-gray-300">{sentence}</p>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: "AI Probability",
            value: `${data.toFixed(1)}%`,
            icon: Brain,
          },
          {
            title: "Word Count",
            value: len,
            icon: FileText,
          },
        ].map((stat, index) => (
          <div key={index} className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-500 dark:to-gray-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-8 border border-gray-200 dark:border-white/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-gray-100/50 dark:bg-gray-700/50 group-hover:bg-gray-200/50 dark:group-hover:bg-gray-700/70 transition-colors duration-300">
                  <stat.icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                  {stat.title}
                </h3>
              </div>
              <div className="text-5xl font-bold text-gray-900 dark:text-gray-200">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
