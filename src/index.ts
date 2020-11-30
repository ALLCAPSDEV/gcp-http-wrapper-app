import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { AppCreatorOptions } from '../interfaces/appCreatorOptions';
import { RequestWithContext } from '../interfaces/requestWithContext';
import { apiKeyCheck } from './middleware/apiKey';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './middleware/logger';
import { methodCheck } from './middleware/methodCheck';

const app = express();

export const createApp = (
  methods: string[],
  func: (
    req: RequestWithContext,
    res: Response,
    next: NextFunction
  ) => Promise<void>,
  options?: AppCreatorOptions
) => async (req: Request, res: Response) => {
  app.use(logger);
  app.use(methodCheck(methods));
  if (options?.apiKey) {
    app.use(apiKeyCheck);
  }
  app.all('/', async (req: RequestWithContext, res, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (err) {
      errorHandler(err, req, res);
    }
  });
  app.use(errorHandler);

  return app(req, res);
};
