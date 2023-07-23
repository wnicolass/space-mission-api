import { describe, it, expect } from 'vitest';
import { inMemoryUserLaunchRepository } from './in-memory.userlaunch.repository';

describe('In Memory UserLaunch Repository', () => {
  const sut = inMemoryUserLaunchRepository();
  it('should find a launch by id', async () => {
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
});
