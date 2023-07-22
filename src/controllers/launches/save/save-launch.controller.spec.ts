import { describe, it, expect, beforeAll } from 'vitest';
import { UserAuthData } from '@prisma/client';
import request from 'supertest';
import { createLaunchMock } from '../../../tests/mocks/launches';
import { createDbUserMock } from '../../../tests/mocks/user';
import { createDbLaunchMock } from '../../../tests/mocks/launches';
import { signInFactory } from '../../../services/auth/signin/signin';
import userAuthRepositoryFactory from '../../../repositories/prisma/prisma-user-auth.repository';
import app from '../../../app';

describe('Save Launch Controller', () => {
  const LAUNCHES_URL = '/v1/launches';
  let jwt = '';
  let dbUserMock: UserAuthData;

  beforeAll(async () => {
    dbUserMock = await createDbUserMock('test@test.com', 'Test1#', 'tester');
    const userRepository = userAuthRepositoryFactory();
    const signInService = signInFactory(userRepository);
    jwt = await signInService.exec({
      username: '',
      email: dbUserMock.email,
      password: 'Test1#',
    });
  });

  it('should respond with a 401 unauthorized if user is not authenticated', async () => {
    const launchMock = createLaunchMock(
      'Explore tests',
      'Tester IIC3',
      '1999-07-01',
      'fdsfsd ',
    );
    const response = await request(app)
      .post(LAUNCHES_URL)
      .send(launchMock)
      .expect('Content-Type', /json/i)
      .expect(401);

    expect(response.body).toEqual({
      error: expect.any(String),
    });
  });

  it('should respond with a 400 bad request if invalid date is provided', async () => {
    const launchMock = createLaunchMock(
      'Explore tests',
      'Tester IIC3',
      '1999-07-01',
      'sfsfsdafdas',
    );
    const response = await request(app)
      .post(LAUNCHES_URL)
      .set('authorization', `Bearer ${jwt}`)
      .send(launchMock)
      .expect('Content-Type', /json/i)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Invalid launch date',
    });
  });

  it('should respond with a 400 bad request if launch with provided mission already exists', async () => {
    await createDbLaunchMock(
      'Explore tests',
      'test',
      '2026-07-03',
      dbUserMock.userId,
    );
    const incomingLaunchMock = createLaunchMock(
      'Explore tests',
      'Tester IIC3',
      '2026-07-03',
      'sfsfsdafdas',
    );
    const response = await request(app)
      .post(LAUNCHES_URL)
      .set('authorization', `Bearer ${jwt}`)
      .send(incomingLaunchMock)
      .expect('Content-Type', /json/i)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: `Launch with mission name "${incomingLaunchMock.mission}" already exists`,
    });
  });

  it('should respond with a 404 not found if user with provided id is not found', async () => {
    const incomingLaunchMock = createLaunchMock(
      'Explore Mars',
      'Tester IIC3',
      '2026-07-03',
      'sfsfsdafdas',
    );
    const response = await request(app)
      .post(LAUNCHES_URL)
      .set('authorization', `Bearer ${jwt}`)
      .send(incomingLaunchMock)
      .expect('Content-Type', /json/i)
      .expect(404);

    expect(response.body).toStrictEqual({
      error: `User not found`,
    });
  });

  it('should respond with a 404 not found if invalid planet is provided', async () => {
    const incomingLaunchMock = createLaunchMock(
      'Explore Mars',
      'Tester IIC3',
      '2026-07-03',
      dbUserMock.userId,
      { planetName: 'fsdfsdfds' },
    );
    const response = await request(app)
      .post(LAUNCHES_URL)
      .set('authorization', `Bearer ${jwt}`)
      .send(incomingLaunchMock)
      .expect('Content-Type', /json/i)
      .expect(404);

    expect(response.body).toStrictEqual({
      error: `Invalid planet`,
    });
  });

  it('should respond with a 201 created', async () => {
    const incomingLaunchMock = createLaunchMock(
      'Explore Mars',
      'Tester IIC3',
      '2024-11-12',
      dbUserMock.userId,
    );
    const response = await request(app)
      .post(LAUNCHES_URL)
      .set('authorization', `Bearer ${jwt}`)
      .send(incomingLaunchMock)
      .expect('Content-Type', /json/i)
      .expect(201);

    expect(response.body).toStrictEqual({
      message: 'Launch successfully created',
    });
  });
});
