export type Pokemon = {
  id: number;
  name: string;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  base_experience: number;
  height: number;
  weight: number;
  forms: {
    name: string;
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
};

export type PokemonCardProps = {
  pokemon: Pokemon;
  detailsLoading: string | null;
  onViewDetails: (name: string) => void;
};

export type PokemonDialogProps = {
  pokemon: Pokemon | null;
  onOpenChange: (value: boolean) => void;
};
