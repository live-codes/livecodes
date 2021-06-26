/* eslint-disable import/no-internal-modules */
export { initializeApp, getApp } from 'firebase/app';
export {
  getAuth,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
  User as FirebaseUser,
} from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyBUM2Wc1c8ty2VqA-2GReorfVx5pOg4Ok4',
  authDomain: 'localpen-io.firebaseapp.com',
  projectId: 'localpen-io',
  storageBucket: 'localpen-io.appspot.com',
  messagingSenderId: '48384331783',
  appId: '1:48384331783:web:dd5e6fe161d5b512fe5aa2',
  measurementId: 'G-15VBRNJHBP',
};
