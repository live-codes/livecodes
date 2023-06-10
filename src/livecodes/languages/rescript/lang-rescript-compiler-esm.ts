/* eslint-disable camelcase */
import type { CompilerFunction, Language } from '../../models';
import { getAbsoluteUrl, loadScript } from '../../utils';
import {
  reasonCompilerUrl,
  reasonReactUrl,
  reasonStdLibBaseUrl,
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

const loadCompiler = async (language: Language) => {
  if (!(window as any).require) {
    await loadScript(requireUrl, 'require');
    (window as any).require.config({
      waitSeconds: 30,
    });
  }
  return new Promise<void>((resolve, reject) => {
    if (language === 'reason') {
      (window as any).require(
        [reasonCompilerUrl, reasonReactUrl],
        () => {
          // avoid global variable naming conflict ,
          // when loading 2 different versions of the rescript compiler.
          // reason syntax is no longer supported after version 9
          (window as any).reason_compiler = (window as any).rescript_compiler;
          (window as any).rescript_compiler = undefined;
          (window as any).loadedReasonCompiler = (window as any).reason_compiler.make();
          const compiler = (window as any).loadedReasonCompiler;
          compiler.setModuleSystem('es6');
          compiler.setFilename('index.bs.js');
          resolve();
        },
        reject,
      );
    } else {
      (window as any).require(
        [rescriptCompilerUrl, rescriptReactUrl],
        () => {
          (window as any).rescript_ocaml_compiler = (window as any).rescript_compiler;
          (window as any).rescript_compiler = undefined;
          (window as any).loadedRescriptCompiler = (window as any).rescript_ocaml_compiler.make();
          const compiler = (window as any).loadedRescriptCompiler;
          compiler.setModuleSystem('es6');
          compiler.setFilename('index.bs.js');
          resolve();
        },
        reject,
      );
    }
  });
};

export const rescriptCompiler: CompilerFunction = async (code: string, { baseUrl, language }) => {
  if (!code) return '';

  const loadedCompiler = language === 'reason' ? 'loadedReasonCompiler' : 'loadedRescriptCompiler';
  const stdLibUrl = language === 'reason' ? reasonStdLibBaseUrl : rescriptStdLibBaseUrl;

  let retries = 3;
  while (!(window as any)[loadedCompiler] && retries > 0) {
    try {
      await loadCompiler(language as Language);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(`Failed to load ${language} compiler. Retrying...`);
      retries--;
    }
  }

  const compiler = (window as any)[loadedCompiler];
  const output = compiler[language].compile(code);
  try {
    if (output.type === 'success' && output.js_code) {
      return replaceImports(output.js_code, getAbsoluteUrl(stdLibUrl, baseUrl));
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
    return '';
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return '';
  }
};
