import { useState } from "react";

import { Pokemon } from "@/types";

const API_ROUTE = import.meta.env.VITE_SOME_KEY;

export const useDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  const handlePokemonDetails = async (name: string) => {
    setSelectedPokemon(name);
    const res = await fetch(`${API_ROUTE}/pokemon/${name}`);
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
