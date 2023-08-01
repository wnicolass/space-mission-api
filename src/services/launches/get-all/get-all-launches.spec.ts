import { describe, it, expect } from 'vitest';
import { inMemoryLaunchRepository } from '../../../repositories/in-memory/in-memory.launch.repository';
import { createLaunchMock } from '../../../tests/mocks/launches';
import { getAllLaunchesFactory } from './get-all-launches';

describe('Get All Launches Service', () => {
  it('should throw an LaunchNotFoundError if no launches were found', async () => {
    const launchesRepository = inMemoryLaunchRepository();
    const getAllLaunchesService = getAllLaunchesFactory(launchesRepository);
    await expect(getAllLaunchesService.exec()).rejects.toThrowError(
      'No launches were found',
    );
  });

  it('should return an array of launches', async () => {
    const launchesRepository = inMemoryLaunchRepository();
    const launchMock = createLaunchMock(
      'Amazing Mission',
      'Amazing Rocket IIC',
      '2023-12-25',
      'sdfdasfafd',
    );
    launchesRepository.launches?.push(launchMock);
    const getAllLaunchesService = getAllLaunchesFactory(launchesRepository);
    await expect(getAllLaunchesService.exec()).resolves.toHaveLength(1);
  });
});
