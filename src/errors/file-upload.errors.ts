import { HTTPError } from './base-http-error';

export class InvalidFileTypeError extends HTTPError {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
  }
}

export class InvalidFileSizeError extends HTTPError {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
  }
}
