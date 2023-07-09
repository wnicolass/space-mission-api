import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HTTPError } from '../errors/base-http-error';

export default function serverErrorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  if (err instanceof HTTPError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }
  console.error(err);
  return res.status(500).json({
    error: 'Something went wrong with the request',
  });
}
