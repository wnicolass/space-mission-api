import prisma from '../../../prisma/client-singleton';
import { PlanetRepository } from '../../interfaces/planets.interfaces';

export default function planetRepositoryFactory(): PlanetRepository {
  return {
    async getAll() {
      return prisma.planet.findMany();
    },
    async getPlanetById(planetId) {
      return prisma.planet.findUnique({
        where: {
          planetId,
        },
      });
    },
  };
}
