import { randomUUID } from 'node:crypto';
import type {
  InDatabaseUser,
  UserAuthRepository,
} from '../../interfaces/user.interfaces';

export default function inMemoryUserAuthRepository(): UserAuthRepository {
  return {
    users: [],
    signup({ email, username, password }) {
      return new Promise((res) => {
        const newUser: InDatabaseUser = {
          email,
          username,
          hashedPassword: password,
          userId: randomUUID(),
        };
        this.users?.push(newUser);
        res();
      });
    },
    getUserByEmail(email) {
      return new Promise((res) => {
        const userFound = this.users?.find((user) => user.email === email);
        if (!userFound) {
          return res();
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return res(userFound);
      });
    },
    getUserById(userId) {
      return new Promise((res) => {
        res(this.users?.find((user) => user.userId === userId));
      });
    },
    updateProfile(userId, newData) {
      return new Promise((res) => {
        this.users?.forEach((user) => {
          if (user.userId === userId) {
            const updatedUserData = {
              ...user,
              ...newData,
            };
            user = updatedUserData;
            return res({
              username: updatedUserData.username,
              profileImageUrl: updatedUserData.profileImageUrl,
            });
          }
        });
      });
    },
  };
}
