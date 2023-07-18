import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../../../app';
import {
  userWithEmptyField,
  userWithInvalidEmail,
  user,
} from '../../../tests-data/mocks/user';

describe('Sign Up Controller', () => {
  const AUTH_URL = '/v1/auth';

  describe('Test POST /signup', () => {
    it('should respond with a 400 bad request for required fields', async () => {
      const response = await request(app)
        .post(`${AUTH_URL}/signup`)
        .send(userWithEmptyField)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Missing required field',
      });
    });

    it('should respond with a 400 bad request for invalid email', async () => {
      const response = await request(app)
        .post(`${AUTH_URL}/signup`)
        .send(userWithInvalidEmail)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: `Invalid email`,
      });
    });

    it('should respond with a 201 created', async () => {
      const response = await request(app)
        .post(`${AUTH_URL}/signup`)
        .send(user)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toEqual(
        expect.objectContaining({
          message: 'User successfully created',
          user: expect.objectContaining({
            username: expect.any(String),
            email: expect.any(String),
          }),
        }),
      );
    });

    it('should respond with a 400 bad request for emails that already exist', async () => {
      const response = await request(app)
        .post(`${AUTH_URL}/signup`)
        .send(user)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: `User with email "${user.email}" already exists`,
      });
    });
  });
});
