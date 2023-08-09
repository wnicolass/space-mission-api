import { cwd } from 'node:process';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { command, args } from './openssl-command';

async function createKeysFolder(): Promise<void> {
  const keysPath = join(cwd(), 'src', 'config', 'https', 'keys');

  try {
    console.log('Trying to create keys folder...');
    const createdFolder = await mkdir(keysPath, { recursive: true });
    if (!createdFolder) {
      throw new Error('Folder already exsits');
    }
    console.log(`Created folder: ${createdFolder}`);
    console.log('Generating private key...');
  } catch (err) {
    console.log('Keys folder already exists');
    console.log('Generating private key...');
  }
}

(async function main() {
  await createKeysFolder();
  const openssl = spawn(command, args);

  openssl.stdout.on('data', (data) => console.log(data));
  openssl.stderr.on('error', (err) => console.error(err));
  openssl.on('error', (err) => console.error(err));
  openssl.on('close', () => console.log('Certificate generated successfully!'));
})();
