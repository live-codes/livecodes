import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { Compiler, Language, LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl, wasmFmtClangBaseUrl } from '../../vendors';

interface ClangWasmLanguage {
  name: Language;
  title: string;
  scriptType: NonNullable<Compiler['scriptType']>;
  extensions: Language[];
  /** The name the source is compiled under, which also selects clang-format's language. */
  fileName: string;
}

/**
 * C, C++, Objective-C and Objective-C++ are compiled by the same Clang build and run by the
 * same runner script, so they only differ in their names and the file their source is
 * compiled as. The shared implementation lives in `lang-clang-wasm-script.ts`.
 */
const createClangWasmLanguage = ({
  name,
  title,
  scriptType,
  extensions,
  fileName,
}: ClangWasmLanguage): LanguageSpecs => ({
  name,
  title,
  formatter: {
    factory: async () => {
      const formatter = await import(wasmFmtClangBaseUrl + 'clang-format-web.js');
      await formatter.default();
      return async (code) => ({ formatted: await formatter.format(code, fileName, 'Google') });
    },
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-clang-wasm-script.js}}'],
    scriptType,
    compiledCodeLanguage: name,
    liveReload: true,
  },
  extensions,
  editor: 'script',
  editorSupport: {
    monaco: {
      languageSupport: monacoLanguagesBaseUrl + name.replace('-wasm', '') + '.js',
      language: name.replace('-wasm', '') as Language,
    },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-cpp.js')).cpp),
    },
    codejar: { language: 'cpp' },
  },
  largeDownload: true,
});

export const cWasm: LanguageSpecs = createClangWasmLanguage({
  name: 'c-wasm',
  title: 'C (Wasm)',
  scriptType: 'text/c-wasm',
  extensions: ['c', 'h', 'cwasm', 'c-wasm', 'wasm.c', 'clang.c', 'clang-c'],
  fileName: 'main.c',
});

export const cppWasm: LanguageSpecs = createClangWasmLanguage({
  name: 'cpp-wasm',
  title: 'C++ (Wasm)',
  scriptType: 'text/cpp-wasm',
  extensions: [
    'cpp',
    'cc',
    'cp',
    'cxx',
    'c++',
    'cppm',
    'ixx',
    'ii',
    'hpp',
    'cppwasm',
    'cpp-wasm',
    'wasm.cpp',
    'clang',
    'clang.cpp',
    'clang-cpp',
  ],
  fileName: 'main.cpp',
});

export const objcWasm: LanguageSpecs = createClangWasmLanguage({
  name: 'objc-wasm',
  title: 'Objective-C (Wasm)',
  scriptType: 'text/objc-wasm',
  extensions: ['m', 'objc', 'objc-wasm', 'objective-c', 'wasm.m', 'clang.m', 'clang-objc'],
  fileName: 'main.m',
});

export const objcppWasm: LanguageSpecs = createClangWasmLanguage({
  name: 'objcpp-wasm',
  title: 'Objective-C++ (Wasm)',
  scriptType: 'text/objcpp-wasm',
  extensions: [
    'mm',
    'objcpp',
    'objcpp-wasm',
    'objc++',
    'objective-c++',
    'wasm.mm',
    'clang.mm',
    'clang-objcpp',
  ],
  fileName: 'main.mm',
});
