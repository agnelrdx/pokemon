import { useState, useEffect, useCallback, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useIntersectionObserver } from "usehooks-ts";
import classNames from "classnames";

import { Pokemon } from "@/types";
import { Header } from "@/components/shared/header";
import { Navbar } from "@/components/shared/navbar";
import { PokemonCard } from "@/components/shared/pokemon-card";
import { PokemonDialog } from "@/components/shared/pokemon-dialog";

const Home = () => {
  const containerRef = useRef(null);
  const lastScrollPos = useRef(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { isIntersecting: inView, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  const fetchPokemons = useCallback(
    async (currentOffset: number) => {
      if (!hasMore) return;

      setLoadingMore(true);
      if (containerRef.current) lastScrollPos.current = window.scrollY;
      if (currentOffset)
        await new Promise((resolve) => setTimeout(resolve, 1000)); // force slow loading

      const res = await fetch(
        `http://localhost:4000/api/v1/pokemon?limit=150&offset=${currentOffset}`,
      );
      const data = await res.json();

      if (data.results.length === 0) {
        setHasMore(false);
        return;
      }

      setPokemons((prev) => {
        const combined = [...prev, ...data.results];
        const uniqueItems = Array.from(
          new Map(combined.map((item) => [item.name, item])).values(),
        );
        return uniqueItems;
      });
      setOffset(currentOffset + 150);
      setLoadingMore(false);
      requestAnimationFrame(() => {
        window.scrollTo(0, lastScrollPos.current);
      });
    },
    [hasMore],
  );

  useEffect(() => {
    fetchPokemons(0);

    fetch("http://localhost:4000/api/v1/favorites", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [fetchPokemons]);

  useEffect(() => {
    if (inView) {
      fetchPokemons(offset);
    }
  }, [inView, offset, fetchPokemons]);

  const handleDetails = async (name: string) => {
    setLoading(name);
    const res = await fetch(`http://localhost:4000/api/v1/pokemon/${name}`);
    const data = await res.json();
    setPokemon(data);
    setShowDialog(true);
    setLoading(null);
  };

  const handleShowDialog = (value: boolean) => setShowDialog(value);

  return (
    <div className="container mx-auto">
      <Header />
      <Navbar />
      <div ref={containerRef} className="grid grid-cols-3 gap-5 mb-10">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            onViewDetails={handleDetails}
            detailsLoading={loading}
          />
        ))}
      </div>
      {showDialog && (
        <PokemonDialog pokemon={pokemon} onOpenChange={handleShowDialog} />
      )}
      <Loader2
        className={classNames(
          "animate-spin size-10 block mx-auto mb-10 opacity-0",
          {
            "opacity-100": loadingMore && hasMore,
            "mb-0": !hasMore,
          },
        )}
      />
      {offset && hasMore && !loadingMore ? <div ref={ref} /> : null}
    </div>
  );
};

export default Home;
