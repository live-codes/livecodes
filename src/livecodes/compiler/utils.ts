import type { CompileResult, CompilerFunction } from '../models';

export const getCompileResult = (result: Awaited<ReturnType<CompilerFunction>>): CompileResult => {
  if (typeof result === 'string') {
    return { code: result, info: {} };
  }
  return result;
};
