/* eslint-disable import/no-internal-modules */
export { initializeApp, getApp } from 'firebase/app';
export type { User as FirebaseUser } from 'firebase/auth';
export { getAuth, signInWithPopup, signOut, GithubAuthProvider } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyB352dJ_NKCZ43G5kv9Lt-sb5nMXTJRONQ',
  authDomain: 'livecodes-io.firebaseapp.com',
  projectId: 'livecodes-io',
  storageBucket: 'livecodes-io.appspot.com',
  messagingSenderId: '756660932772',
  appId: '1:756660932772:web:4cbbf58f809d81c2189631',
  measurementId: 'G-C5WYBVEKF7',
};
