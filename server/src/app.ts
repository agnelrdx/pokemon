import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { Database } from "sqlite";

import * as middlewares from "./middlewares";
import api from "./api";

require("dotenv").config();

export const init = (db: Database): Express => {
  const app = express();

  app.use(morgan("dev"));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(middlewares.attachDb(db));

  app.use("/api/v1", api);

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);

  return app;
};
