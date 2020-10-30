import express from 'express';
import { Request, Response } from 'express';
import { RequestWithContext } from './interfaces/requestWithContext';
import { errorHandler } from './middleware/errors/errorHandler';
import { logger } from './middleware/logger/logger';

import { methodCheck } from './middleware/methodCheck';
const app = express();

export const createApp = (
  methods: string[],
  func: (req: Request, res: Response) => Promise<void>
) => async (req: Request, res: Response) => {
  app.use((req, res, next) => logger(req as RequestWithContext, res, next));
  app.all('/', methodCheck(methods));
  app.all('/', async (req, res) => {
    try {
      await func(req, res);
    } catch (err) {
      errorHandler(err, req as RequestWithContext, res);
    }
  });

  return app(req, res);
};
