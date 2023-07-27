import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../../app';

describe('Join Launch Controller', () => {
  const LAUNCHES_URL = '/v1/launches';
  it('should respond with 404 not found if does not find launch to join', async () => {
    const response = await request(app)
      .post(`${LAUNCHES_URL}/123`)
      .send({ userId: '321' })
      .expect('Content-Type', /json/i)
      .expect(404);

    expect(response.body).toStrictEqual({
      error: 'Launch not found',
    });
  });
});
