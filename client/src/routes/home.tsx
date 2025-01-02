import {
  useEffect,
  useMemo,
  useState,
  useDeferredValue,
  useCallback,
} from "react";
import { Loader2 } from "lucide-react";
import { useIntersectionObserver } from "usehooks-ts";
import classNames from "classnames";

import { Header } from "@/components/shared/header";
import { Navbar } from "@/components/shared/navbar";
import { PokemonCard } from "@/components/shared/pokemon-card";
import { PokemonDialog } from "@/components/shared/pokemon-dialog";
import { useApiState } from "@/hooks/use-state";
import { useDialog } from "@/hooks/use-dialog";
import { Input } from "@/components/ui/input";

const Home = () => {
  const [search, setSearch] = useState("");
  const [key, setKey] = useState(0);
  const deferredSearch = useDeferredValue(search);
  const { isIntersecting: inView, ref } = useIntersectionObserver({
    threshold: 0.5,
  });
  const {
    pokemons,
    favorites,
    offset,
    hasMore,
    loadingMore,
    fetchPokemons,
    fetchFavorites,
  } = useApiState();
  const {
    selectedPokemon,
    pokemon,
    showDialog,
    handleShowDialog,
    handlePokemonDetails,
  } = useDialog();

  const filteredPokemons = useMemo(() => {
    if (!deferredSearch) return pokemons;
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(deferredSearch.toLowerCase()),
    );
  }, [pokemons, deferredSearch]);

  useEffect(() => {
    fetchPokemons(0);
    fetchFavorites();
  }, [fetchPokemons, fetchFavorites, key]);

  useEffect(() => {
    if (inView) {
      fetchPokemons(offset);
    }
  }, [inView, offset, fetchPokemons]);

  const handleKeyChange = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  return (
    <div className="container mx-auto">
      <Header />
      <Navbar />
      <Input
        className="w-72 mb-5"
        type="text"
        placeholder="Search for pokemon"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-3 gap-5 mb-10">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            selectedPokemon={selectedPokemon}
            showAddToFavorites={
              !favorites.some((fav) => fav.name === pokemon.name)
            }
            showRemoveFromFavorites={false}
            onAction={handleKeyChange}
            onViewDetails={handlePokemonDetails}
          />
        ))}
      </div>
      <PokemonDialog
        key={pokemon?.name}
        showDialog={showDialog}
        pokemon={pokemon}
        onOpenChange={handleShowDialog}
      />
      <Loader2
        className={classNames(
          "animate-spin size-10 block mx-auto mb-10 opacity-0",
          {
            "opacity-100": loadingMore && hasMore,
            "mb-0": !hasMore && !loadingMore,
          },
        )}
      />
      {offset && hasMore && !loadingMore && !search ? <div ref={ref} /> : null}
    </div>
  );
};

export default Home;
