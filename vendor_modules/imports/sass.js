import Sass from 'sass.js/dist/sass';

export const createCompile = (config = {}) => {
  const baseUrl = config.baseUrl || '/localpen/';
  Sass.setWorkerUrl(baseUrl + 'vendor/sass.js/sass.worker.js');
  var sass = new Sass();

  return (code, options = {}) =>
    new Promise((resolve) => {
      sass.compile(code, options, (result) => {
        resolve(result);
      });
    });
};
