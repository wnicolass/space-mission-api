export abstract class HTTPError extends Error {
  public abstract statusCode: number;
  constructor(public message: string) {
    super(message);
  }
}
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
