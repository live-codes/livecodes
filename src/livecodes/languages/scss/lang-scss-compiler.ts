import type { CompilerFunction } from '../../models';
import { modulesService } from '../../services/modules';
import { getLanguageCustomSettings } from '../../utils';

(self as any).createScssCompiler = (): CompilerFunction => {
  const sass = (window as any).sass;
  const cachedStyles = new Map<string, string>();
  return async (code, { config, language }): Promise<string> => {
    const syntax = language === 'sass' ? 'indented' : 'scss';
    const customSettings = getLanguageCustomSettings(language, config);
    let baseUrl: string | null = null;

    const moduleServiceUrl = modulesService.getUrl('~').replace('~', '');

    const fetchStyles = (url: string): Promise<{ contents: string; syntax: string }> => {
      const cachedContents = cachedStyles.get(url);
      if (cachedContents) {
        return Promise.resolve({
          contents: cachedContents,
          syntax,
        });
      }
      const moduleUrl =
        baseUrl && baseUrl !== url ? new URL(url.replace(moduleServiceUrl, ''), baseUrl).href : url;
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
            const extension = '.' + language; // .scss or .sass
            const result: Promise<{ contents: string; syntax: string }> = fetchStyles(urlString)
              .catch(() => fetchStyles(urlString + extension))
              .catch(() => fetchStyles(urlString + '.css'))
              .catch(() => {
                const urlParts = urlString.split('/');
                const filename = urlParts[urlParts.length - 1];
                const prefix = filename.startsWith('_') ? '' : '_';
                urlParts[urlParts.length - 1] = prefix + filename + extension;
                return fetchStyles(urlParts.join('/'));
              })
              .catch(() => fetchStyles(urlString + '/_index' + extension))
              .catch(
                () =>
                  new Promise((resolve, reject) => {
                    fetch(urlString + '/package.json')
                      .then((res) => res.json())
                      .then((pkg) => {
                        let stylePath = pkg.style || pkg.sass;
                        if (!stylePath) {
                          const main = pkg.main;
                          if (main && (main.endsWith(extension) || main.endsWith('.css'))) {
                            stylePath = main;
                          }
                        }
                        if (stylePath) {
                          baseUrl = urlString + '/' + stylePath;
                          resolve(fetchStyles(baseUrl));
                        } else {
                          reject('Not found');
                        }
                      });
                  }),
              );
            return result.then((res) => {
              cachedStyles.set(urlString, res.contents);
              return res;
            });
          },
        },
      ],
    });

    return result.css || '';
  };
};
