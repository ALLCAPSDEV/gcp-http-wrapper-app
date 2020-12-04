import { ErrorReporting } from '@google-cloud/error-reporting';
import { Response } from 'express';
import { GeneralError } from './errors';
import { RequestWithContext } from '../../interfaces/requestWithContext';

const errors = new ErrorReporting({
  reportMode: 'always',
  reportUnhandledRejections: false,
});

const errorHandler = (
  err: GeneralError,
  req: RequestWithContext,
  res: Response
) => {
  errors.report(err);
  req.context.logger.error(err.message);
  const statusCode = typeof err.getCode === 'undefined' ? 500 : err.getCode();
  return res
    .status(statusCode)
    .json({ status: statusCode, error: { message: err.message } });
};
export { errorHandler };
