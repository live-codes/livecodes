import type { LanguageSpecs } from '../../models';
import { rippleUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const ripple: LanguageSpecs = {
  name: 'ripple',
  title: 'Ripple',
  info: false,
  parser: {
    name: 'ripple',
    pluginUrls: [parserPlugins.ripple],
  },
  compiler: {
    factory: async () => {
      // TODO: convert to UMD
      const { compile } = await import(rippleUrl);
      return async (code) => {
        if (!code.trim()) return '';
        const { js, css } = await compile(code, './src/App.ripple');
        const cssCode =
          css === ''
            ? ''
            : `\n\nconst styles = document.createElement('style');\nstyles.innerHTML = ${JSON.stringify(css)};\ndocument.head.appendChild(styles);\n`;
        return `${js.code}${cssCode}`;
      };
    },
  },
  extensions: ['ripple'],
  editor: 'script',
};
