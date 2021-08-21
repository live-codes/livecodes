// export const sandboxService = {
//   getResultUrl: () => 'https://localpen-sandbox.pages.dev/v1/result',
//   getCompilerUrl: () => 'https://localpen-sandbox.pages.dev/v1/compiler',
//   getOrigin: () => 'https://localpen-sandbox.pages.dev',
// };
export const sandboxService = {
  getResultUrl: () => '/result.html',
  getCompilerUrl: () => '/compiler.html',
  getOrigin: () => location.origin,
};
