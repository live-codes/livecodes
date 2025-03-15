// based on https://github.com/microsoft/TypeScript-Website/blob/v2/packages/sandbox/src/index.ts

import type * as Monaco from 'monaco-editor';
import { extractTwoSlashCompilerOptions, twoslashCompletions } from './twoslashSupport';

type CompilerOptions = Monaco.languages.typescript.CompilerOptions;
let optionDeclarations: any[] | undefined;

export const registerTwoSlash = async ({
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
  const language = isJSLang ? 'javascript' : 'typescript';
  const getWorker = isJSLang
    ? monaco.languages.typescript.getJavaScriptWorker
    : monaco.languages.typescript.getTypeScriptWorker;

  const defaults = isJSLang
    ? monaco.languages.typescript.javascriptDefaults
    : monaco.languages.typescript.typescriptDefaults;

  const model = editor.getModel();

  optionDeclarations =
    optionDeclarations ||
    (await (window as any).compiler.typescriptFeatures({ feature: 'getOptionDeclarations' }));

  // Auto-complete twoslash comments
  if (!(window as any).isTwoslashCompletionsRegistered) {
    const langs = ['javascript', 'typescript'];
    langs.forEach((l) => {
      monaco.languages.registerCompletionItemProvider(l, {
        triggerCharacters: ['@', '/', '-'],
        provideCompletionItems: twoslashCompletions(optionDeclarations),
      });
    });
    (window as any).isTwoslashCompletionsRegistered = true;
  }

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

  const getTwoSlashCompilerOptions = extractTwoSlashCompilerOptions(optionDeclarations);

  const textUpdated = () => {
    const code = editor.getModel()?.getValue();
    if (!code) return;
    const configOpts = getTwoSlashCompilerOptions(code);
    updateCompilerSettings(configOpts);
  };

  textUpdated();

  const getWorkerProcess = async () => {
    if (!model) return;
    const worker = await getWorker();
    return worker(model.uri);
  };

  const createTwoslashInlayProvider = () => {
    const provider: Monaco.languages.InlayHintsProvider = {
      provideInlayHints: async (model, _, cancel) => {
        const text = model.getValue();
        const queryRegex = /^\s*\/\/\s*\^\?$/gm;
        let match;
        const results: Monaco.languages.InlayHint[] = [];
        const worker = await getWorkerProcess();

        if (!worker || model.isDisposed()) {
          return {
            hints: [],
            dispose: () => undefined,
          };
        }

        while ((match = queryRegex.exec(text)) !== null) {
          if (cancel.isCancellationRequested || model.isDisposed()) {
            return {
              hints: [],
              dispose: () => undefined,
            };
          }

          const end = match.index + match[0].length - 1;
          const endPos = model.getPositionAt(end);
          const inspectionPos = new monaco.Position(endPos.lineNumber - 1, endPos.column);
          const inspectionOff = model.getOffsetAt(inspectionPos);

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

  (window as any).inlayHintRegistered = (window as any).inlayHintRegistered || new Set();
  if (!(window as any).inlayHintRegistered.has(language)) {
    monaco.languages.registerInlayHintsProvider(language, createTwoslashInlayProvider());
    (window as any).inlayHintRegistered.add(language);
    editor.getModel()?.onDidChangeContent(textUpdated);
  }
};
