import type {
  Planet,
  PlanetRepository,
} from '../../interfaces/planets.interfaces';

export function getAllPlanets(planetRepository: PlanetRepository): Planet[] {
  return planetRepository.getAll();
}
