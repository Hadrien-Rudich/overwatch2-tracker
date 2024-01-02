import { ErrorRequestHandler } from 'express';

export const apiErrorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  next
) => {
  res.status(error.status || 500);
  res.send({ error: true, message: error.message || 'Internal Server Error' });
};
