import { Request } from 'express';
import Logger from '../middleware/logger';
export interface RequestWithContext extends Request {
  context: {
    logger: Logger;
  };
}
