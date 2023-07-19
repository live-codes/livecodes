import type { CompilerFunction } from '../../models';

(self as any).createImbaCompiler = (): CompilerFunction => async (code) => {
  if (!code) return '';
  try {
    const compiled = (self as any).imbac.compile(code, {
      platform: 'web',
      format: 'esm',
      sourcePath: 'app.imba',
    });
    return compiled.js || '';
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(err);
    return '';
  }
};
