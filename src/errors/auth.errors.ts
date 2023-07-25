import { HTTPError } from './base-http-error';

export class InvalidArgumentError extends HTTPError {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
  }
}

export class UserAlreadyExistsError extends HTTPError {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
  }
}

export class UserNotFoundError extends HTTPError {
  constructor(public message: string, public statusCode: number = 404) {
    super(message);
  }
}

export class UserAlreadyJoinedError extends HTTPError {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
  }
}

export class InvalidPasswordError extends HTTPError {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
  }
}

export class UnauthorizedUserError extends HTTPError {
  constructor(public message: string, public statusCode: number = 401) {
    super(message);
  }
}

export class BrokenHeaderError extends HTTPError {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
  }
}
