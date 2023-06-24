import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../../app';
// import inMemoryAuthRepository from '../../repositories/in-memory/in-memory.auth.repository';

describe('Auth Controller', () => {
  describe('Test POST /auth', () => {
    const AUTH_URL = '/v1/auth';
    it('should respond with a 200 ok', async () => {
      const response = await request(app)
        .post(`${AUTH_URL}/signup`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toStrictEqual({
        sanityCheck: 'ok',
      });
    });
  });
});
