import { tsSync, tsFacet, tsLinter, tsHover, tsAutocomplete } from '@valtown/codemirror-ts';
import { autocompletion } from '@codemirror/autocomplete';
import type TS from 'typescript';
import { loadScript } from '../../utils';

export const codemirrorTS = async (typescriptUrl: string, typescriptVfsUrl: string) => {
  const ts = (await loadScript(typescriptUrl, 'ts')) as typeof TS;
  const tsvfs = await import(typescriptVfsUrl);
  const { createDefaultMapFromCDN, createSystem, createVirtualTypeScriptEnvironment } = tsvfs;
  const fsMap = await createDefaultMapFromCDN(
    { target: ts.ScriptTarget.ES2022 },
    ts.version,
    true,
    ts,
  );
  const system = createSystem(fsMap);
  const compilerOpts = {};
  const env = createVirtualTypeScriptEnvironment(system, [], ts, compilerOpts);
  const path = 'index.ts';

  return [
    tsFacet.of({ env, path }),
    tsSync(),
    tsLinter(),
    autocompletion({ override: [tsAutocomplete()] }),
    tsHover(),
  ];
};
