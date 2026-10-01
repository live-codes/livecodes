import type { CompilerFunction } from '../../models';
import { pascalWasmBaseUrl } from '../../vendors';

interface DiagnosticMessage {
  file: string | null;
  line: number | null;
  column: number | null;
  severity: string;
  message: string;
}

declare const pascalWasm: {
  createCompiler: (options: { baseUrl: string }) => Promise<{
    compile: (code: string) => Promise<{ js: string | null; diagnostics: string }>;
  }>;
  parseDiagnostics: (diagnostics: string) => DiagnosticMessage[];
};

const formatDiagnostics = (diagnostics: string) => {
  const messages = pascalWasm.parseDiagnostics(diagnostics).map((message) => {
    if (message.file === null || message.line === null) {
      return `${message.severity}: ${message.message}`;
    }
    const file = message.file.replace(/^.*\//, '');
    return `${file} (${message.line},${message.column}) ${message.severity}: ${message.message}`;
  });
  return messages.length ? messages : ['Pascal compilation failed'];
};

(self as any).createPascalCompiler = (): CompilerFunction => {
  let compiler: ReturnType<typeof pascalWasm.createCompiler> | undefined;

  const getCompiler = () => {
    if (!compiler) {
      compiler = pascalWasm.createCompiler({ baseUrl: pascalWasmBaseUrl });
      // do not keep a failed boot (e.g. a transient network error)
      compiler.catch(() => {
        compiler = undefined;
      });
    }
    return compiler;
  };

  // the compiler (a ~9 MB WASM module) is loaded once and kept warm
  getCompiler().catch(() => undefined);

  return async (code) => {
    if (!code.trim()) return '';
    const { js, diagnostics } = await (await getCompiler()).compile(code);
    if (!js) {
      return { code: '', info: { errors: formatDiagnostics(diagnostics) } };
    }
    return `${js}\nrtl.run();\n`;
  };
};
