import planetRepositoryFactory from '../../repositories/prisma/prisma-planet.repository';

export default {
  Query: {
    planets: async () => {
      const planetsRepository = planetRepositoryFactory();
      return await planetsRepository.getAll();
    },
  },
};
