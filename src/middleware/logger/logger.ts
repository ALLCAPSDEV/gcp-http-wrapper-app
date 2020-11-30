import { Response, NextFunction } from 'express';
import { RequestWithContext } from '../../interfaces/requestWithContext';
import Logger from './index';

export const logger = (
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
