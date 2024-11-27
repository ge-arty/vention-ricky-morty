import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { CharacterType } from "../types/character.type";

interface ApiResponse {
  results: CharacterType[];
  info: {
    next: string | null;
  };
}

interface UseFetchReturn {
  characters: CharacterType[];
  error: string | null;
  loading: boolean;
  setCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>;
  resendRequest: () => void;
}

// This hook is used to fetch a list of characters from the "Rick and Morty" API, handle the loading and error states. (Also refetch if it will be needed)
const useFetch = (
  page: number,
  setIsLastPage: React.Dispatch<React.SetStateAction<boolean>>
): UseFetchReturn => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const onFetch = useCallback(() => {
    const url = `https://rickandmortyapi.com/api/character?page=${page}`;

    setLoading(true);
    axios
      .get<ApiResponse>(url)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Response failed");
        }

        const nextPageAvailable = res.data.info.next !== null;
        setIsLastPage(!nextPageAvailable);

        setCharacters((prev) =>
          prev ? [...prev, ...res.data.results] : res.data.results
        );
      })
      .catch((err: AxiosError) => {
        setError(err.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    onFetch();
  }, [onFetch]);

  return {
    characters,
    setCharacters,
    error,
    loading,
    resendRequest: onFetch,
  };
};

export default useFetch;
