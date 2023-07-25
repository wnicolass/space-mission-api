import { describe, it, expect } from 'vitest';
import { joinLaunchFactory } from './join-launch';
import { inMemoryUserLaunchRepository } from '../../../repositories/in-memory/in-memory.userlaunch.repository';

function createJoinExpeditionMock(
  launchId: string,
  userId: string,
  launchDate: Date,
) {
  return {
    launchId,
    userId,
    launchDate,
  };
}

describe('Join Launch Service', () => {
  const userLaunchRepository = inMemoryUserLaunchRepository();
  const sut = joinLaunchFactory(userLaunchRepository);
  it('should throw a LaunchNotFoundError if does not find launch by id', async () => {
    const joinExpeditionMock = createJoinExpeditionMock(
      '123',
      '321',
      new Date('2023-12-12'),
    );
    await expect(sut.exec(joinExpeditionMock)).rejects.toThrowError(
      'Launch not found',
    );
  });

  it('should throw a UserAlreadyJoinedError if user already joined on launch', async () => {
    const joinExpeditionMock = createJoinExpeditionMock(
      '123',
      '321',
      new Date('2023-12-12'),
    );
    userLaunchRepository.expeditions?.push(joinExpeditionMock);
    await expect(sut.exec(joinExpeditionMock)).rejects.toThrowError(
      'User already joined',
    );
  });
});
