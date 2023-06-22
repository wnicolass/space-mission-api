import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../../app';

describe('Auth Controller', () => {
  describe('Test POST /auth', () => {
    it('should respond with a 200 ok', async () => {
      const response = await request(app)
        .post('/v1/auth/signup')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toStrictEqual({
        sanityCheck: 'ok',
      });
    });
  });
});
