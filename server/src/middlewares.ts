import { Request, Response, NextFunction } from "express";
import { Database } from "sqlite";

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

export const attachDb =
  (db: Database) => (req: DBRequest, res: Response, next: NextFunction) => {
    req.db = db;
    next();
  };
