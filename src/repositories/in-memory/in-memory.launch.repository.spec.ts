import { describe, it, expect, vi } from 'vitest';
import { inMemoryLaunchRepository } from './in-memory.launch.repository';
import { createLaunchMock } from '../../tests/mocks/launches';

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
    await sut.save(launchMock, 'safaf');
    expect(sut.launches).toHaveLength(1);
  });

  it('should return undefined if does not find launch by mission name', async () => {
    const sut = createSut(inMemoryLaunchRepository);
    const sutSpy = vi.spyOn(sut, 'getLaunchByMission');
    const missionFound = await sut.getLaunchByMission(
      'this mission does not exist',
    );
    expect(sutSpy).toBeCalledTimes(1);
    expect(missionFound).toBeFalsy();
  });
});
