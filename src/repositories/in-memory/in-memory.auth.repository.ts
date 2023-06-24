import type { UserAuthRepository } from '../auth.repository';

export default function inMemoryUserAuthRepository(): UserAuthRepository {
  return {
    users: [],
    signup(data) {
      return new Promise((res) => {
        this.users?.push(data);
        res();
      });
    },
  };
}
