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
    getPlanetById(planetId: string) {
      return new Promise((res) => {
        const planet =
          this.planets?.find((planet) => planet.planetId === planetId) || null;

        return res(planet);
      });
    },
  };
}
