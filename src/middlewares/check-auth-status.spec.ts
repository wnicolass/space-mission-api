import { describe, it, expect } from 'vitest';
import express from 'express';
import request from 'supertest';
import checkAuthStatus from './check-auth-status';
import serverErrorHandler from './server-error-handler';
import { encodeJWT } from '../services/security/jwt/encode';
import userAuthRepositoryFactory from '../repositories/prisma/prisma-user-auth.repository';

describe('Test check authentication status', () => {
  const testApp = express();
  testApp.get('/', checkAuthStatus, (req, res) => {
    return res.status(200).json({
      message: 'I am a protected endpoint',
      userId: req.user.userId,
    });
  });
  testApp.use(serverErrorHandler);

  it('should respond with 401 unauthorized if anonymous user try to hit protected endpoint', async () => {
    const response = await request(testApp)
      .get('/')
      .expect(401)
      .expect('Content-Type', /json/i);

    expect(response.body).toStrictEqual({
      error: 'Unauthorized user',
    });
  });

  it('should respond with 400 bad request if authorization header is in wrong format', async () => {
    const response = await request(testApp)
      .get('/')
      .set('Authorization', 'Bearer fsdufhsdufhsaufhas  fasdfsdafasf sa')
      .expect(400)
      .expect('Content-Type', /json/i);

    expect(response.body).toStrictEqual({
      error: 'Authorization header in wrong format',
    });
  });

  it('should respond with 404 if does not find user by email', async () => {
    const jwt = await encodeJWT({ userId: '123', email: 'johndoe@gmail.com' });
    const response = await request(testApp)
      .get('/')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(404)
      .expect('Content-Type', /json/i);

    expect(response.body).toStrictEqual({
      error: 'User does not exist',
    });
  });

  it('should respond with 200 ok', async () => {
    const jwt = await encodeJWT({ userId: '123', email: 'johndoe@gmail.com' });
    const userRepository = userAuthRepositoryFactory();
    await userRepository.signup({
      username: 'john',
      email: 'johndoe@gmail.com',
      password: '123',
    });
    const response = await request(testApp)
      .get('/')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200)
      .expect('Content-Type', /json/i);

    expect(response.body).toStrictEqual({
      message: 'I am a protected endpoint',
      userId: '123',
    });
  });
});
