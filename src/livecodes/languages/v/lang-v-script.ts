/* eslint-disable no-console */
declare const main: any;
(window as any).livecodes.v = {
  run: (fn: (...args: any) => any) => fn(main),
};
(window as any).process = {
  stdout: {
    write: console.log,
  },
  stderr: {
    write: console.error,
  },
  exit: (num: number = 0) => {
    console.log('Exit code:', num);
  },
};
