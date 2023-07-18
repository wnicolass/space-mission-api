import { describe, expect, beforeEach } from 'vitest';
import {
  LaunchTestContext,
  it,
} from '../../../tests-data/utils/launches-test-context';
import { saveLaunchFactory } from './save';
import { inMemoryLaunchRepository } from '../../../repositories/in-memory/in-memory.launch.repository';
import { createLaunchMock } from '../../../tests-data/mocks/launches';
import { createUserMock } from '../../../tests-data/mocks/user';
import inMemoryUserAuthRepository from '../../../repositories/in-memory/in-memory.user.repository';
import { LaunchRepository } from '../../../interfaces/launches.interfaces';
import { UserAuthRepository } from '../../../interfaces/user.interfaces';

function createSut(
  launchRepository: LaunchRepository,
  userRepository: UserAuthRepository,
) {
  const sut = saveLaunchFactory(launchRepository, userRepository);
  const launchMock = createLaunchMock(
    'Test mission',
    'Test Rocker IIC',
    '2023-12-12',
  );
  const userMock = createUserMock('Test', 'testuser@mail.com');
  return { sut, launchMock, userMock };
}

describe('Save Launch Service', () => {
  beforeEach<LaunchTestContext>((ctx) => {
    ctx.launchesRepository = inMemoryLaunchRepository();
    ctx.userRepository = inMemoryUserAuthRepository();
  });

  it('should throw a launch already exists error', async ({
    launchesRepository,
    userRepository,
  }) => {
    const { sut, launchMock, userMock } = createSut(
      launchesRepository,
      userRepository,
    );
    launchesRepository.launches?.push(launchMock);

    expect(sut.exec(launchMock, userMock.userId)).rejects.toThrowError(
      `Launch with mission name "${launchMock.mission}" already exists`,
    );
  });

  it('should throw a UserNotFoundError if does not find user by id', async ({
    launchesRepository,
    userRepository,
  }) => {
    const { sut, launchMock, userMock } = createSut(
      launchesRepository,
      userRepository,
    );
    expect(sut.exec(launchMock, userMock.userId)).rejects.toThrowError(
      'User not found',
    );
  });
});
