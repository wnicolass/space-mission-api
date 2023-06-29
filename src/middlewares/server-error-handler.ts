import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export default function serverErrorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  console.error(err);
  return res.status(500).json({
    error: 'Internal Server Error',
  });
}
