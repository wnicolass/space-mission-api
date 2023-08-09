export const command = 'openssl';
export const args = [
  'req',
  '-x509',
  '-newkey',
  'rsa:4096',
  '-nodes',
  '-keyout',
  './src/config/https/keys/key.pem',
  '-out',
  './src/config/https/cert.pem',
  '-days',
  '365',
  '-subj',
  '/C=US/O=./OU=/CN=SpaceMission',
];
