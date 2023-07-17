import { describe, it, expect, vi } from 'vitest';
import { saveLaunchFactory } from './save';
import { inMemoryLaunchRepository } from '../../../repositories/in-memory/in-memory.launch.repository';
import { createLaunchMock } from '../../../tests-data/mocks/launches';

function createSut() {
  return saveLaunchFactory(inMemoryLaunchRepository());
}

describe('Save Launch Service', () => {
  it('should throw a launch already exists error', async () => {
    const sut = createSut();
    const launchMock = createLaunchMock(
      'Test mission',
      'Test Rocker IIC',
      '2023-12-12',
    );
    expect(sut.exec(launchMock)).rejects.toThrowError(
      `Mission name: ${launchMock.mission} already exists`,
    );
  });
});
