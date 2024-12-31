import { Database } from "sqlite";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      db: Database;
    }
  }
}

export interface DBRequest extends Request {
  db: Database;
}
