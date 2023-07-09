import { PrismaClient } from '@prisma/client';
import { PlanetRepository } from '../../interfaces/planets.interfaces';

export default function planetRepositoryFactory(): PlanetRepository {
  const prisma = new PrismaClient();
  return {
    async getAll() {
      return prisma.planet.findMany();
    },
  };
}
