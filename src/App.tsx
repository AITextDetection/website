import React, { useEffect, useState } from "react";
import { useCheckScore } from "./hooks/useData";
import Header from "./components/Header";
import TextForm from "./components/TextForm";
import ScoreTabs from "./components/ScoreTabs";

function App() {
  const [text, setText] = useState("");
  const [isDark, setIsDark] = useState(false);
  const { data, checkScore, loading, error } = useCheckScore();

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
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-gray-400 dark:bg-gray-400 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-gray-300 dark:bg-gray-300 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gray-500 dark:bg-gray-500 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <Header isDark={isDark} setIsDark={setIsDark} />

      <main className="relative max-w-4xl mx-auto px-4 py-6">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-gray-200 via-white to-gray-300 animate-gradient leading-tight">
            Detect AI-Generated Content
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Advanced analysis to identify AI-written text with precision
          </p>
        </div>

        <TextForm
          text={text}
          setText={setText}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        {error && (
          <div className="text-center text-red-700">Something went wrong</div>
        )}

        {data && !loading && (
          <div className="mt-16 animate-fade-in">
            <ScoreTabs data={data} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
