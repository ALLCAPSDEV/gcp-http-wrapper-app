/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestWithContext } from '../../interfaces/requestWithContext';
import { GeneralError } from './index';
import { Response } from 'express';
import { ErrorReporting } from '@google-cloud/error-reporting';

const errors = new ErrorReporting({
  reportMode: 'always',
  reportUnhandledRejections: false,
});

const errorHandler = (
  err: GeneralError,
  req: RequestWithContext,
  res: Response
) => {
  console.log('HAVE I MADE IT HERE?');
  errors.report(err);
  req.context.logger.error(err.message);
  console.log(err.getCode());
  return res
    .status(err.getCode())
    .json({ status: err.getCode(), error: { message: err.message } });
};
export { errorHandler };
