export type SignUpData = {
  username: string;
  email: string;
  password: string;
  profileImageUrl?: string;
};

export type UserAuthData = Pick<SignUpData, 'username' | 'email' | 'password'>;

export type UserAuthWithoutPassword = Pick<UserAuthData, 'email' | 'username'>;

export type UserAuthRepository = {
  users?: UserAuthData[];
  signup(data: SignUpData): Promise<void>;
  getUserByEmail(email: string): Promise<boolean>;
};
