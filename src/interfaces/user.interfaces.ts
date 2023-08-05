export type UserAuthData = {
  username: string;
  email: string;
  password: string;
};

export type InDatabaseUser = {
  userId: string;
  username?: string;
  email: string;
  hashedPassword?: string;
  profileImageUrl?: string;
};

export type UserProfile = {
  username: string;
  profileImageUrl: string;
};

export type UserAuthRepository = {
  users?: InDatabaseUser[];
  signup(data: UserAuthData): Promise<void>;
  getUserByEmail(email: string): Promise<InDatabaseUser | void>;
  getUserById(userId: string): Promise<InDatabaseUser | void>;
  updateProfile(userId: string, newData: UserProfile): Promise<UserProfile>;
};

export type UserAuthWithoutPassword = Pick<UserAuthData, 'email' | 'username'>;
