import { describe, it, expect } from 'vitest';
import { inMemoryUserLaunchRepository } from './in-memory.userlaunch.repository';

describe('In Memory UserLaunch Repository', () => {
  const sut = inMemoryUserLaunchRepository();
  it('should find an expedition by launch id', async () => {
    const expeditionMock = {
      userId: 'sffsfaf',
      launchId: '123',
      launchDate: new Date('2025-12-12'),
    };
    sut.expeditions?.push(expeditionMock);
    expect(sut.getExpeditionByLaunchId('123')).resolves.toStrictEqual(
      expeditionMock,
    );
  });

  it('should find an expedition by launch and user id', async () => {
    const expeditionMock = {
      userId: '321',
      launchId: '123',
      launchDate: new Date('2025-12-12'),
    };
    sut.expeditions?.push(expeditionMock);
    expect(
      sut.getExpeditionByLaunchAndUserId('123', '321'),
    ).resolves.toStrictEqual(expeditionMock);
  });

  it('should join a user on an existing launch', async () => {
    const expeditionMock = {
      userId: '456',
      launchId: '654',
      launchDate: new Date('2025-12-12'),
    };
    expect(
      sut.joinLaunch(
        expeditionMock.launchId,
        expeditionMock.userId,
        expeditionMock.launchDate,
      ),
    ).resolves.not.toThrow();
    expect(sut.expeditions?.length).toBeGreaterThanOrEqual(1);
  });
});
