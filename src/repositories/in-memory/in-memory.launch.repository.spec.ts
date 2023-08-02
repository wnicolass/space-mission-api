import { describe, it, expect, vi } from 'vitest';
import { inMemoryLaunchRepository } from './in-memory.launch.repository';
import { createLaunchMock } from '../../tests/mocks/launches';
import { InDatabaseLaunch } from '../../interfaces/launches.interfaces';

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
      'fsdfsdfsd',
    );
    await sut.save(launchMock);
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

  it('should get a launch by id', async () => {
    const sut = createSut(inMemoryLaunchRepository);
    const launchMock = createLaunchMock(
      'The mission',
      'The rocket',
      '2023-12-12',
      'fsfdsfssdfsd',
    ) as InDatabaseLaunch;
    launchMock.launchId = 'someId';
    sut.launches?.push(launchMock);
    const sutSpy = vi.spyOn(sut, 'getLaunchById');
    const missionFound = await sut.getLaunchById('someId');
    expect(sutSpy).toBeCalledTimes(1);
    expect(missionFound).toStrictEqual(launchMock);
  });

  it('should add a new userId to the launch users array', async () => {
    const sut = createSut(inMemoryLaunchRepository);
    const launchMock = createLaunchMock(
      'Test mission',
      'Tester IIC-2',
      '2023-12-12',
      'fsfdsfssdfsd',
    ) as InDatabaseLaunch;
    launchMock.launchId = 'someId';
    sut.launches?.push(launchMock);
    await sut.join(launchMock.launchId, 'fdsfdsfsd');
    expect(launchMock.users).toHaveLength(1);
  });

  it('should remove a launch by id', async () => {
    const sut = createSut(inMemoryLaunchRepository);
    const launchMock = createLaunchMock(
      'Test mission 2',
      'Tester IIC-3',
      '2023-11-11',
      'fsfdsfssdfsd',
    ) as InDatabaseLaunch;
    launchMock.launchId = 'removeMe';
    sut.launches?.push(launchMock);
    await sut.abort('removeMe');
    expect(sut.launches).toHaveLength(0);
  });
});
