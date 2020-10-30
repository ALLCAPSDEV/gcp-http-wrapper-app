import { ErrorMsg } from '../../interfaces/errorMsg';

const errorCodes = [
  200,
  499,
  500,
  400,
  504,
  404,
  409,
  403,
  401,
  429,
  400,
  409,
  400,
  501,
  500,
  503,
  500,
];

class GeneralError extends Error {
  constructor(error: ErrorMsg) {
    super();
    this.message = error.message as string;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof WrongMethod) {
      return 405;
    }
    if (this instanceof GoogleError) {
      return this.status;
    }
    return 500;
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class WrongMethod extends GeneralError {}
class GoogleError extends GeneralError {
  status: number;
  constructor(error: ErrorMsg) {
    super(error);
    this.status = errorCodes[error.code as number];
  }
}

export { GeneralError, GoogleError, BadRequest, NotFound, WrongMethod };
