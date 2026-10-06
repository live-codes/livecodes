import { getErrorMessage } from '../utils/utils';
import type { Runner } from './worker-runner';

/**
 * The origin the result page posts status messages to. The result runs in an iframe, so the app
 * origin is the parent's origin, the first ancestor's, or the referrer's; the wildcard is a last
 * resort and is only safe because the parent checks the source/origin of incoming messages.
 */
export const getParentOrigin = () =>
  window.parent === window
    ? window.location.origin
    : window.location.ancestorOrigins?.[0] ||
      (() => {
        if (!document.referrer) return '*';
        try {
          return new URL(document.referrer).origin;
        } catch {
          // Ignore malformed referrers and use the wildcard fallback below.
          return '*';
        }
      })();

/** Reports loading-state changes to the app origin. */
export const createLoadingReporter = () => {
  const parentOrigin = getParentOrigin();
  return (payload: boolean) => {
    parent.postMessage({ type: 'loading', payload }, parentOrigin); // NOSONAR - fallback is safe with source/origin checks in the parent.
  };
};

export type SetResult<TResult> = (
  input: string,
  output: string | null,
  error: string | null,
  exitCode: number | null,
) => TResult;

/**
 * Runs `code` on a ready runner and maps the outcome through `setResult`, reporting both the
 * compiler's diagnostics and any failure to load the runtime as the result's error.
 */
export const runCompiler = async <TResult>(
  runner: Runner,
  ensureLoaded: (runner: Runner) => Promise<void>,
  code: string,
  stdin: string,
  setResult: SetResult<TResult>,
  options?: unknown,
): Promise<TResult> => {
  try {
    await ensureLoaded(runner);
  } catch (error) {
    return setResult(stdin, null, `Error: ${getErrorMessage(error)}`, 1);
  }

  try {
    const result = await runner.run(code, stdin, options);
    // `errors` holds the compiler's diagnostics and is empty when the program ran.
    const errors = (result.errors || []).filter(Boolean);
    if (errors.length) {
      return setResult(stdin, null, errors.join('\n'), result.exitCode ?? 1);
    }
    return setResult(stdin, result.output ?? '', null, result.exitCode ?? 0);
  } catch (error) {
    return setResult(stdin, null, `Error: ${getErrorMessage(error)}`, 1);
  }
};
