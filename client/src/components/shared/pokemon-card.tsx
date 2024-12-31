import { Loader2 } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PokemonCardProps } from "@/types";

export const PokemonCard = ({
  pokemon,
  detailsLoading,
  onViewDetails,
}: PokemonCardProps) => {
  const { toast } = useToast();

  const handleAddToFavorites = async (id: string) => {
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
  };

  return (
    <Card key={pokemon.name} className="rounded">
      <CardHeader>
        <CardTitle className="capitalize">{pokemon.name}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => handleAddToFavorites(pokemon.name)}
        >
          Add to favorites
        </Button>
        <Button
          onClick={() => onViewDetails(pokemon.name)}
          disabled={detailsLoading === pokemon.name}
        >
          {detailsLoading === pokemon.name && (
            <Loader2 className="animate-spin" />
          )}
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
