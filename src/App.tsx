import React, { useState, useEffect } from "react";
import {
  Bot,
  Loader2,
  Brain,
  FileText,
  Sun,
  Moon,
} from "lucide-react";
import { useCheckScore } from "./hooks/useData";

function App() {
  const [text, setText] = useState("");
  const [isDark, setIsDark] = useState(false);

  const { data,checkScore,loading } = useCheckScore();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await checkScore(text);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-gray-400 dark:bg-gray-400 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-gray-300 dark:bg-gray-300 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gray-500 dark:bg-gray-500 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-500/30 rounded-full blur-lg"></div>
                <Bot className="w-8 h-8 text-gray-700 dark:text-gray-200 relative" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-gray-200 via-white to-gray-300">
                AI Text Detector
              </span>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-200" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-6xl font-bold mb-4 text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-gray-200 via-white to-gray-300 animate-gradient leading-tight">
            Detect AI-Generated Content
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Advanced analysis to identify AI-written text with precision
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-500 dark:via-gray-400 dark:to-gray-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200 dark:border-white/10 transition-all duration-300">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here for analysis..."
                className="w-full h-48 bg-transparent border-0 focus:ring-0 resize-none placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-200 text-lg"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !text.trim()}
            className={`relative w-full group ${
              loading || !text.trim()
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-500 dark:via-gray-400 dark:to-gray-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div
              className={`relative px-8 py-4 bg-white dark:bg-gray-900 rounded-lg leading-none flex items-center justify-center`}
            >
              {loading ? (
                <span className="flex items-center justify-center text-gray-700 dark:text-gray-200">
                  <Loader2 className="animate-spin mr-2" />
                  Analyzing...
                </span>
              ) : (
                <span className="text-gray-700 dark:text-gray-200 font-medium">
                  Analyze Text
                </span>
              )}
            </div>
          </button>
        </form>

        {/* Results Section */}
        {data && !loading && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            {[
              {
                title: "AI Probability",
                value: `${data.score.toFixed(1)}%`,
                icon: Brain,
              },
              {
                title: "Word Count",
                value: text.length,
                icon: FileText,
              },
            ].map((stat, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-500 dark:to-gray-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-8 border border-gray-200 dark:border-white/10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 rounded-xl bg-gray-100/50 dark:bg-gray-700/50 group-hover:bg-gray-200/50 dark:group-hover:bg-gray-700/70 transition-colors duration-300">
                      <stat.icon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-200">
                      {stat.title}
                    </h3>
                  </div>
                  <div className="text-5xl font-bold text-gray-900 dark:text-gray-200">
                    {stat.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
