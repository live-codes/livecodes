/* eslint-disable import/no-internal-modules */
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
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
      const result = await signInWithPopup(auth, provider);
      const token = GithubAuthProvider.credentialFromResult(result)?.accessToken;
      if (!token) return;
      currentUser = result.user;
      saveToken(currentUser.uid, token);
      return getUserInfo(result.user, token);
    },
    signOut: async () => {
      await signOut(auth);
      deleteToken(currentUser?.uid);
      currentUser = null;
    },
  };
};

const saveToken = (uid: string, token: string) => {
  localStorage.setItem('token_' + uid, token);
};

const deleteToken = (uid?: string) => {
  if (!uid) return;
  localStorage.removeItem('token_' + uid);
};

const getToken = (uid?: string) => {
  if (!uid) return null;
  return localStorage.getItem('token_' + uid);
};

const getUserInfo = (user: FirebaseUser, token: string | null): User => ({
  uid: user.uid,
  displayName: user.displayName,
  email: user.email,
  photoURL: user.photoURL,
  token,
});
