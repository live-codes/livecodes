import { LanguageSpecs } from '../models';
import { vendorsBaseUrl } from '../vendors';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

export const scss: LanguageSpecs = {
  name: 'scss',
  title: 'SCSS',
  parser: {
    name: 'scss',
    pluginUrls: [parserPlugins.postcss],
  },
  compiler: {
    url: vendorsBaseUrl + 'sass/sass.js',
    factory: () => {
      const sass = (window as any).sass;
      return async (code, { config, language }): Promise<string> => {
        const syntax = language === 'sass' ? 'indented' : 'scss';
        const customSettings = getLanguageCustomSettings(language, config);
        let baseUrl: string | null = null;

        const moduleServiceUrl = 'https://cdn.jsdelivr.net/npm/';

        const fetchStyles = (url: string) => {
          const moduleUrl =
            baseUrl && baseUrl !== url
              ? new URL(url.replace(moduleServiceUrl, ''), baseUrl).href
              : url;
          const module = moduleUrl.replace(moduleServiceUrl, '');
          const moduleParts = module.split('/');

          if (
            moduleParts.length === 1 ||
            (moduleParts.length === 2 && moduleParts[0].startsWith('@'))
          ) {
            return Promise.reject('not a valid URL!');
          }

          return fetch(moduleUrl)
            .then((res) => {
              if (!res.ok) return Promise.reject('URL not found: ' + moduleUrl);
              return res.text();
            })
            .then((contents) => {
              const result = {
                contents,
                syntax,
              };
              return result;
            });
        };

        const result = await sass.compileStringAsync(code, {
          ...customSettings,
          syntax,
          importers: [
            {
              canonicalize(url: string) {
                return new URL(url, moduleServiceUrl);
              },
              load(canonicalUrl: URL) {
                const urlString = canonicalUrl.href;
                return fetchStyles(urlString)
                  .catch(() => {
                    const urlParts = urlString.split('/');
                    const filename = urlParts[urlParts.length - 1];
                    const prefix = filename.startsWith('_') ? '' : '_';
                    urlParts[urlParts.length - 1] = prefix + filename + '.scss';
                    return fetchStyles(urlParts.join('/'));
                  })
                  .catch(() => fetchStyles(urlString + '.scss'))
                  .catch(
                    () =>
                      new Promise((resolve, reject) => {
                        fetch(urlString + '/package.json')
                          .then((res) => res.json())
                          .then((pkg) => {
                            if (pkg.sass) {
                              baseUrl = urlString + '/' + pkg.sass;
                              resolve(fetchStyles(baseUrl));
                            } else if (pkg.style) {
                              baseUrl = urlString + '/' + pkg.style;
                              resolve(fetchStyles(baseUrl));
                            } else {
                              reject('Not found');
                            }
                          });
                      }),
                  );
              },
            },
          ],
        });

        return result.css || '';
      };
    },
  },
  extensions: ['scss'],
  editor: 'style',
};
