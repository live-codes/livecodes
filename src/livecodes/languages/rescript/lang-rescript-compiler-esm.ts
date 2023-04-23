import type { CompilerFunction } from '../../models';
import { getAbsoluteUrl, loadScript } from '../../utils';
import {
  requireUrl,
  rescriptCompilerUrl,
  rescriptReactUrl,
  rescriptStdLibBaseUrl,
} from '../../vendors';
// eslint-disable-next-line import/no-internal-modules
import { importsPattern } from '../../compiler/import-map';

const replaceImports = (code: string, stdLibUrl: string) =>
  code.replace(new RegExp(importsPattern), (statement) => {
    const libName = statement
      .replace(new RegExp(importsPattern), '$2')
      .replace(/"/g, '')
      .replace(/'/g, '');
    if (libName.startsWith('./stdlib/')) {
      return statement.replace('./stdlib/', stdLibUrl);
    }
    return statement;
  });

export const rescriptCompiler: CompilerFunction = async (code: string, { baseUrl, language }) =>
  new Promise(async (resolve, reject) => {
    if (!code) return resolve('');

    if (!(window as any).require) {
      await loadScript(requireUrl, 'require');
    }

    (window as any).require([rescriptCompilerUrl, rescriptReactUrl], () => {
      const compiler = (window as any).rescript_compiler.make();
      compiler.setModuleSystem('es6');
      compiler.setFilename('index.bs.js');

      const output = compiler[language].compile(code);
      try {
        if (output.type === 'success' && output.js_code) {
          return resolve(
            replaceImports(output.js_code, getAbsoluteUrl(rescriptStdLibBaseUrl, baseUrl)),
          );
        }
        if (output.errors) {
          output.errors.forEach((err: any) => {
            // eslint-disable-next-line no-console
            console.error(err.fullMsg);
          });
        } else if (output.msg) {
          // eslint-disable-next-line no-console
          console.warn(output.msg, output.type);
        }
        return reject('');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return reject('');
      }
    });
  });
