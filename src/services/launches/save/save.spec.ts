import { describe, expect, beforeEach } from 'vitest';
import {
  LaunchTestContext,
  it,
} from '../../../tests/utils/launches-test-context';
import { saveLaunchFactory } from './save';
import { inMemoryLaunchRepository } from '../../../repositories/in-memory/in-memory.launch.repository';
import { createLaunchMock } from '../../../tests/mocks/launches';
import { createUserMock } from '../../../tests/mocks/user';
import inMemoryUserAuthRepository from '../../../repositories/in-memory/in-memory.user.repository';
import { LaunchRepository } from '../../../interfaces/launches.interfaces';
import { UserAuthRepository } from '../../../interfaces/user.interfaces';
import { PlanetRepository } from '../../../interfaces/planets.interfaces';
import planetRepositoryFactory from '../../../repositories/prisma/prisma-planet.repository';

function createSut(
  launchRepository: LaunchRepository,
  userRepository: UserAuthRepository,
  planetRepository: PlanetRepository,
) {
  const sut = saveLaunchFactory(
    launchRepository,
    userRepository,
    planetRepository,
  );
  const userMock = createUserMock('Test', 'testuser@mail.com');
  const launchMock = createLaunchMock(
    'Test mission',
    'Test Rocker IIC',
    '2023-12-12',
    userMock.userId,
  );
  return { sut, launchMock, userMock };
}

describe('Save Launch Service', () => {
  beforeEach<LaunchTestContext>((ctx) => {
    ctx.launchesRepository = inMemoryLaunchRepository();
    ctx.userRepository = inMemoryUserAuthRepository();
    ctx.planetRepository = planetRepositoryFactory();
  });

  it('should throw an InvalidLaunchDateError if provided invalid launch date', async ({
    launchesRepository,
    userRepository,
    planetRepository,
  }) => {
    const { sut, launchMock, userMock } = createSut(
      launchesRepository,
      userRepository,
      planetRepository,
    );
    userRepository.users?.push(userMock);
    launchMock.launchDate = '1999-12-13';
    expect(sut.exec(launchMock)).rejects.toThrowError('Invalid launch date');
  });

  it('should throw a LaunchAlreadyExistsError', async ({
    launchesRepository,
    userRepository,
    planetRepository,
  }) => {
    const { sut, launchMock } = createSut(
      launchesRepository,
      userRepository,
      planetRepository,
    );
    launchesRepository.launches?.push(launchMock);

    expect(sut.exec(launchMock)).rejects.toThrowError(
      `Launch with mission name "${launchMock.mission}" already exists`,
    );
  });

  it('should throw an UserNotFoundError if does not find user by id', async ({
    launchesRepository,
    userRepository,
    planetRepository,
  }) => {
    const { sut, launchMock } = createSut(
      launchesRepository,
      userRepository,
      planetRepository,
    );
    expect(sut.exec(launchMock)).rejects.toThrowError('User not found');
  });

  it('should throw a PlanetNotFoundError if invalid planet is provided', async ({
    launchesRepository,
    userRepository,
    planetRepository,
  }) => {
    const { sut, launchMock, userMock } = createSut(
      launchesRepository,
      userRepository,
      planetRepository,
    );
    userRepository.users?.push(userMock);
    launchMock.planet.planetName =
      'I am sure that this is not an habitable planet';
    expect(sut.exec(launchMock)).rejects.toThrowError('Invalid planet');
  });
});
