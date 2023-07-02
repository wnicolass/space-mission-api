import { compare } from 'bcryptjs';

export default async function checkPasswords(
  incomingPassword: string,
  databasePassword: string,
): Promise<boolean> {
  return await compare(incomingPassword, databasePassword);
}
