import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function TextForm({
  text,
  setText,
  handleSubmit,
  loading,
}: {
  text: string;
  setText: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}) {
  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const count = text.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(count);

    if (count < 40) {
      setError(`Text must be at least 40 words. Currently: ${count}`);
    } else {
      setError("");
    }
  }, [text]);

  const onSubmit = (e: React.FormEvent) => {
    if (wordCount < 40) {
      e.preventDefault();
      return;
    }
    handleSubmit(e);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-500 dark:via-gray-400 dark:to-gray-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200 dark:border-white/10 transition-all duration-300">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here for analysis..."
            className="w-full h-32 bg-transparent border-0 focus:ring-0 resize-none placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-200 text-lg"
            required
          />
        </div>
      </div>

      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || wordCount < 40}
        className={`relative w-full group ${
          loading || wordCount < 40
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-[1.02] active:scale-[0.98]"
        }`}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-500 dark:via-gray-400 dark:to-gray-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative px-8 py-4 bg-white dark:bg-gray-900 rounded-lg leading-none flex items-center justify-center">
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
  );
}
