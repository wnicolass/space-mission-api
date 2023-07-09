import { describe, it, expect } from 'vitest';
import inMemoryPlanetRepository from '../../repositories/in-memory/in-memory.planet.repository';
import { getAllPlanetsFactory } from './get-planets';
import { planets } from '../../tests-data/planet';

describe('Get Planets Service', () => {
  it('should throw a PlanetsNotFoundError if no planets were found', async () => {
    const planetRepository = inMemoryPlanetRepository();
    const getAllPlanetsService = getAllPlanetsFactory(planetRepository);
    expect(getAllPlanetsService.exec()).rejects.toThrowError(
      'No planets were found',
    );
  });

  it('should return an array of planets', async () => {
    const planetRepository = inMemoryPlanetRepository();
    planetRepository.planets = [...planets];
    const getAllPlanetsService = getAllPlanetsFactory(planetRepository);
    expect(getAllPlanetsService.exec()).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          planetName: expect.any(String),
        }),
      ]),
    );
  });
});
