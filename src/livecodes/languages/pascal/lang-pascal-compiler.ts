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
  const compilerPromise = pascalWasm.createCompiler({ baseUrl: pascalWasmBaseUrl });
  return async (code) => {
    if (!code.trim()) return '';
    const compiler = await compilerPromise;
    const { js, diagnostics } = await compiler.compile(code);
    if (!js) {
      return { code: '', info: { errors: formatDiagnostics(diagnostics) } };
    }
    return `${js}\nrtl.run();\n`;
  };
};
