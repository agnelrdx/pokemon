import { createContext, useState, useCallback } from "react";

import { Pokemon } from "@/types";

type StateProviderProps = {
  children: React.ReactNode;
};

type StateProvider = {
  pokemons: Pokemon[];
  favorites: Pokemon[];
  loadingMore: boolean;
  hasMore: boolean;
  offset: number;
  fetchPokemons: (currentOffset: number) => Promise<void>;
  fetchFavorites: () => Promise<void>;
};

const initialState: StateProvider = {
  pokemons: [],
  favorites: [],
  loadingMore: false,
  hasMore: true,
  offset: 0,
  fetchPokemons: async () => {},
  fetchFavorites: async () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const StateProviderContext = createContext<StateProvider>(initialState);

export const StateProvider = ({ children }: StateProviderProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPokemons = useCallback(
    async (currentOffset: number) => {
      if (!hasMore) return;

      setLoadingMore(true);
      if (currentOffset)
        await new Promise((resolve) => setTimeout(resolve, 1000)); // force slow loading

      const res = await fetch(
        `http://localhost:4000/api/v1/pokemon?limit=150&offset=${currentOffset}`,
      );
      const data = await res.json();

      if (data.results.length === 0) {
        setHasMore(false);
        return;
      }

      setPokemons((prev) => {
        const combined = [...prev, ...data.results];
        const uniqueItems = Array.from(
          new Map(combined.map((item) => [item.name, item])).values(),
        );
        return uniqueItems;
      });
      setOffset(currentOffset + 150);
      setLoadingMore(false);
    },
    [hasMore],
  );

  const fetchFavorites = useCallback(async () => {
    setLoadingMore(true);
    const res = await fetch("http://localhost:4000/api/v1/favorites");
    const data = await res.json();
    setFavorites(data);
    setLoadingMore(false);
  }, []);

  return (
    <StateProviderContext.Provider
      value={{
        pokemons,
        favorites,
        loadingMore,
        hasMore,
        offset,
        fetchPokemons,
        fetchFavorites,
      }}
    >
      {children}
    </StateProviderContext.Provider>
  );
};