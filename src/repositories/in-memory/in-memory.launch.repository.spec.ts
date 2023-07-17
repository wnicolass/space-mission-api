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

function createPlanetMock(): Planet {
  return {
    planetName: 'Kepler-442 b',
  };
}

describe('Launch Repository Tests', () => {
  it('should return an empty array of launches', async () => {
    const sut = createSut(inMemoryLaunchRepository);
    expect(sut.getAll()).resolves.toHaveLength(0);
  });

  it('should add a new launch', async () => {
    const sut = createSut(inMemoryLaunchRepository);
    const planetMock = createPlanetMock();
    const launchMock = createLaunchMock(
      'Test mission',
      'Test rocket',
      '2023-12-04',
      planetMock,
    );
    await sut.save(launchMock);
    expect(sut.launches).toHaveLength(1);
  });
});
