import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../app';
import { createDbUserMock } from '../../tests/mocks/user';

describe('Get User Profile Controller', () => {
  it('should return user profile info', async () => {
    const userMock = await createDbUserMock(
      'any-user@gmail.com',
      'anyPass',
      'anyUsername',
    );

    const response = await request(app)
      .get(`/v1/users/${userMock.userId}`)
      .expect('Content-Type', /json/i)
      .expect(200);

    expect(response.body).toBeTruthy();
  });
});
