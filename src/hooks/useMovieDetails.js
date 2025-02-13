import { useState, useEffect } from "react";
import { API_KEY } from "../constants";

export function useMovieDetails(selectedId) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something happened with fetchig movie details");
          const data = await res.json();
          setMovie(data);
          setIsLoading(false);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          if (!controller.signal.aborted) {
            setIsLoading(false);
          }
        }
      }
      getMovieDetails();

      return () => controller.abort();
    },
    [selectedId]
  );

  return { movie, isLoading, error };
}
