export { getApp, initializeApp } from 'firebase/app';
export { GithubAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
export type { User as FirebaseUser } from 'firebase/auth';

let selfHostedConfig: any;
if (process.env.FIREBASE_CONFIG) {
  try {
    selfHostedConfig = JSON.parse(process.env.FIREBASE_CONFIG);
  } catch {
    // eslint-disable-next-line no-console
    console.warn('Failed to parse FIREBASE_CONFIG. Falling back to default config.');
  }
}

export const firebaseConfig = selfHostedConfig || {
  apiKey: 'AIzaSyB352dJ_NKCZ43G5kv9Lt-sb5nMXTJRONQ',
  authDomain: 'livecodes-io.firebaseapp.com',
  projectId: 'livecodes-io',
  storageBucket: 'livecodes-io.appspot.com',
  messagingSenderId: '756660932772',
  appId: '1:756660932772:web:4cbbf58f809d81c2189631',
  measurementId: 'G-C5WYBVEKF7',
};
