import { chaiUrl, vendorsBaseUrl } from '../vendors';

export const testImports = {
  react: 'https://esm.sh/react?dev',
  '@testing-library/dom': vendorsBaseUrl + '@testing-library/dom.js',
  '@testing-library/jest-dom': vendorsBaseUrl + '@testing-library/jest-dom.js',
  '@testing-library/react': vendorsBaseUrl + '@testing-library/react.js',
  chai: chaiUrl,
};
