import type { CompilerFunction } from '../../models';
import { modulesService } from '../../services/modules';
import { getLanguageCustomSettings } from '../../utils';

(self as any).createScssCompiler = (): CompilerFunction => {
  const sass = (window as any).sass;
  const cachedStyles = new Map<string, string>();
  return async (code, { config, language }): Promise<string> => {
    const customSettings = getLanguageCustomSettings(language, config);
    let baseUrl: string | null = null;

    const moduleServiceUrl = modulesService.getUrl('~').replace('~', '');

    const getSyntax = (filename: string, content: string): 'indented' | 'scss' => {
      if (filename.endsWith('.scss')) return 'scss';
      if (filename.endsWith('.sass')) return 'indented';
      if (!content.includes(';') && !content.includes('{')) return 'indented';
      return 'scss';
    };

    const fetchStyles = (url: string): Promise<{ contents: string; syntax: string }> => {
      const cachedContents = cachedStyles.get(url);
      if (cachedContents) {
        return Promise.resolve({
          contents: cachedContents,
          syntax: getSyntax(url, cachedContents),
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
            syntax: getSyntax(url, contents),
          };
          return result;
        });
    };

    const result = await sass.compileStringAsync(code, {
      ...customSettings,
      syntax: language === 'sass' ? 'indented' : 'scss',
      importers: [
        {
          canonicalize(url: string) {
            return new URL(url, moduleServiceUrl);
          },
          load(canonicalUrl: URL) {
            const urlString = canonicalUrl.href;
            const result: Promise<{ contents: string; syntax: string }> = fetchStyles(urlString)
              .catch(() => {
                const urlParts = urlString.split('/');
                const filename = urlParts[urlParts.length - 1];
                const prefix = filename.startsWith('_') ? '' : '_';
                urlParts[urlParts.length - 1] = prefix + filename + '.scss';
                return fetchStyles(urlParts.join('/'));
              })
              .catch(() => {
                const urlParts = urlString.split('/');
                const filename = urlParts[urlParts.length - 1];
                const prefix = filename.startsWith('_') ? '' : '_';
                urlParts[urlParts.length - 1] = prefix + filename + '.sass';
                return fetchStyles(urlParts.join('/'));
              })
              .catch(() => fetchStyles(urlString + '.scss'))
              .catch(() => fetchStyles(urlString + '.sass'))
              .catch(() => fetchStyles(urlString + '.css'))
              .catch(() => fetchStyles(urlString + '/_index' + '.scss'))
              .catch(() => fetchStyles(urlString + '/_index' + '.sass'))
              .catch(
                () =>
                  new Promise((resolve, reject) => {
                    fetch(urlString + '/package.json')
                      .then((res) => res.json())
                      .then((pkg) => {
                        let stylePath = pkg.style || pkg.sass;
                        if (!stylePath) {
                          const main = pkg.main;
                          if (
                            main &&
                            (main.endsWith('.scss') ||
                              main.endsWith('.sass') ||
                              main.endsWith('.css'))
                          ) {
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
