import { useState } from "react";

import { Pokemon } from "@/types";

export const useDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  const handlePokemonDetails = async (name: string) => {
    setSelectedPokemon(name);
    const res = await fetch(`http://localhost:4000/api/v1/pokemon/${name}`);
    const data = await res.json();
    setPokemon(data);
    setShowDialog(true);
    setSelectedPokemon(null);
  };

  const handleShowDialog = (value: boolean) => setShowDialog(value);

  return {
    pokemon,
    showDialog,
    selectedPokemon,
    handlePokemonDetails,
    handleShowDialog,
  };
};
