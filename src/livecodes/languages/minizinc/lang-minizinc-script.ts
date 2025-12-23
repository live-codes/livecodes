import { onLoad } from '../../utils/utils';
import { minizincUrl } from '../../vendors';

declare const livecodes: {
  minizinc: {
    init: () => Promise<void>;
    solve: (data?: MiniZincData) => any;
    run: (data?: MiniZincData) => Promise<any>;
    getSolvers: () => Promise<string[]>;
  };
};

interface MiniZincConfig {
  jsonOutput?: boolean;
  options?: {
    solver?: string;
    'time-limit'?: number;
    statistics?: boolean;
    'all-solutions'?: boolean;
    // ...
  };
}

interface MiniZincData {
  dzn?: string;
  json?: string;
  config?: MiniZincConfig;
}

let MiniZinc: any;
let hasRun = false;
const pageLoaded = new Promise((resolve) => onLoad(resolve));
const modPromise = import(minizincUrl);

const run = (data: MiniZincData = {}) => {
  if (!MiniZinc) {
    throw new Error('MiniZinc is not initialized. await livecodes.minizinc.init() first.');
  }
  hasRun = true;
  if (typeof data === 'string') data = {};
  const { dzn = '', json = '', config = {} } = data;
  let code = '';
  const scripts = document.querySelectorAll('script[type="text/minizinc"]');
  scripts.forEach((script) => (code += script.innerHTML + '\n'));
  const model = new MiniZinc.Model();
  model.addFile('playground.mzn', code);
  if (dzn) model.addFile('playground.dzn', dzn);
  if (json) model.addFile('playground.json', json);
  return model.solve({
    jsonOutput: config.jsonOutput ?? false,
    options: {
      solver: 'gecode',
      'time-limit': 10000,
      ...config.options,
    },
  });
};

livecodes.minizinc = {
  init: async () => {
    if (MiniZinc) return;
    await pageLoaded;
    MiniZinc = await modPromise;
  },
  solve: (data) => run(data),
  run: async (data) => {
    await livecodes.minizinc.init();
    return new Promise((resolve) => {
      const solve = run(data);
      const errors: any[] = [];
      solve.on('error', (error: any) => {
        // eslint-disable-next-line no-console
        console.error(error);
        errors.push(error);
      });
      solve.on('exit', (msg: any) => {
        if (msg.code === 0) return;
        if (errors.length) {
          resolve({
            status: 'ERROR',
            errors,
          });
        } else {
          resolve({
            status: 'ERROR',
            errors: [
              {
                type: 'error',
                message: `Process finished with non-zero exit code ${msg.code}.`,
              },
            ],
          });
        }
      });
      solve.then((result: any) => {
        const statusMap: any = {
          ALL_SOLUTIONS: '==========',
          OPTIMAL_SOLUTION: '==========',
          UNSATISFIABLE: '=====UNSATISFIABLE=====',
          UNSAT_OR_UNBOUNDED: '=====UNSATorUNBOUNDED=====',
          UNBOUNDED: '=====UNBOUNDED=====',
          UNKNOWN: '=====UNKNOWN=====',
          ERROR: '=====ERROR=====',
        };
        const status = statusMap[result.status] || '';
        const output =
          result.solution?.output?.default ??
          result.solution?.output?.dzn ??
          result.solution?.output?.json ??
          result.solution?.output?.raw ??
          result.solution?.output ??
          '';
        const msg = typeof output === 'string' ? output + status : output;
        // eslint-disable-next-line no-console
        console.log(msg);
        resolve(result);
      });
    });
  },
  getSolvers: async () => {
    const MiniZinc = await modPromise;
    return MiniZinc.solvers();
  },
};

onLoad(() => {
  livecodes.minizinc.init().then(() => {
    // run only if user code has not called `run` or `solve`
    if (hasRun) return;
    livecodes.minizinc.run();
  });
});
