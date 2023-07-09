export abstract class HTTPError extends Error {
  public abstract statusCode: number;
  constructor(public message: string) {
    super(message);
  }
}
