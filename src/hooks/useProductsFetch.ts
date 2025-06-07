import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { product } from "../interface";

export const useProductsFetch = (url: string) => {
  const [data, setData] = useState<product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios(`${url}`);
        setData(response.data.products);
        setLoading(false);
      } catch (e) {
        const err = e as AxiosError;
        setError(err.message);
        setLoading(false);
      }
    };
    getData();
  }, [url]);

  return { data, loading, error };
};
