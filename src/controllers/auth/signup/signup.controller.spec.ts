import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../../../app';

describe('Sign Up Controller', () => {
  const AUTH_URL = '/v1/auth';

  describe('Test POST /signup', () => {
    it('should respond with a 201 created', async () => {
      const user = {
        username: 'Some name',
        email: 'jared@gmail.com',
        password: 'some password',
      };

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
  });
});
