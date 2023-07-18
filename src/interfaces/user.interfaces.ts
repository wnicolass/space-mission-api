export type SignUpData = {
  username: string;
  email: string;
  password: string;
  profileImageUrl?: string;
};

export type UserAuthData = Pick<SignUpData, 'username' | 'email' | 'password'>;

export type UserAuthWithoutPassword = Pick<UserAuthData, 'email' | 'username'>;

export type InDatabaseUser = {
  userId: string;
  username?: string;
  email: string;
  hashedPassword?: string;
};

export type UserAuthRepository = {
  users?: InDatabaseUser[];
  signup(data: SignUpData): Promise<void>;
  getUserByEmail(email: string): Promise<InDatabaseUser | void>;
  getUserById(userId: string): Promise<InDatabaseUser | void>;
};
