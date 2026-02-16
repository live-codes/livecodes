import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';

export const dotenv: LanguageSpecs = {
  name: 'dotenv',
  title: '.env',
  info: false,
  compiler: {
    url: vendorsBaseUrl + 'dotenv/dotenv.js',
    factory: () => async (code) =>
      JSON.stringify((self as any).dotenv.parseAndExpand(code), null, 2),
    compiledCodeLanguage: 'json',
  },
  extensions: [
    'env',
    'env.local',
    'env.development',
    'env.production',
    'env.development.local',
    'env.production.local',
  ],
  editor: '',
  multiFileSupport: true,
};
