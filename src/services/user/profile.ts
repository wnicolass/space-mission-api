import { UserNotFoundError } from '../../errors/auth.errors';
import { UserAuthRepository } from '../../interfaces/user.interfaces';

export function getUserProfileFactory(userRepository: UserAuthRepository) {
  return {
    async exec(userId: string) {
      const user = await userRepository.getUserById(userId);

      if (!user) {
        throw new UserNotFoundError('User does not exist');
      }

      return user;
    },
  };
}
