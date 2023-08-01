import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import prisma from '../../../../prisma/client-singleton';
import app from '../../../app';
import { createDbLaunchMock } from '../../../tests/mocks/launches';
import { createDbUserMock } from '../../../tests/mocks/user';

describe('Get All Launches Service', () => {
  const LAUNCHES_URL = '/v1/launches';

  beforeAll(async () => {
    await prisma.launch.deleteMany({});
  });

  it('should respond with a 404 not found is no launch is found', async () => {
    const response = await request(app)
      .get(LAUNCHES_URL)
      .expect('Content-Type', /json/i)
      .expect(404);

    expect(response.body).toStrictEqual({
      error: 'No launches were found',
    });
  });

  it('should respond with 200 ok', async () => {
    const dbUserMock = await createDbUserMock(
      'test3@test3.com',
      'Test3#',
      'tester3',
    );
    await createDbLaunchMock(
      'Test Mission',
      'Rocket',
      '2023-12-12',
      dbUserMock.userId,
    );
    const response = await request(app)
      .get(LAUNCHES_URL)
      .expect('Content-Type', /json/i)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        launches: expect.arrayContaining([]),
      }),
    );
  });
});
