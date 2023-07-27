import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../../app';
import { createDbUserMock } from '../../../tests/mocks/user';
import userAuthRepositoryFactory from '../../../repositories/prisma/prisma-user-auth.repository';
import { signInFactory } from '../../../services/auth/signin/signin';
import { UserAuthData } from '@prisma/client';

describe('Join Launch Controller', () => {
  const LAUNCHES_URL = '/v1/launches';
  let jwt = '';
  let dbUserMock: UserAuthData;

  beforeAll(async () => {
    dbUserMock = await createDbUserMock('test2@test2.com', 'Test2#', 'tester2');
    const userRepository = userAuthRepositoryFactory();
    const signInService = signInFactory(userRepository);
    jwt = await signInService.exec({
      username: '',
      email: dbUserMock.email,
      password: 'Test2#',
    });
  });

  it('should respond with 404 not found if does not find launch to join', async () => {
    const response = await request(app)
      .post(`${LAUNCHES_URL}/123`)
      .set('authorization', `Bearer ${jwt}`)
      .send({ userId: '321' })
      .expect('Content-Type', /json/i)
      .expect(404);

    expect(response.body).toStrictEqual({
      error: 'Launch not found',
    });
  });
});
