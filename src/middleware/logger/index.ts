import { Response, NextFunction } from 'express';
import { RequestWithContext } from '../../interfaces/requestWithContext';
import Logger from './logger';

export const logger = (logName: string) => (
  req: RequestWithContext,
  _res: Response,
  next: NextFunction
) => {
  const logger = new Logger(logName, req);
  req.context = {
    logger,
  };
  next();
};
