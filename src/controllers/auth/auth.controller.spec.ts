import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../app';

describe('Auth Controller', () => {
  const AUTH_URL = '/v1/auth';

  describe('Test POST /auth', () => {
    it('should respond with a 201 created', async () => {
      const user = {
        username: 'Some name',
        email: faker.internet.email(),
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
