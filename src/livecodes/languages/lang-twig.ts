import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';
import { escapeCode, getLanguageCustomSettings } from './utils';

const url = 'https://cdn.jsdelivr.net/npm/twig@1.15.4/twig.min.js';

export const twig: LanguageSpecs = {
  name: 'twig',
  title: 'Twig',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url,
    factory: () => async (code, { config }) => {
      const options = getLanguageCustomSettings('twig', config);
      const data = config.customSettings.template?.data || {};

      if (config.customSettings.template?.prerender !== false) {
        const template = (self as any).Twig.twig({ ...options, data: code });
        return template.render(data);
      }

      return `<!-- ... compiling ... -->

  <script src="${url}"></script>
  <script>
  window.addEventListener("load", () => {
    const template = Twig.twig({
      ...${escapeCode(JSON.stringify(options))},
      data:\`${escapeCode(code)}\`
    });
    const content = template.render({
      ...${escapeCode(JSON.stringify(data || {}))},
      ...window.livecodes?.templateData,
    });
    document.body.innerHTML += content
    parent.postMessage({type: 'compiled', payload: {language: 'twig', content}}, '*');
  });
  </script>
  `;
    },
  },
  extensions: ['twig'],
  editor: 'markup',
  editorLanguage: 'html',
};
