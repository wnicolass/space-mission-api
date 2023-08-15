import { describe, it, expect } from 'vitest';
import { inMemoryLaunchRepository } from '../../../repositories/in-memory/in-memory.launch.repository';
import { createLaunchMock } from '../../../tests/mocks/launches';
import { abortLaunchFactory } from './abort-launch';
import { InDatabaseLaunch } from '../../../interfaces/launches.interfaces';

describe('Abort Launch Service', () => {
  it('should throw an LaunchNotFoundError if no launches were found', async () => {
    const launchesRepository = inMemoryLaunchRepository();
    const abortLaunchService = abortLaunchFactory(launchesRepository);
    await expect(
      abortLaunchService.exec('fakeId', 'fakeUserId'),
    ).rejects.toThrowError('Launch not found');
  });

  it('should throw a ForbiddenError if the user who is trying to abort launch is not who have created the launch', async () => {
    const launchesRepository = inMemoryLaunchRepository();
    const launchMock = createLaunchMock(
      'Any mission',
      'Any rocket',
      '2029-12-12',
      'anyUserId',
    ) as InDatabaseLaunch;
    launchMock.launchId = 'removeme';
    launchesRepository.launches?.push(launchMock);
    const abortLaunchService = abortLaunchFactory(launchesRepository);
    await expect(
      abortLaunchService.exec('removeme', 'wrongUserId'),
    ).rejects.toThrowError(
      'Only the user who have created the launch can abort it',
    );
  });

  it('should abort a launch', async () => {
    const launchesRepository = inMemoryLaunchRepository();
    const launchMock = createLaunchMock(
      'Fake mission',
      'Fake rocket',
      '2029-12-12',
      'fakeUserId',
    ) as InDatabaseLaunch;
    launchMock.launchId = 'removeme';
    launchesRepository.launches?.push(launchMock);

    const abortLaunchService = abortLaunchFactory(launchesRepository);
    await expect(
      abortLaunchService.exec('removeme', launchMock.userId),
    ).resolves.not.toThrow();
  });
});
