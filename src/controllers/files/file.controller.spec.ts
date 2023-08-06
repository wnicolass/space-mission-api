import { describe, it, expect, beforeAll } from 'vitest';
import { join } from 'node:path';
import request from 'supertest';
import app from '../../app';
import { createDbUserMock } from '../../tests/mocks/user';
import userAuthRepositoryFactory from '../../repositories/prisma/prisma-user-auth.repository';
import { signInFactory } from '../../services/auth/signin/signin';
import { UserAuthData } from '@prisma/client';

describe('File Controller', () => {
  const FILES_URL = '/v1/files';
  let jwt = '';
  let dbUserMock: UserAuthData;

  beforeAll(async () => {
    dbUserMock = await createDbUserMock('test4@test4.com', 'Test4#', 'tester4');
    const userRepository = userAuthRepositoryFactory();
    const signInService = signInFactory(userRepository);
    jwt = await signInService.exec({
      username: '',
      email: dbUserMock.email,
      password: 'Test4#',
    });
  });

  describe('POST /files', async () => {
    it('should respond with a 200 ok for valid images', async () => {
      const response = await request(app)
        .post(FILES_URL)
        .set('authorization', `Bearer ${jwt}`)
        .field('userId', dbUserMock.userId)
        .attach(
          'profileImage',
          join(__dirname, '..', '..', 'tests', 'files', 'valid-file.png'),
        )
        .expect('Content-Type', /json/i)
        .expect(200);

      expect(response.body).toStrictEqual({
        message: 'Successfully updated profile image',
      });
    });
  });
});
