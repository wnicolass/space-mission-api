import launchRepositoryFactory from '../../repositories/prisma/prisma-launch.repository';
import planetRepositoryFactory from '../../repositories/prisma/prisma-planet.repository';
import userAuthRepositoryFactory from '../../repositories/prisma/prisma-user-auth.repository';
import { UserContext } from '../context';
import { saveLaunchFactory } from '../../services/launches/save/save';
import { joinLaunchFactory } from '../../services/launches/join/join-launch';
import { ensureUserInContext } from '../helpers/validate-context-user';
import { getAllLaunchesFactory } from '../../services/launches/get-all/get-all-launches';
import userLaunchRepositoryFactory from '../../repositories/prisma/prisma-userlaunch.repository';

type IncomingLaunchGQL = {
  mission: string;
  rocket: string;
  launchDate: string;
  planet: string;
};

export default (function launchesResolvers() {
  const userRepository = userAuthRepositoryFactory();
  const launchRepository = launchRepositoryFactory();
  const planetRepository = planetRepositoryFactory();
  const userLaunchRepository = userLaunchRepositoryFactory();

  return {
    Query: {
      launches: async () => {
        const getAllLaunchesService = getAllLaunchesFactory(launchRepository);
        const launches = await getAllLaunchesService.exec();
        console.log(launches);
        return launches;
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
      joinLaunch: async (
        _: unknown,
        args: Record<'launchId', string>,
        context: UserContext,
      ) => {
        ensureUserInContext(context);
        const joinLaunchService = joinLaunchFactory(userLaunchRepository);
        const joinLaunchData = {
          userId: context.user!.userId,
          launchId: args.launchId,
        };
        await joinLaunchService.exec(joinLaunchData);
        return {
          message: 'Successfully joined launch',
        };
      },
    },
  };
})();
