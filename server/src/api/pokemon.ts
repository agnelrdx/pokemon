import express from "express";

import { Pokemon, PokemonDetails } from "../interfaces/pokemon";
import { MessageResponse } from "../interfaces/message-response";

const router = express.Router();

router.get<{}, Pokemon | MessageResponse>("/", async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const fetchResponse = await fetch(
      `${process.env.POKEMON_API_URL}?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
      },
    );
    const data = await fetchResponse.json();
    res.json(data);
  } catch (error: unknown) {
    res.status(500);
    res.json({
      message: "Internal Server Error",
    });
  }
});

router.get<{ id: string }, PokemonDetails | MessageResponse>(
  "/:id",
  async (req, res) => {
    try {
      const { id } = req.params;
      const fetchResponse = await fetch(
        `${process.env.POKEMON_API_URL}/${id}`,
        {
          method: "GET",
        },
      );
      const data = await fetchResponse.json();
      res.json(data);
    } catch (error: unknown) {
      res.status(500);
      res.json({
        message: "Internal Server Error",
      });
    }
  },
);

export default router;
