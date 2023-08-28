import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../app';
// import userAuthRepositoryFactory from '../../repositories/prisma/prisma-user-auth.repository';
import { createDbUserMock } from '../../tests/mocks/user';

describe('Get User Profile Controller', () => {
  it('should return user profile info', async () => {
    const userMock = await createDbUserMock(
      'any-user@gmail.com',
      'anyPass',
      'anyUsername',
    );

    const response = await request(app)
      .get(`/v1/user/${userMock.userId}`)
      .expect('Content-Type', /json/i)
      .expect(200);

    expect(response.body).toBeTruthy();
  });
});
