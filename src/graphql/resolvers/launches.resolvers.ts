import launchRepositoryFactory from '../../repositories/prisma/prisma-launch.repository';

export default (function launchesResolvers() {
  const launchRepository = launchRepositoryFactory();

  return {
    Query: {
      launches: async () => {
        return await launchRepository.getAll();
      },
    },
  };
})();
