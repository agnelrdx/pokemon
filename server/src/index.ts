import path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

import { init } from "./app";

const port = process.env.PORT || 4000;

const filename = path.resolve(__dirname, "../db.sqlite3");

open({ filename, driver: sqlite3.Database }).then((db) => {
  const app = init(db);

  app.listen(port, () => console.log(`Listening: http://localhost:${port}`));
});
