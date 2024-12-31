export type Pokemon = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
  message?: string;
};

export type PokemonDetails = {
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
