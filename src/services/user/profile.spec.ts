import { describe, it, expect } from 'vitest';
import { getUserProfileFactory } from './profile';
import { inDbUserWithProfileImage } from '../../tests/mocks/user';
import inMemoryUserAuthRepository from '../../repositories/in-memory/in-memory.user.repository';

describe('User Profile Service', () => {
  it('should throw an UserNotFoundError if does not find user by id', async () => {
    const userRepository = inMemoryUserAuthRepository();
    const getUserProfileService = getUserProfileFactory(userRepository);
    await expect(getUserProfileService.exec('any_id')).rejects.toThrowError(
      'User does not exist',
    );
  });

  it('should return a user', async () => {
    const userRepository = inMemoryUserAuthRepository();
    userRepository.users?.push(inDbUserWithProfileImage);
    const getUserProfileService = getUserProfileFactory(userRepository);
    await expect(getUserProfileService.exec('anyId')).resolves.not.toThrow();
  });
});
