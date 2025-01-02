import { Request, Response, NextFunction } from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

import { ErrorResponse } from "./interfaces/error-response";
import { DBRequest } from "./interfaces/db";

export const notFound = (req: Request, res: Response) => {
  res.status(404);
  res.json({
    message: `Not Found - ${req.originalUrl}`,
  });
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: err.stack,
  });
};

export const attachDb = async (
  req: DBRequest,
  res: Response,
  next: NextFunction,
) => {
  const filename = path.resolve(__dirname, "./db.sqlite3");

  console.log("filename", filename);

  let db = req.db;
  if (!db) {
    db = await open({ filename, driver: sqlite3.Database });
    req.db = db;
  }
  next();
};
