import { describe, it, expect } from 'vitest';
import { joinLaunchFactory } from './join-launch';
import { inMemoryUserLaunchRepository } from '../../../repositories/in-memory/in-memory.userlaunch.repository';

function createJoinExpeditionMock(launchId: string, userId: string) {
  return {
    launchId,
    userId,
  };
}

describe('Join Launch Service', () => {
  const userLaunchRepository = inMemoryUserLaunchRepository();
  const sut = joinLaunchFactory(userLaunchRepository);
  it('should throw a LaunchNotFoundError of does not find launch by id', async () => {
    const joinExpeditionMock = createJoinExpeditionMock('123', '321');
    expect(sut.exec(joinExpeditionMock));
  });
});
