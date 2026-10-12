// The OCaml compiler is a package of its own (@live-codes/ocaml), loaded from the
// CDN. It runs in the page rather than in the compile worker because it creates its
// own workers, one per compiler program per compile, and because it is an ES module
// where the compile worker is a classic one.
import type { CompilerFunction } from '../../models';
import { getErrorMessage } from '../../utils';
import { ocamlJsBaseUrl } from '../../vendors';

const ocamlJsCompilerUrl = ocamlJsBaseUrl + 'src/compiler/index.js';
const ocamlJsAssetsBaseUrl = ocamlJsBaseUrl + 'assets/compiler/';

interface OcamlCompiler {
  compile: (code: string) => Promise<{ js: string | null; diagnostics: string[]; error?: string }>;
}

// One instance, reused: it holds no per-program state, and loading it means fetching
// and parsing two compilers.
let loading: Promise<OcamlCompiler> | undefined;

const getCompiler = (): Promise<OcamlCompiler> => {
  if (!loading) {
    loading = import(ocamlJsCompilerUrl).then(({ createCompiler }) =>
      createCompiler({ baseUrl: ocamlJsAssetsBaseUrl }),
    );
    // do not keep a failed boot (e.g. a transient network error)
    loading.catch(() => {
      loading = undefined;
    });
  }
  return loading;
};

export const ocamlCompiler: CompilerFunction = async (code: string) => {
  if (!code.trim()) return '';

  // Loading the compiler can reject (e.g. a transient CDN error), and `compile` can
  // reject when the compiler worker itself fails, as opposed to the program not
  // compiling. Surface both as compilation errors instead of letting the rejection
  // leave the compile request pending.
  try {
    const compiler = await getCompiler();
    const { js, diagnostics, error } = await compiler.compile(code);

    // `error` is the toolchain failing, as opposed to the program not compiling;
    // `diagnostics` carries the compiler's own messages, errors and warnings alike.
    if (!js) {
      return { code: '', info: { errors: error ? [...diagnostics, error] : diagnostics } };
    }
    return { code: js, info: {} };
  } catch (err) {
    return { code: '', info: { errors: [getErrorMessage(err)] } };
  }
};
