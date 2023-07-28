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
});
