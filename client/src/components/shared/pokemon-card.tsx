import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PokemonCardProps } from "@/types";
import { Loader2 } from "lucide-react";

export const PokemonCard = ({
  pokemon,
  detailsLoading,
  onViewDetails,
}: PokemonCardProps) => (
  <Card key={pokemon.name} className="rounded">
    <CardHeader>
      <CardTitle className="capitalize">{pokemon.name}</CardTitle>
    </CardHeader>
    <CardFooter className="flex justify-between">
      <Button variant="outline">Add to favorites</Button>
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
