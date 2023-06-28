export class InvalidArgumentError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export class UserAlreadyExistsError extends Error {
  constructor(public message: string) {
    super(message);
  }
}
