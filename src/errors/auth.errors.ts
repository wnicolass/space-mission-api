export class InvalidArgumentError extends Error {
  constructor(public message: string) {
    super(message);
  }
}
