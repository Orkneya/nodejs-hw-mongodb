import { HttpError } from 'http-error';
export const notFoundHandler = (req, res, next) => {
  next(new HttpError(404, 'Route not found'));
};
