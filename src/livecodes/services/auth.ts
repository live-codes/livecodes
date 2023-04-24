/* eslint-disable @typescript-eslint/no-empty-function */
import type { GithubScope, User } from '../models';
import { decrypt, encrypt } from '../storage';
import { getImportInstance } from '../utils';

type FirebaseUser = import('firebase/auth').User;
interface AuthService {
  load(): Promise<void>;
  getUser(): Promise<User | void>;
  signIn(scopes?: GithubScope[]): Promise<User | void>;
  signOut(): Promise<void>;
  isLoggedIn(): boolean;
}

const fakeAuthService: AuthService = {
  load: async () => {},
  getUser: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  isLoggedIn: () => false,
};

export const createAuthService = (isEmbed: boolean): AuthService => {
  // do not allow access to auth in embeds
  if (isEmbed) return fakeAuthService;

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
      const firebase = await getImportInstance('./{{hash:firebase.js}}');

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
        if (!(await getToken(currentUser.uid))) {
          return;
        }
        return Promise.resolve(await getUserInfo(currentUser));
      }
      return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged(async (user: FirebaseUser | null) => {
          if (!user) {
            resolve(undefined);
          } else {
            currentUser = user;
            unsubscribe();
            resolve(await getUserInfo(currentUser));
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
      await saveToken(currentUser.uid, token);
      await fetchUserName(currentUser);
      return getUserInfo(result.user);
    },
    async signOut() {
      if (!auth) {
        await this.load();
      }
      await signOut(auth);
      deleteUserData(currentUser?.uid);
      currentUser = null;
    },
    isLoggedIn() {
      return currentUser != null;
    },
  };
};

const saveToken = async (uid: string, token: string) => {
  localStorage.setItem('token_' + uid, await encrypt(token));
};

const getToken = async (uid?: string) => {
  if (!uid) return null;
  const token = localStorage.getItem('token_' + uid);
  if (!token) return null;
  return decrypt(token);
};

const saveUsername = (uid: string, username: string) => {
  localStorage.setItem('username_' + uid, username);
};

const deleteUserData = (uid?: string) => {
  if (!uid) return;
  localStorage.removeItem('token_' + uid);
  localStorage.removeItem('username_' + uid);
};

const getUserInfo = async (user: FirebaseUser): Promise<User> => ({
  uid: user.uid,
  displayName: user.displayName,
  username: await fetchUserName(user),
  email: user.email,
  photoURL: user.photoURL,
  token: await getToken(user.uid),
});

const fetchUserName = async (user: FirebaseUser) => {
  const uid = user.uid;

  const fromLocalStorage = localStorage.getItem('username_' + uid);
  if (fromLocalStorage) {
    return fromLocalStorage;
  }

  const fromUserInfo = (user as any).reloadUserInfo?.screenName;
  if (fromUserInfo) {
    saveUsername(uid, fromUserInfo);
    return fromUserInfo;
  }

  const response = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: 'token ' + (await getToken(uid)),
    },
  });
  const userInfo = await response.json();
  const login = userInfo.login;
  saveUsername(uid, login);
  return login;
};
