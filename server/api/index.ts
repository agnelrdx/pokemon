// For vercel deployment

import path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

import { init } from "../src/app";

const filename = path.resolve(__dirname, "../db.sqlite3");

let app;

open({ filename, driver: sqlite3.Database }).then((db) => {
  app = init(db);
});

export default app;
