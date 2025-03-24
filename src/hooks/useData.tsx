import axios from "axios";
import { useState } from "react";

type API_RESPONSE = {
  score: number;
};

export const useCheckScore = () => {
  const [data, setData] = useState<API_RESPONSE | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const checkScore = async (text: string) => {
    setLoading(true);
    try {
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
      setData(result);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setError("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, checkScore };
};
