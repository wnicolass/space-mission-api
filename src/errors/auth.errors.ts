export class InvalidArgumentError extends Error {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
  }
}

export class UserAlreadyExistsError extends Error {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
  }
}
