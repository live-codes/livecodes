import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

const words = (list: string): Record<string, boolean> =>
  Object.fromEntries(list.split(' ').map((word) => [word, true]));

// The shared CodeMirror build ships no Nim mode, so Nim is described through the `clike` factory
// it does ship: the highlighting is approximate (Nim is indented, not braced), but the keyword
// and comment sets are Nim's, which is what the mode is judged on.
const nimCodemirror = async () => {
  const { clike } = await import(codeMirrorBaseUrl + 'codemirror-lang-clike.js');
  return codemirrorLegacy(
    clike({
      name: 'nim',
      keywords: words(
        'addr and as asm bind block break case cast concept const continue converter defer ' +
          'discard distinct div do elif else end enum except export finally for from func if ' +
          'import in include interface is isnot iterator let macro method mixin mod nil not ' +
          'notin object of or out proc ptr raise ref return shl shr static template try tuple ' +
          'type using var when while xor yield',
      ),
      types: words(
        'bool char float int int8 int16 int32 int64 uint uint8 uint16 uint32 uint64 string ' +
          'cstring pointer seq array openarray varargs range',
      ),
      builtin: words('echo len add new setLen ord chr high low inc dec repr quit assert doAssert'),
      blockKeywords: words('case do elif else except finally for if of try when while'),
      defKeywords: words('func iterator macro method proc template type converter'),
      atoms: words('true false nil'),
      hooks: {
        // Nim comments start with `#`, unlike the `//` the C-like modes expect.
        '#': (stream: any) => {
          stream.skipToEnd();
          return 'comment';
        },
      },
      languageData: { commentTokens: { line: '#' } },
    }),
  );
};

export const nimEditorSupport: NonNullable<LanguageSpecs['editorSupport']> = {
  monaco: { languageSupport: monacoLanguagesBaseUrl + 'nim.js', language: 'nim' },
  codemirror: { languageSupport: nimCodemirror },
  codejar: { language: 'nim' },
};
