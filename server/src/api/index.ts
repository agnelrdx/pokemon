import express from "express";

import pokemon from "../api/pokemon";
import favorites from "../api/favorites";
import { MessageResponse } from "../interfaces/message-response";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "Pokemon apis up and running 🌈",
  });
});

router.use("/pokemon", pokemon);
router.use("/favorites", favorites);

export default router;
