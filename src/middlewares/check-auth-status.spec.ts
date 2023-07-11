import { describe, it, expect } from 'vitest';
import express from 'express';
import request from 'supertest';
import checkAuthStatus from './check-auth-status';
import serverErrorHandler from './server-error-handler';

describe('Test check authentication status', () => {
  const testApp = express();
  testApp.get('/', checkAuthStatus, (req, res) => {
    return res.status(200).json({
      message: 'I am a protected endpoint',
    });
  });
  testApp.use(serverErrorHandler);

  it('it should respond with 401 unauthorized if anonymous user try to hit protected endpoint', async () => {
    const response = await request(testApp)
      .get('/')
      .expect(401)
      .expect('Content-Type', /json/i);

    expect(response.body).toStrictEqual({
      error: 'Unauthorized user',
    });
  });

  it('it should respond with 400 bad request if authorization header is in wrong format', async () => {
    const response = await request(testApp)
      .get('/')
      .set('Authorization', 'Bearer fsdufhsdufhsaufhas  fasdfsdafasf sa')
      .expect(400)
      .expect('Content-Type', /json/i);

    expect(response.body).toStrictEqual({
      error: 'Authorization header in wrong format',
    });
  });
});
