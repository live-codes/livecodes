import type { LanguageSpecs } from '../../models';
import { monacoLanguagesBaseUrl } from '../../vendors';

/**
 * x86-64 assembly, assembled by Keystone and executed by Unicorn (both compiled to
 * WebAssembly and loaded at run time by `@live-codes/assembly-wasm`).
 *
 * The source is not transformed at compile time: it is handed to the result page in a
 * `text/assembly` script tag and assembled and run there by `lang-assembly-wasm-script.ts`.
 */
export const assemblyWasm: LanguageSpecs = {
  name: 'assembly-wasm',
  title: 'Assembly (Wasm)',
  longTitle: 'x86-64 Assembly (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-assembly-wasm-script.js}}'],
    scriptType: 'text/assembly',
    compiledCodeLanguage: 'assembly-wasm',
    liveReload: true,
  },
  extensions: ['asm', 'assembly', 'asm-wasm', 'assembly-wasm', 'x86', 'x86-64', 'nasm', 'wasm.asm'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'asm.js', language: 'asm' },
    // Prism's `nasm` grammar is an Intel-syntax x86 assembly highlighter.
    codejar: { language: 'nasm' },
  },
  largeDownload: true,
};
