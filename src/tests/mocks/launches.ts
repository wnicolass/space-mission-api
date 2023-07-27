import { IncomingLaunch } from '../../interfaces/launches.interfaces';
import launchRepositoryFactory from '../../repositories/prisma/prisma-launch.repository';
import { Planet } from '../../interfaces/planets.interfaces';
import { createPlanetMock } from './planets';
import { Launch } from '@prisma/client';

export function createLaunchMock(
  mission: string,
  rocket: string,
  launchDate: string,
  userId: string,
  planet: Planet = createPlanetMock(),
): IncomingLaunch {
  return {
    mission,
    rocket,
    launchDate,
    planet,
    userId,
  };
}

export async function createDbLaunchMock(
  mission: string,
  rocket: string,
  launchDate: string,
  userId: string,
  planet: Planet = createPlanetMock(),
): Promise<void | Launch> {
  const launchRepository = launchRepositoryFactory();
  const newLaunch = {
    mission,
    rocket,
    launchDate,
    userId,
    planet,
  };
  return await launchRepository.save(newLaunch);
}
