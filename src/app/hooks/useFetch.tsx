import { useState, useEffect } from "react";
import { delay } from "../helpers/delay";

/**
 * A custom React hook that fetches data from multiple URLs and manages loading, error, and data states.
 * 
 * The hook uses the `fetch` API to retrieve data from a list of URLs provided as an argument. 
 * It supports asynchronous fetching of multiple resources in parallel, handling any potential errors, 
 * and manages the loading state during the fetch process.
 * 
 * @template T - The type of data expected from the fetch operation.
 * 
 * @param {string[]} urls - An array of URLs to fetch data from. The hook will perform a fetch request to each URL.
 * 
 * @returns {object} The hook returns an object with the following properties:
 * @returns {T[] | null} data - The fetched data from all URLs, or `null` if no data has been fetched yet.
 * @returns {boolean} loading - A boolean indicating whether the fetch operation is in progress.
 * @returns {string | null} error - A string with an error message if an error occurs during fetching, or `null` if no error.
 * 
 * @example
 * const { data, loading, error } = useFetch<MyDataType>(['/api/data1', '/api/data2']);
 * 
 * if (loading) {
 *   // Show a loading spinner
 * } else if (error) {
 *   // Show an error message
 * } else {
 *   // Render the fetched data
 * }
 */
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
        await delay(3000);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
