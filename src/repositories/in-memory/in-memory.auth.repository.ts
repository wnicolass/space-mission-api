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
    getUserByEmail(email) {
      return new Promise((res) => {
        let userAlreadyExists = false;
        if (this.users) {
          for (const user of this.users) {
            if (user.email === email) {
              userAlreadyExists = true;
              res(userAlreadyExists);
            }
          }
        }
        return userAlreadyExists;
      });
    },
  };
}
