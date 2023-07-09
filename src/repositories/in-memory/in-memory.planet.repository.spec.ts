import { describe, it, expect } from 'vitest';
import inMemoryPlanetRepository from './in-memory.planet.repository';
import { planets } from '../../tests-data/planet';

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
});
