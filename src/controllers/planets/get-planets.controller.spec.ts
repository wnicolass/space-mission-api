import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../app';

describe('Planets Controller', () => {
  describe('Test GET /planets', () => {
    it('should return an array of planets', async () => {
      const response = await request(app)
        .get('/v1/planets')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          planets: expect.arrayContaining([
            expect.objectContaining({
              planetId: expect.any(String),
              planetName: expect.any(String),
            }),
          ]),
        }),
      );
    });
  });
});
