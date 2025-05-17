import { Bot, Sun, Moon } from "lucide-react";

export default function Header({
  isDark,
  setIsDark,
}: {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
}) {
  return (
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
  );
}
