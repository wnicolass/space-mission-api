import type { UserAuthRepository } from '../../interfaces/auth.interfaces';

export default function inMemoryUserAuthRepository(): UserAuthRepository {
  return {
    users: [],
    signup(data) {
      return new Promise((res) => {
        this.users?.push(data);
        res();
      });
    },
    getUserByEmail(email) {
      return new Promise((res) => {
        if (this.users) {
          const user = this.users.find((user) => user.email === email);
          if (user) {
            return res(user);
          }
          return res(false);
        }
      });
    },
  };
}
