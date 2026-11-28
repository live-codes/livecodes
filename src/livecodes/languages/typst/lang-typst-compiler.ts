import type { CompilerFunction } from '../../models';
import { typstCompilerWasmUrl, typstRendererWasmUrl, typstUrl } from '../../vendors';

interface TypstSnippet {
  setCompilerInitOptions: (options: { getModule: () => string }) => void;
  setRendererInitOptions: (options: { getModule: () => string }) => void;
  svg: (options: { mainContent: string }) => Promise<string>;
}

/**
 * typst.ts throws a Rust debug representation of the diagnostics, e.g.
 * `[SourceDiagnostic { severity: Error, span: Span(123), message: "expected expression", ... }]`.
 * Show the readable messages instead.
 */
export const formatTypstError = /* @__PURE__ */ (error: unknown) => {
  const text = String((error as any)?.message || error);
  const messages = [...text.matchAll(/message:\s*"((?:[^"\\]|\\.)*)"/g)].map((match) =>
    match[1].replaceAll('\\"', '"').replaceAll('\\n', '\n'),
  );
  return messages.length > 0 ? messages.join('\n') : text;
};

(self as any).createTypstCompiler = (): CompilerFunction => {
  let typst: TypstSnippet | null = null;
  let init: Promise<TypstSnippet> | null = null;
  let queue: Promise<unknown> = Promise.resolve();

  const load = async (): Promise<TypstSnippet> => {
    const bundle = await import(typstUrl);
    const instance: TypstSnippet = bundle.$typst ?? (self as any).$typst;
    if (!instance) {
      throw new Error('Failed to load the Typst compiler.');
    }
    instance.setCompilerInitOptions({ getModule: () => typstCompilerWasmUrl });
    instance.setRendererInitOptions({ getModule: () => typstRendererWasmUrl });
    return instance;
  };

  const getTypst = (): Promise<TypstSnippet> => {
    if (!init) {
      init = load().catch((error) => {
        // Reset so a later compile can retry the download.
        init = null;
        throw error;
      });
    }
    return init;
  };

  const compile = async (code: string) => {
    if (!code.trim()) return '';
    typst ??= await getTypst();
    return typst.svg({ mainContent: code });
  };

  return (code) => {
    // typst.ts keeps mutable compiler state, so runs must not overlap.
    const task = queue.then(
      () => compile(code),
      () => compile(code),
    );
    queue = task.then(
      () => undefined,
      () => undefined,
    );
    return task.catch((error) => {
      throw new Error(formatTypstError(error));
    });
  };
};
