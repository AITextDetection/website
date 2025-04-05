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
      const sentences = splitIntoTwoSentences(text);
      const results = await Promise.all(
        sentences.map(async (sentence) => {
          return {
            score: (await handleScoreApi(sentence))?.score,
            len: sentence.length,
            sentence: sentence,
          };
        })
      );
      setData(results);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
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

export const splitIntoTwoSentences = (text: string): string[] => {
  const sentences =
    text
      .match(/[^.!?]+[.!?]?/g) // Split by sentence-ending punctuation
      ?.map((s) => s.trim())
      .filter(Boolean) || [];

  const result: string[] = [];

  for (let i = 0; i < sentences.length; i += 2) {
    const part = [sentences[i], sentences[i + 1]].filter(Boolean).join(" ");
    result.push(part);
  }

  return result;
};
