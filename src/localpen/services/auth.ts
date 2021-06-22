/* eslint-disable import/no-internal-modules */
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
  browserLocalPersistence,
  User as FirebaseUser,
} from 'firebase/auth';
import { GithubScope, User } from '../models';
import { firebaseConfig } from './firebase-config';

export const createAuthService = () => {
  const firebaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);
  let currentUser = auth.currentUser;

  return {
    getUser: (): Promise<User | void> => {
      if (currentUser) {
        const token = getToken(currentUser.uid);
        return Promise.resolve(getUserInfo(currentUser, token));
      }
      return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (!user) {
            resolve(undefined);
          } else {
            currentUser = user;
            unsubscribe();
            const token = getToken(currentUser.uid);
            resolve(getUserInfo(currentUser, token));
          }
        });
      });
    },
    signIn: async (scopes: GithubScope[] = ['gist', 'repo']): Promise<User | void> => {
      const provider = new GithubAuthProvider();
      scopes.forEach((scope) => provider.addScope(scope));
      provider.setCustomParameters({
        // eslint-disable-next-line camelcase
        allow_signup: 'false',
      });
      const auth = getAuth(firebaseApp);
      auth.setPersistence(browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      if (!token) return;
      currentUser = result.user;
      saveToken(currentUser.uid, token);
      return getUserInfo(result.user, token);
    },
    signOut: async () => {
      const auth = getAuth(firebaseApp);
      await signOut(auth);
      deleteToken(currentUser?.uid);
      currentUser = null;
    },
  };
};

const saveToken = (uid: string, token: string) => {
  window.localStorage.setItem('token_' + uid, token || '');
};

const deleteToken = (uid?: string) => {
  if (!uid) return;
  window.localStorage.removeItem('token_' + uid);
};

const getToken = (uid?: string) => {
  if (!uid) return null;
  const token = window.localStorage.getItem('token_' + uid);
  return token;
};

const getUserInfo = (user: FirebaseUser, token: string | null): User => ({
  token,
  uid: user.uid,
  displayName: user.displayName,
  email: user.email,
  photoURL: user.photoURL,
});
