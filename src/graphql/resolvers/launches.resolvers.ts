import launchRepositoryFactory from '../../repositories/prisma/prisma-launch.repository';
import planetRepositoryFactory from '../../repositories/prisma/prisma-planet.repository';
import userAuthRepositoryFactory from '../../repositories/prisma/prisma-user-auth.repository';
import { UserContext } from '../context';
import { saveLaunchFactory } from '../../services/launches/save/save';
import { ensureUserInContext } from '../helpers/validate-context-user';
import { getAllLaunchesFactory } from '../../services/launches/get-all/get-all-launches';

type IncomingLaunchGQL = {
  mission: string;
  rocket: string;
  launchDate: string;
  planet: string;
};

export default (function launchesResolvers() {
  const launchRepository = launchRepositoryFactory();
  const planetRepository = planetRepositoryFactory();
  const userRepository = userAuthRepositoryFactory();

  return {
    Query: {
      launches: async () => {
        const getAllLaunchesService = getAllLaunchesFactory(launchRepository);
        return await getAllLaunchesService.exec();
      },
    },
    Mutation: {
      saveLaunch: async (
        _: unknown,
        args: IncomingLaunchGQL,
        context: UserContext,
      ) => {
        ensureUserInContext(context);
        const newLaunch = {
          mission: args.mission,
          rocket: args.rocket,
          launchDate: args.launchDate,
          planet: {
            planetName: args.planet,
          },
          userId: context.user!.userId,
        };
        const saveLaunchService = saveLaunchFactory(
          launchRepository,
          userRepository,
          planetRepository,
        );
        await saveLaunchService.exec(newLaunch);
        return {
          message: 'Launch successfully created',
        };
      },
    },
  };
})();
