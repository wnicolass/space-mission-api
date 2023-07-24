import { HTTPError } from './base-http-error';

export class InvalidLaunchDateError extends HTTPError {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
  }
}

export class LaunchAlreadyExistsError extends HTTPError {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
  }
}

export class LaunchNotFoundError extends HTTPError {
  constructor(public message: string, public statusCode: number = 404) {
    super(message);
  }
}
