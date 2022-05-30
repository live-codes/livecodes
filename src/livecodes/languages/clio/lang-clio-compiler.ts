import type { CompilerFunction } from '../../models';
import { clioBaseUrl } from '../../vendors';
import { escapeCode } from '../../utils';

(self as any).createClioCompiler = (): CompilerFunction => async (code) => {
  if (!code) return '';
  try {
    const compiled = await (self as any).clioCompiler.compile(code);
    if (compiled.code) {
      return `(async() => {
const code = \`${escapeCode(compiled.code.replace('# sourceMappingURL=main.clio.js.map', ''))}\`;
clio.exec(code, '${clioBaseUrl + 'worker.js'}');
})();`;
    } else {
      // eslint-disable-next-line no-console
      console.error(compiled.error || 'Compile error.');
    }
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message || err);
  }
  return '';
};
