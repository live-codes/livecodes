// based on https://github.com/microsoft/TypeScript-Website/blob/v2/packages/sandbox/src/index.ts

/* eslint-disable import/no-internal-modules */
import type * as Monaco from 'monaco-editor';
import type TS from 'typescript';

import type { EditorLibrary, Language } from '../../models';
import { loadScript } from '../../utils/utils';
import { typescriptUrl } from '../../vendors';
import { extractTwoSlashCompilerOptions, twoslashCompletions } from './twoslashSupport';

type CompilerOptions = Monaco.languages.typescript.CompilerOptions;

export function getDefaultCompilerOptions(language: Language, monaco: typeof Monaco) {
  const useJavaScript = language !== 'javascript' && language !== 'jsx';
  const settings: CompilerOptions = {
    strict: true,

    noImplicitAny: true,
    strictNullChecks: !useJavaScript,
    strictFunctionTypes: true,
    strictPropertyInitialization: true,
    strictBindCallApply: true,
    noImplicitThis: true,
    noImplicitReturns: true,
    noUncheckedIndexedAccess: false,

    useDefineForClassFields: false,

    alwaysStrict: true,
    allowUnreachableCode: false,
    allowUnusedLabels: false,

    downlevelIteration: false,
    noEmitHelpers: false,
    noLib: false,
    noStrictGenericChecks: false,
    noUnusedLocals: false,
    noUnusedParameters: false,

    esModuleInterop: true,
    preserveConstEnums: false,
    removeComments: false,
    skipLibCheck: false,

    checkJs: useJavaScript,
    allowJs: useJavaScript,
    declaration: true,

    importHelpers: false,

    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,

    target: monaco.languages.typescript.ScriptTarget.ES2017,
    jsx: monaco.languages.typescript.JsxEmit.React,
    module: monaco.languages.typescript.ModuleKind.ESNext,
  };

  return settings;
}

export const configureTSFeatures = async ({
  isJSLang,
  editor,
  monaco,
  compilerOptions,
}: {
  isJSLang: boolean;
  editor: Monaco.editor.IStandaloneCodeEditor;
  monaco: typeof Monaco;
  compilerOptions: CompilerOptions;
}) => {
  const ts = (await loadScript(typescriptUrl, 'ts')) as typeof TS;
  const language = isJSLang ? 'javascript' : 'typescript';
  const getWorker = isJSLang
    ? monaco.languages.typescript.getJavaScriptWorker
    : monaco.languages.typescript.getTypeScriptWorker;

  const defaults = isJSLang
    ? monaco.languages.typescript.javascriptDefaults
    : monaco.languages.typescript.typescriptDefaults;

  const model = editor.getModel()!;

  // Auto-complete twoslash comments
  const langs = ['javascript', 'typescript'];
  langs.forEach((l) =>
    monaco.languages.registerCompletionItemProvider(l, {
      triggerCharacters: ['@', '/', '-'],
      provideCompletionItems: twoslashCompletions(ts, monaco),
    }),
  );

  const updateCompilerSettings = (opts: CompilerOptions) => {
    const newKeys = Object.keys(opts);
    if (!newKeys.length) return;

    // Don't update a compiler setting if it's the same
    // as the current setting
    newKeys.forEach((key) => {
      if (compilerOptions[key] === opts[key]) delete opts[key];
    });

    if (!Object.keys(opts).length) return;

    compilerOptions = { ...compilerOptions, ...opts };
    defaults.setCompilerOptions(compilerOptions);
  };

  const getTwoSlashCompilerOptions = extractTwoSlashCompilerOptions(ts);

  const textUpdated = () => {
    const code = editor.getModel()!.getValue();

    const configOpts = getTwoSlashCompilerOptions(code);
    updateCompilerSettings(configOpts);
  };

  const getWorkerProcess = async () => {
    const worker = await getWorker();
    // @ts-ignore
    return worker(model.uri);
  };

  textUpdated();

  const createTwoslashInlayProvider = () => {
    const provider: Monaco.languages.InlayHintsProvider = {
      provideInlayHints: async (model, _, cancel) => {
        const text = model.getValue();
        const queryRegex = /^\s*\/\/\s*\^\?$/gm;
        let match;
        const results: Monaco.languages.InlayHint[] = [];
        const worker = await getWorkerProcess();

        if (model.isDisposed()) {
          return {
            hints: [],
            dispose: () => undefined,
          };
        }

        /* eslint-disable-next-line */
        while ((match = queryRegex.exec(text)) !== null) {
          const end = match.index + match[0].length - 1;
          const endPos = model.getPositionAt(end);
          const inspectionPos = new monaco.Position(endPos.lineNumber - 1, endPos.column);
          const inspectionOff = model.getOffsetAt(inspectionPos);

          if (cancel.isCancellationRequested) {
            return {
              hints: [],
              dispose: () => undefined,
            };
          }

          const hint = await worker.getQuickInfoAtPosition(
            'file://' + model.uri.path,
            inspectionOff,
          );
          if (!hint || !hint.displayParts) continue;

          // Make a one-liner
          let text = hint.displayParts
            .map((d: { text: string }) => d.text)
            .join('')
            .replace(/\\n/g, '')
            .replace(/  /g, '');
          if (text.length > 120) text = text.slice(0, 119) + '...';

          const inlay: Monaco.languages.InlayHint = {
            // @ts-ignore
            kind: 0,
            position: new monaco.Position(endPos.lineNumber, endPos.column + 1),
            label: text,
            paddingLeft: true,
          };
          results.push(inlay);
        }
        return {
          hints: results,
          dispose: () => undefined,
        };
      },
    };
    return provider;
  };

  (window as any).isInlayHintRegistered = (window as any).isInlayHintRegistered || new Set();
  if (!(window as any).isInlayHintRegistered.has(language)) {
    // enable twoslash queries in monaco
    monaco.languages.registerInlayHintsProvider(language, createTwoslashInlayProvider());
    (window as any).isInlayHintRegistered.add(language);
  }
};
