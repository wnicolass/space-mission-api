import { describe, it, expect } from 'vitest';
import { inMemoryLaunchRepository } from './in-memory.launch.repository';
import { IncomingLaunch } from '../../interfaces/launches.interfaces';
import { Planet } from '../../interfaces/planets.interfaces';

function createSut<T>(repo: () => T): T {
  const sut = repo();

  return sut;
}

function createLaunchMock(
  mission: string,
  rocket: string,
  launchDate: string,
  planet: Planet,
): IncomingLaunch {
  return {
    mission,
    rocket,
    launchDate,
    planet,
  };
}

describe('Launch Repository Tests', () => {
  it('should return an empty array of launches', async () => {
    const sut = createSut(inMemoryLaunchRepository);
    expect(sut.getAll()).resolves.toHaveLength(0);
  });

  // it('should add a new launch', async () => {
  //   const sut = createSut(inMemoryLaunchRepository);
  //   const planetMock =
  // });
});
