// based on https://github.com/microsoft/TypeScript-Website/blob/v2/packages/sandbox/src/index.ts

/* eslint-disable import/no-internal-modules */
import type * as Monaco from 'monaco-editor';
import type TS from 'typescript';

import type { EditorLibrary } from '../../models';
import { loadScript } from '../../utils/utils';
import { typescriptAtaUrl, typescriptUrl } from '../../vendors';
import { extractTwoSlashCompilerOptions, twoslashCompletions } from './twoslashSupport';

type CompilerOptions = Monaco.languages.typescript.CompilerOptions;

let ata: any;

export const configureTSFeatures = async ({
  isJSLang,
  editor,
  monaco,
  compilerOptions,
  addTypes,
}: {
  isJSLang: boolean;
  editor: Monaco.editor.IStandaloneCodeEditor;
  monaco: typeof Monaco;
  compilerOptions: CompilerOptions;
  addTypes: (type: EditorLibrary, force?: boolean) => void;
}) => {
  const ts = (await loadScript(typescriptUrl, 'ts')) as typeof TS;
  const language = isJSLang ? 'javascript' : 'typescript';
  const getWorker = isJSLang
    ? monaco.languages.typescript.getJavaScriptWorker
    : monaco.languages.typescript.getTypeScriptWorker;

  const defaults = isJSLang
    ? monaco.languages.typescript.javascriptDefaults
    : monaco.languages.typescript.typescriptDefaults;

  defaults.setDiagnosticsOptions({
    ...defaults.getDiagnosticsOptions(),
    noSemanticValidation: false,
    // This is when tslib is not found
    diagnosticCodesToIgnore: [2354],
  });

  const model = editor.getModel();

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

  const addLibraryToRuntime = (code: string, _path: string) => {
    const path = 'file://' + _path;
    monaco.languages.typescript.typescriptDefaults.addExtraLib(code, path);
    monaco.languages.typescript.javascriptDefaults.addExtraLib(code, path);
    const uri = monaco.Uri.file(path);
    if (monaco.editor.getModel(uri) === null) {
      monaco.editor.createModel(code, 'text', uri);
    }
  };

  const ataModule = await import(typescriptAtaUrl);
  const { setupTypeAcquisition } = ataModule;
  ata =
    ata ||
    setupTypeAcquisition({
      projectName: 'TypeScript Playground',
      typescript: ts,
      logger: {
        log: () => undefined,
        error: () => undefined,
        groupCollapsed: () => undefined,
        groupEnd: () => undefined,
      },
      delegate: {
        receivedFile: (code: string, path: string) => {
          addLibraryToRuntime(code, path);
          // addTypes({ content: code, filename: path });
          // console.log({ content: code, filename: path });
        },
        progress: (_downloaded: number, _total: number) => {
          // console.log({ _downloaded, _total })
        },
        started: () => {
          // console.log("ATA start")
        },
        finished: (_files: Map<string, string>) => {
          // console.log("ATA done")
        },
      },
    });

  const textUpdated = () => {
    const code = editor.getModel()?.getValue();
    if (!code) return;
    const configOpts = getTwoSlashCompilerOptions(code);
    updateCompilerSettings(configOpts);
    ata(code);
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

        /* eslint-disable-next-line */
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

  (window as any).isInlayHintRegistered = (window as any).isInlayHintRegistered || new Set();
  if (!(window as any).isInlayHintRegistered.has(language)) {
    monaco.languages.registerInlayHintsProvider(language, createTwoslashInlayProvider());
    (window as any).isInlayHintRegistered.add(language);
    editor.getModel()?.onDidChangeContent(textUpdated);
  }
};
