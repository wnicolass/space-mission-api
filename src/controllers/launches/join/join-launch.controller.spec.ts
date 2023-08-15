import { describe, it, expect, beforeAll } from 'vitest';
import { Launch, UserAuthData } from '@prisma/client';
import request from 'supertest';
import userAuthRepositoryFactory from '../../../repositories/prisma/prisma-user-auth.repository';
import app from '../../../app';
import { createDbUserMock } from '../../../tests/mocks/user';
import { signInFactory } from '../../../services/auth/signin/signin';
import { createDbLaunchMock } from '../../../tests/mocks/launches';

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
      .expect('Content-Type', /json/i)
      .expect(404);

    expect(response.body).toStrictEqual({
      error: 'Launch not found',
    });
  });

  it('should respond with 400 bad request if user already joined on launch', async () => {
    const launchMock = (await createDbLaunchMock(
      'Testarino mission',
      'TestarinoRocket',
      '2028-12-12',
      dbUserMock.userId,
    )) as Launch;
    const response = await request(app)
      .post(`${LAUNCHES_URL}/${launchMock.launchId}`)
      .set('authorization', `Bearer ${jwt}`)
      .expect('Content-Type', /json/i)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'User already joined',
    });
  });

  it('should respond with 200 ok and a success message', async () => {
    const userMock = await createDbUserMock(
      'testarino2@gmail.com',
      'Testarino2#',
      'testarino2',
    );
    const userMock2 = {
      username: 'tester',
      email: 'thetester@gmail.com',
      password: 'the tester',
    };
    await createDbUserMock(
      userMock2.email,
      userMock2.password,
      userMock2.username,
    );
    const signInService = signInFactory(userAuthRepositoryFactory());
    const sutJwt = await signInService.exec(userMock2);
    const launchMock = (await createDbLaunchMock(
      'Testarino mission',
      'TestarinoRocket',
      '2028-12-12',
      userMock.userId,
    )) as Launch;
    const response = await request(app)
      .post(`${LAUNCHES_URL}/${launchMock.launchId}`)
      .set('authorization', `Bearer ${sutJwt}`)
      .expect('Content-Type', /json/i)
      .expect(200);

    expect(response.body).toStrictEqual({
      message: 'Successfully joined launch',
    });
  });
});
