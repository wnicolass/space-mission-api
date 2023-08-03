import { describe, it, expect } from 'vitest';
import { inMemoryLaunchRepository } from '../../../repositories/in-memory/in-memory.launch.repository';
import { createLaunchMock } from '../../../tests/mocks/launches';
import { abortLaunchFactory } from './abort-launch';
import { InDatabaseLaunch } from '../../../interfaces/launches.interfaces';

describe('Get All Launches Service', () => {
  it('should throw an LaunchNotFoundError if no launches were found', async () => {
    const launchesRepository = inMemoryLaunchRepository();
    const abortLaunchService = abortLaunchFactory(launchesRepository);
    await expect(abortLaunchService.exec('fakeId')).rejects.toThrowError(
      'Launch not found',
    );
  });

  it('should throw an LaunchNotFoundError if no launches were found', async () => {
    const launchesRepository = inMemoryLaunchRepository();
    const launchMock = createLaunchMock(
      'Fake mission',
      'Fake rocket',
      '2029-12-12',
      'fakeUserId',
    ) as InDatabaseLaunch;
    launchMock.launchId = 'removeme';
    launchesRepository.launches?.push(launchMock);
    const getAllLaunchesService = abortLaunchFactory(launchesRepository);
    await expect(getAllLaunchesService.exec('removeme')).resolves.not.toThrow();
  });
});
