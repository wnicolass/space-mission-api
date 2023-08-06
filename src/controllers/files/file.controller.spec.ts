import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../app';

describe('File Controller', () => {
  const FILES_URL = '/v1/files';
  describe('POST /files', async () => {
    it('should respond with a 200 ok for valid images', async () => {
      const response = await request(app)
        .post(FILES_URL)
        .attach('profile_image', '../../tests/files/valid-file.png')
        .expect('Content-Type', /json/i)
        .expect(200);

      expect(response.body).toStrictEqual({
        message: 'Successfully updated profile image',
      });
    });
  });
});
