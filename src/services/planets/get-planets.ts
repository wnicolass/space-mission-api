import { PlanetsNotFoundError } from '../../errors/planet.errors';
import type {
  Planet,
  PlanetRepository,
} from '../../interfaces/planets.interfaces';

export function getAllPlanetsFactory(planetRepository: PlanetRepository) {
  return {
    async exec(): Promise<Planet[]> {
      const planets = await planetRepository.getAll();
      if (!planets.length) {
        throw new PlanetsNotFoundError('No planets were found');
      }

      return planetRepository.getAll();
    },
  };
}
