import { GithubScope, User } from '../models';
import { getImportInstance } from '../utils';

type FirebaseUser = import('firebase/auth').User;

export const createAuthService = () => {
  let initializeApp: typeof import('firebase/app').initializeApp;
  let getApp: typeof import('firebase/app').getApp;
  let getAuth: typeof import('firebase/auth').getAuth;
  let signInWithPopup: typeof import('firebase/auth').signInWithPopup;
  let signOut: typeof import('firebase/auth').signOut;
  let GithubAuthProvider: typeof import('firebase/auth').GithubAuthProvider;
  let firebaseConfig: import('firebase/app').FirebaseOptions;
  let firebaseApp: import('firebase/app').FirebaseApp;
  let auth: import('firebase/auth').Auth;
  let currentUser: FirebaseUser | null;

  return {
    async load() {
      const firebase = await getImportInstance('./firebase.js');

      initializeApp = firebase.initializeApp;
      getApp = firebase.getApp;
      getAuth = firebase.getAuth;
      signInWithPopup = firebase.signInWithPopup;
      signOut = firebase.signOut;
      GithubAuthProvider = firebase.GithubAuthProvider;
      firebaseConfig = firebase.firebaseConfig;

      try {
        firebaseApp = getApp();
      } catch {
        firebaseApp = initializeApp(firebaseConfig);
      }
      auth = getAuth(firebaseApp);
      currentUser = auth.currentUser;
    },
    async getUser(): Promise<User | void> {
      if (!auth) {
        await this.load();
      }
      if (currentUser) {
        const token = getToken(currentUser.uid);
        return Promise.resolve(getUserInfo(currentUser, token));
      }
      return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user: FirebaseUser | null) => {
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
    async signIn(scopes: GithubScope[] = ['gist', 'repo']): Promise<User | void> {
      if (!auth) {
        await this.load();
      }
      const provider = new GithubAuthProvider();
      scopes.forEach((scope) => provider.addScope(scope));
      const result = await signInWithPopup(auth, provider);
      const token = GithubAuthProvider.credentialFromResult(result)?.accessToken;
      if (!token) return;
      currentUser = result.user;
      saveToken(currentUser.uid, token);
      return getUserInfo(result.user, token);
    },
    async signOut() {
      if (!auth) {
        await this.load();
      }
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
