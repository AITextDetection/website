import axios from "axios";
import { useState } from "react";

export type API_RESPONSE = {
  score: number;
};

export const useCheckScore = () => {
  const [data, setData] = useState<
    | {
        score: number;
        len: number;
        sentence: string;
      }[]
    | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const checkScore = async (text: string) => {
    setLoading(true);
    try {
      const sentences = splitTextByWordLimitAndPunctuation(text);
      const results = await Promise.all(
        sentences.map(async (sentence) => {
          return {
            // score: (await handleScoreApi(sentence))?.score,
            score: parseFloat((Math.random() * 100).toFixed(2)),
            len: sentence.length,
            sentence: sentence,
          };
        })
      );
      setData(results);
    } catch (e) {
      console.error("Something went wrong", e);
      setError("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, checkScore };
};

const handleScoreApi = async (text: string) => {
  const response = await axios.post(
    `http://0.0.0.0:8000/predict`,
    { text },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = response.data as API_RESPONSE;
  return result;
};

export const splitTextByWordLimitAndPunctuation = (
  text: string,
  wordLimit = 256
): string[] => {
  const result: string[] = [];

  const words = text.split(/\s+/); // Split text into words
  let start = 0;

  while (start < words.length) {
    const end = start + wordLimit;

    // Ensure we don't go out of bounds
    if (end >= words.length) {
      result.push(words.slice(start).join(" "));
      break;
    }

    // Scan forward for punctuation (., !, or ?) after wordLimit
    let foundEnd = end;
    for (let i = end; i < words.length; i++) {
      if (/[.!?]$/.test(words[i])) {
        foundEnd = i + 1; // include this word
        break;
      }
    }

    // Join words from start to foundEnd as a segment
    result.push(words.slice(start, foundEnd).join(" "));
    start = foundEnd;
  }

  return result;
};
