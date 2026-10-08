import type { CompilerFunction } from '../../models';
import { getCompileResult } from '../../compiler/utils';
import { getErrorMessage } from '../../utils/utils';
import { getLanguageCustomSettings } from '../utils';

declare const self: any;

/**
 * The Dart compiler, running in LiveCodes' compile worker.
 *
 * `@live-codes/dart-wasm` is importScripts'd by the language spec, so `self.DartWasm` is available
 * here. Its compiler half needs no DOM: it boots the DartPad worker (DDC, the analyzer and a
 * subset of `pub`) and hands back DDC's output as data, which is why this can be a worker compiler
 * rather than a runtime in the result page.
 */
(self as any).createDartCompiler = (options: {
  engine: 'dart' | 'flutter';
  assetBaseUrl: string;
}): CompilerFunction => {
  let pending: Promise<any> | undefined;
  // Resolved packages survive between compiles, so `pub get` is paid once.
  const compiler = () => {
    pending ??= (self as any).DartWasm.createCompiler({
      engine: options.engine,
      baseUrl: options.assetBaseUrl,
    });
    return pending;
  };

  return async (code, { config }) => {
    if (!code.trim()) return getCompileResult('');

    try {
      const instance = await compiler();
      const settings = getLanguageCustomSettings(options.engine, config) as { packages?: string[] };
      const program = await instance.compile(code, {
        mode: options.engine === 'flutter' ? 'flutter' : 'console',
        ...(Array.isArray(settings?.packages) ? { dependencies: settings.packages } : {}),
      });

      // The compiled bundle is data: the result page loads the runtime and then the modules, in
      // order, because DDC bundles call `defineLibrary` as they evaluate. Passing it as JSON keeps
      // that ordering in one place instead of relying on script load order.
      const asJson = JSON.stringify({
        libraryUri: program.libraryUri,
        mode: program.mode,
        modules: program.modules.map((module: any) => ({ name: module.name, code: module.code })),
      }).replace(/<\//g, '<\\/');

      const jsCode = `
(function () {
  var program = ${asJson};
  var attempts = 0;
  var start = function () {
    var livecodes = window.livecodes;
    if (!livecodes || !livecodes.${options.engine} || !livecodes.${options.engine}.run) {
      if (attempts++ < 400) return setTimeout(start, 25);
      return console.error('Dart runtime did not load.');
    }
    livecodes.${options.engine}.run(program);
  };
  start();
})();
`;

      return getCompileResult(jsCode);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(getErrorMessage(error));
      return { code: '', info: { errors: [getErrorMessage(error)] } };
    }
  };
};
