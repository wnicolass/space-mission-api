import { hash, genSalt } from 'bcryptjs';

type HashObject = {
  readonly hashedPassword: string;
  readonly salt: string;
};

export default async function hashPassword(
  incomingPassword: string,
): Promise<HashObject> {
  const salt: string = await genSalt();
  const hashedPassword: string = await hash(incomingPassword, salt);
  return {
    hashedPassword,
    salt,
  };
}
