import planetRepositoryFactory from '../../repositories/prisma/prisma-planet.repository';

export default {
  Query: {
    planets: async () => {
      const planetsRepository = planetRepositoryFactory();
      const planets = await planetsRepository.getAll();
      console.log(planets);
      return planets;
    },
  },
};
