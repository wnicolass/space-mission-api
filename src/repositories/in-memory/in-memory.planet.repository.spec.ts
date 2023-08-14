import { describe, it, expect } from 'vitest';
import inMemoryPlanetRepository from './in-memory.planet.repository';
import { planets } from '../../tests/mocks/planet';

describe('Planets Repository Tests', () => {
  const planetRepository = inMemoryPlanetRepository();
  planetRepository.planets = [...planets];

  it('should return an array of planets', async () => {
    const planets = await planetRepository.getAll();
    expect(planets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          planetName: expect.any(String),
        }),
      ]),
    );
    expect(planets.length).toBe(8);
  });

  it('should find a planet by id', async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    planetRepository.planets![0].planetId = 'findMe';
    const planet = await planetRepository.getPlanetById('findMe');

    expect(planet).toStrictEqual(
      expect.objectContaining({
        planetName: expect.any(String),
      }),
    );
  });
});
