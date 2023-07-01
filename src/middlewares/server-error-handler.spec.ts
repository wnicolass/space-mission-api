import { describe, expect, it } from 'vitest';
import express from 'express';
import request from 'supertest';
import serverErrorHandler from './server-error-handler';
import { InvalidArgumentError } from '../errors/auth.errors';

describe('Default Error Handler Tests', () => {
  const testApp = express();
  it('should respond with a 500 internal server error for dev related errors', async () => {
    testApp.get('/test-error', (req, res, next) => {
      return next(new Error('Test error'));
    });
    testApp.use(serverErrorHandler);
    const response = await request(testApp)
      .get('/test-error')
      .expect('Content-Type', /json/)
      .expect(500);

    expect(response.body).toStrictEqual({
      error: 'Something went wrong with the request',
    });
  });

  it('should respond with specific status code and error message if error is an instance of HTTPError', async () => {
    const error = new InvalidArgumentError('Test error');
    testApp.get('/test-error2', (req, res, next) => {
      return next(error);
    });
    testApp.use(serverErrorHandler);
    const response = await request(testApp)
      .get('/test-error2')
      .expect('Content-Type', /json/)
      .expect(error.statusCode);

    expect(response.body).toStrictEqual({
      error: error.message,
    });
  });
});
