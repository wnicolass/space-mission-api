import { describe, it, expect } from 'vitest';
import { inMemoryLaunchRepository } from './in-memory.launch.repository';
import { createLaunchMock } from '../../tests-data/mocks/launches';

function createSut<T>(repo: () => T): T {
  const sut = repo();

  return sut;
}

describe('Launch Repository Tests', () => {
  it('should return an empty array of launches', async () => {
    const sut = createSut(inMemoryLaunchRepository);
    expect(sut.getAll()).resolves.toHaveLength(0);
  });

  it('should add a new launch', async () => {
    const sut = createSut(inMemoryLaunchRepository);
    const launchMock = createLaunchMock(
      'Test mission',
      'Test rocket',
      '2023-12-04',
    );
    await sut.save(launchMock);
    expect(sut.launches).toHaveLength(1);
  });
});
