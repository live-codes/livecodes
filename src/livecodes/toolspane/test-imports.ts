import { chaiUrl, vendorsBaseUrl } from '../vendors';

export const testImports = {
  react: 'https://esm.sh/react?dev',
  'react/jsx-runtime': 'https://esm.sh/react/jsx-runtime?dev',
  'react-dom': 'https://esm.sh/react-dom?dev',
  'react-dom/client': 'https://esm.sh/react-dom/client?dev',
  'react-dom/test-utils': 'https://esm.sh/react-dom/test-utils?dev',
  '@testing-library/dom': vendorsBaseUrl + '@testing-library/dom.js',
  '@testing-library/jest-dom': vendorsBaseUrl + '@testing-library/jest-dom.js',
  '@testing-library/react': vendorsBaseUrl + '@testing-library/react.js',
  '@testing-library/react/pure': vendorsBaseUrl + '@testing-library/react-pure.js',
  '@testing-library/user-event': vendorsBaseUrl + '@testing-library/user-event.js',
  chai: chaiUrl,
};
