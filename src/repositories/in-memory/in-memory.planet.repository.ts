import type { PlanetRepository } from '../../interfaces/planets.interfaces';

export default function inMemoryPlanetRepository(): PlanetRepository {
  return {
    planets: [],
    getAll() {
      return new Promise((res) => {
        if (this.planets) {
          return res(this.planets);
        }
        return [];
      });
    },
  };
}
