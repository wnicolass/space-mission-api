import { hash, genSalt } from 'bcryptjs';
import { HashObject } from '../../interfaces/hash-service.interfaces';

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
