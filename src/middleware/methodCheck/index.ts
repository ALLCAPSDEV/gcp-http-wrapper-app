import { Request, Response, NextFunction } from 'express';
import { WrongMethod } from '../errors';

export const methodCheck = (methods: string[]) => (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const upperCaseMethods = methods.map((method) => method.toUpperCase());
  if (upperCaseMethods.includes(req.method)) return next();
  throw new WrongMethod({ message: `${req.method} is not allowed` });
};
