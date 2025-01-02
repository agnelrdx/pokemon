import express from "express";

import { Pokemon } from "../interfaces/pokemon";
import { MessageResponse } from "../interfaces/message-response";

const router = express.Router();

router.get<{}, Pokemon | MessageResponse>("/", async (req, res) => {
  try {
    const data: Pokemon = await req.db.all("SELECT * FROM pokemon");
    res.json(data);
  } catch (error: unknown) {
    res.status(500);
    res.json({
      message: "Internal Server Error",
    });
  }
});

router.post<{}, MessageResponse>("/", async (req, res) => {
  try {
    const { id } = req.body;
    await req.db.run("INSERT INTO pokemon(name) VALUES(?)", [id]);
    res.json({
      message: "Pokemon added to favorites",
    });
  } catch (error: unknown) {
    console.error("***error", error);
    res.status(500);
    res.json({
      message: "Internal Server Error",
    });
  }
});

router.delete<{}, MessageResponse>("/", async (req, res) => {
  try {
    const { id } = req.body;
    await req.db.run("DELETE FROM pokemon WHERE name = ?", [id]);
    res.json({
      message: "Pokemon deleted to favorites",
    });
  } catch (error: unknown) {
    console.error("***error", error);
    res.status(500);
    res.json({
      message: "Internal Server Error",
    });
  }
});

export default router;
