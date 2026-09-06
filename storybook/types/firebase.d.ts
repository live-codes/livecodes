declare module 'firebase/auth' {
  export type User = any;
  export type Auth = any;
  export const GithubAuthProvider: any;
  export const getAuth: (app: any) => any;
  export const signInWithPopup: (auth: any, provider: any) => any;
  export const signOut: (auth: any) => any;
}

declare module 'firebase/app' {
  export type FirebaseApp = any;
  export type FirebaseOptions = any;
  export const getApp: () => any;
  export const initializeApp: (config: any) => any;
}
