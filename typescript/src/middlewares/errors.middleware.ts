import { Request, Response, NextFunction } from 'express';
import AppError from './../config/error.js';

function ExceptionHandler(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.log(`[ERROR] ${error.log ?? error}`);
  return error instanceof AppError
    ? res.status(error.statusCode).send({
        message: error.message,
        detail: error.detail,
      })
    : res.status(500).send({
        message: `Internal server error`,
        detail: error,
      });
}

export default ExceptionHandler;
