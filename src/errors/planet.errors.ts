import { HTTPError } from './base-http-error';

export class PlanetNotFoundError extends HTTPError {
  constructor(public message: string, public statusCode = 404) {
    super(message);
  }
}
