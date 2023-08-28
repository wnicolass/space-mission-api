import { describe, it, expect } from 'vitest';
import inMemoryUserAuthRepository from '../../repositories/in-memory/in-memory.user.repository';
import { getUserProfileFactory } from './profile';

describe('User Profile Service', () => {
  it('should throw an UserNotFoundError if does not find user by id', async () => {
    const userRepository = inMemoryUserAuthRepository();
    const getUserProfileService = getUserProfileFactory(userRepository);
    await expect(getUserProfileService.exec('any_id')).rejects.toThrowError(
      'User does not exist',
    );
  });
});
