import { useCallback } from "react";
import { Loader2, StarIcon } from "lucide-react";
import classNames from "classnames";

import { useToast } from "@/hooks/use-toast";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PokemonCardProps } from "@/types";

export const PokemonCard = ({
  pokemon,
  selectedPokemon,
  showAddToFavorites,
  showRemoveFromFavorites,
  onKeyChange,
  onViewDetails,
}: PokemonCardProps) => {
  const { toast } = useToast();

  const handleAddToFavorites = useCallback(
    async (id: string) => {
      const res = await fetch("http://localhost:4000/api/v1/favorites", {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        return toast({
          variant: "destructive",
          title: "Failed to add to favorites",
        });
      }

      toast({
        title: "Added to favorites",
        description: `${id} has been added to your favorites.`,
      });
      onKeyChange();
    },
    [onKeyChange, toast],
  );

  const handleRemoveFromFavorites = useCallback(
    async (id: string) => {
      const res = await fetch("http://localhost:4000/api/v1/favorites", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        return toast({
          variant: "destructive",
          title: "Failed to remove from favorites",
        });
      }

      toast({
        title: "Removed from favorites",
        description: `${id} has been removed from your favorites.`,
      });
      onKeyChange();
    },
    [onKeyChange, toast],
  );

  return (
    <Card key={pokemon.name} className="rounded">
      <CardHeader>
        <CardTitle className="capitalize flex justify-between items-center">
          {pokemon.name}

          <StarIcon
            fill="yellow"
            className={classNames("opacity-0", {
              "opacity-100": !showAddToFavorites && !showRemoveFromFavorites,
            })}
          />
        </CardTitle>
      </CardHeader>
      <CardFooter
        className={classNames("flex justify-between", {
          "justify-end": !showAddToFavorites && !showRemoveFromFavorites,
        })}
      >
        {showAddToFavorites && (
          <Button
            variant="outline"
            onClick={() => handleAddToFavorites(pokemon.name)}
          >
            Add to favorites
          </Button>
        )}
        {showRemoveFromFavorites && (
          <Button
            variant="outline"
            onClick={() => handleRemoveFromFavorites(pokemon.name)}
          >
            Remove from favorites
          </Button>
        )}
        <Button
          onClick={() => onViewDetails(pokemon.name)}
          disabled={selectedPokemon === pokemon.name}
        >
          {selectedPokemon === pokemon.name && (
            <Loader2 className="animate-spin" />
          )}
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
