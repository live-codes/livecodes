// eslint-disable-next-line import/no-internal-modules
import { compress, decompress } from '../utils/compression';
import type { Storage } from './models';
import { createStorage } from './storage';

let keyStorage: Storage<string>;
const loadStorage = async () => {
  keyStorage = keyStorage || (await createStorage('__livecodes_key__', false));
};

const encode = (text: string) => {
  const enc = new TextEncoder();
  return enc.encode(text);
};

const decode = (encoded: BufferSource) => {
  const dec = new TextDecoder();
  return dec.decode(encoded);
};

const saveKey = async (key: string) => {
  await loadStorage();
  await keyStorage.updateItem('__livecodes_key_id__', compress(key));
};

const loadKey = async () => {
  await loadStorage();
  const key = await keyStorage.getItem('__livecodes_key_id__');
  return key ? decompress(key) : null;
};

const generateKey = async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt'],
  );
  const publicKey = await crypto.subtle.exportKey('jwk', keyPair.publicKey as CryptoKey);
  const privateKey = await crypto.subtle.exportKey('jwk', keyPair.privateKey as CryptoKey);
  const keyString = JSON.stringify({ public: publicKey, private: privateKey });
  await saveKey(keyString);
  return keyString;
};

const importKey = async (key: string) =>
  crypto.subtle.importKey(
    'jwk',
    JSON.parse((await loadKey()) || (await generateKey()))[key],
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    key === 'public' ? ['encrypt'] : ['decrypt'],
  );

export const encrypt = async (text: string): Promise<string> => {
  const encoded = encode(text);
  const importedKey = await importKey('public');
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    importedKey,
    encoded,
  );
  return JSON.stringify(Array.from(new Uint8Array(encrypted)));
};

export const decrypt = async (encrypted: string): Promise<string | null> => {
  try {
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      await importKey('private'),
      new Uint8Array(JSON.parse(encrypted)),
    );
    return decode(decrypted);
  } catch {
    return null;
  }
};
