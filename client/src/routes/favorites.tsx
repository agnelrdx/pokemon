import { useEffect, useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import classNames from "classnames";

import { Header } from "@/components/shared/header";
import { Navbar } from "@/components/shared/navbar";
import { PokemonCard } from "@/components/shared/pokemon-card";
import { PokemonDialog } from "@/components/shared/pokemon-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useApiState } from "@/hooks/use-state";
import { useDialog } from "@/hooks/use-dialog";

const Favorites = () => {
  const [key, setKey] = useState(0);
  const { favorites, loadingMore, fetchFavorites } = useApiState();
  const {
    selectedPokemon,
    pokemon,
    showDialog,
    handleShowDialog,
    handlePokemonDetails,
  } = useDialog();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites, key]);

  const handleKeyChange = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  return (
    <div className="container mx-auto">
      <Header />
      <Navbar />
      <div
        className={classNames("grid grid-cols-3 gap-5", {
          "mb-10": favorites.length,
        })}
      >
        {favorites.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            showRemoveFromFavorites
            selectedPokemon={selectedPokemon}
            showAddToFavorites={false}
            onKeyChange={handleKeyChange}
            onViewDetails={handlePokemonDetails}
          />
        ))}
      </div>
      {!favorites.length && !loadingMore && (
        <Alert className="w-full">
          <AlertTitle>No favorites found</AlertTitle>
          <AlertDescription>
            You have not added any favorite pokemon yet.
          </AlertDescription>
        </Alert>
      )}
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
            "opacity-100": loadingMore,
          },
        )}
      />
    </div>
  );
};

export default Favorites;
