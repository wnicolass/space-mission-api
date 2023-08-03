import { describe, it, expect, beforeAll } from 'vitest';
import { Launch, UserAuthData } from '@prisma/client';
import request from 'supertest';
import userAuthRepositoryFactory from '../../../repositories/prisma/prisma-user-auth.repository';
import app from '../../../app';
import { signInFactory } from '../../../services/auth/signin/signin';
import { createDbUserMock } from '../../../tests/mocks/user';
import { createDbLaunchMock } from '../../../tests/mocks/launches';

describe('Abort Launch Controller', () => {
  const LAUNCHES_URL = '/v1/launches';
  let jwt = '';
  let dbUserMock: UserAuthData;

  beforeAll(async () => {
    dbUserMock = await createDbUserMock('mock@mocker.com', 'Mock1#', 'mocker');
    const userRepository = userAuthRepositoryFactory();
    const signInService = signInFactory(userRepository);
    jwt = await signInService.exec({
      username: '',
      email: dbUserMock.email,
      password: 'Mock1#',
    });
  });

  it('should respond with 404 not found if does not find launch by id', async () => {
    const response = await request(app)
      .del(LAUNCHES_URL)
      .set('authorization', `Bearer ${jwt}`)
      .send({
        launchId: 'fakeId',
      })
      .expect('Content-Type', /json/i)
      .expect(404);

    expect(response.body).toStrictEqual({
      error: 'Launch not found',
    });
  });

  it('should respond with 200 ok and a successful message', async () => {
    const launchMock = (await createDbLaunchMock(
      'Mock mission',
      'Mock rocket',
      '2030-12-12',
      dbUserMock.userId,
    )) as Launch;
    const response = await request(app)
      .del(LAUNCHES_URL)
      .set('authorization', `Bearer ${jwt}`)
      .send({
        launchId: launchMock.launchId,
      })
      .expect('Content-Type', /json/i)
      .expect(200);

    expect(response.body).toStrictEqual({
      message: 'Successfully aborted launch',
    });
  });
});
