import { IncomingLaunch } from '../../interfaces/launches.interfaces';
import { Planet } from '../../interfaces/planets.interfaces';
import { createPlanetMock } from './planets';

export function createLaunchMock(
  mission: string,
  rocket: string,
  launchDate: string,
  planet: Planet = createPlanetMock(),
): IncomingLaunch {
  return {
    mission,
    rocket,
    launchDate,
    planet,
  };
}
