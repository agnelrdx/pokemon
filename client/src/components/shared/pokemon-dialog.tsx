import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PokemonDialogProps } from "@/types";

export const PokemonDialog = ({
  pokemon,
  showDialog,
  onOpenChange,
}: PokemonDialogProps) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Dialog open={showDialog} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="capitalize">{pokemon?.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-x-2">
          {imageLoading && (
            <Loader2 className="animate-spin size-10 block mx-auto my-32" />
          )}
          <img
            src={pokemon?.sprites.front_default}
            alt={pokemon?.name}
            className="w-1/2 block mx-auto"
            loading="lazy"
            onLoad={() => setImageLoading(false)}
          />
          {pokemon?.abilities?.length && (
            <p>
              <span className="font-bold">Abilities: </span>
              {pokemon?.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </p>
          )}
          {pokemon?.types?.length && (
            <p>
              <span className="font-bold">Types: </span>
              {pokemon?.types.map(({ type }) => type.name).join(", ")}
            </p>
          )}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
