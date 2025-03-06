import { useState, useEffect } from "react";

export function useFetch<T>(urls: string[]): {
  data: T[] | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (urls.length === 0) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const responses: T[] = await Promise.all(
          urls.map(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(
                `Error ${response.status}: ${response.statusText}`
              );
            }
            return response.json();
          })
        );

        setData(responses);
      } catch (err) {
        setError(`Błąd podczas ładowania danych: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
