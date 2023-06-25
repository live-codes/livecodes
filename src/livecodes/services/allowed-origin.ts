export const allowedOrigin = (origin = location.origin) =>
  Boolean(
    origin &&
      (origin.endsWith('livecodes.io') ||
        origin.endsWith('livecodes.pages.dev') ||
        origin.endsWith('localpen.pages.dev') ||
        origin.startsWith('http://127.0.0.1') ||
        origin.startsWith('http://localhost')),
  );

export const whitelistTarget = (url: string) =>
  new RegExp(/^(?:(?:http|https):\/\/(?:\w+.)?)(githubusercontent.com|jsbin.com|)\/(?:.*)/g).test(
    url,
  );
