import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../../../app';
import {
  user,
  userWithEmptyField,
  userWithInvalidEmail,
  validUser,
} from '../../../tests-data/mocks/user';
import { PrismaClient } from '@prisma/client';
import hashPassword from '../../../services/security/hash/hash-password';

describe('Sign In Controller', () => {
  const AUTH_URL = '/v1/auth';

  describe('Test POST /signin', () => {
    it('should respond with a 400 bad request for required fields', async () => {
      const response = await request(app)
        .post(`${AUTH_URL}/signin`)
        .send(userWithEmptyField)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Missing required field',
      });
    });

    it('should respond with a 400 bad request for invalid email', async () => {
      const response = await request(app)
        .post(`${AUTH_URL}/signin`)
        .send(userWithInvalidEmail)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: `Invalid email`,
      });
    });

    it('should respond with a 404 not found for users that does not exist', async () => {
      const response = await request(app)
        .post(`${AUTH_URL}/signin`)
        .send(validUser)
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toStrictEqual({
        error: `User does not exist`,
      });
    });

    it('should respond with a 400 bad request when passwords do not match', async () => {
      const { hashedPassword } = await hashPassword('Jansen1#');
      const prisma = new PrismaClient();
      await prisma.userAuthData.create({
        data: {
          email: 'jansen@gmail.com',
          hashedPassword,
        },
      });
      const response = await request(app)
        .post(`${AUTH_URL}/signin`)
        .send(validUser)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: `Invalid password`,
      });
    });

    it('should respond 200 ok with a jwt access token', async () => {
      const response = await request(app)
        .post(`${AUTH_URL}/signin`)
        .send(user)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          access_token: expect.any(String),
        }),
      );
    });
  });
});
