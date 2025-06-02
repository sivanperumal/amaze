import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios(`${url}`);
        setData(response.data.products);
        setLoading(false);
      } catch (e: unknown) {
        setError(e);
        setLoading(false);
      }
    };
    getData();
  }, [url]);

  return { data, loading, error };
};
