import planetRepositoryFactory from '../../repositories/prisma/prisma-planet.repository';

type planetByIdArgs = {
  planetId: string;
};

export default (function planetsResolvers() {
  const planetsRepository = planetRepositoryFactory();

  return {
    Query: {
      planets: async () => {
        return await planetsRepository.getAll();
      },
      planetById: async (_: unknown, args: planetByIdArgs) => {
        return await planetsRepository.getPlanetById(args.planetId);
      },
    },
  };
})();
