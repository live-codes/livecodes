import { minizincUrl } from '../../vendors';

declare const livecodes: {
  minizinc: {
    config?: {
      jsonOutput?: boolean;
      options?: {
        solver?: string;
        'time-limit'?: number;
        statistics?: boolean;
        'all-solutions'?: boolean;
        // ...
      };
    };
    run: (data: { dzn: string; json: string } | 'init') => Promise<any>;
    getSolvers: () => Promise<string[]>;
  };
};

let hasRun = false;
const pageLoaded = new Promise((resolve) => {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    resolve(undefined);
  } else {
    window.addEventListener('load', resolve);
  }
});

const modPromise = import(minizincUrl);

livecodes.minizinc = {
  run: async (data: { dzn: string; json: string } | 'init') => {
    if (data === 'init' && hasRun) return;
    const { dzn = '', json = '' } = data === 'init' ? {} : data;
    hasRun = true;
    await pageLoaded;
    let code = '';
    const scripts = document.querySelectorAll('script[type="text/minizinc"]');
    scripts.forEach((script) => (code += script.innerHTML + '\n'));

    const MiniZinc = await modPromise;
    return new Promise((resolve) => {
      try {
        const minizincConfig = livecodes.minizinc.config ?? {};
        const model = new MiniZinc.Model();
        model.addFile('playground.mzn', code);
        if (dzn) model.addFile('playground.dzn', dzn);
        if (json) model.addFile('playground.json', json);

        const solve = model.solve({
          jsonOutput: minizincConfig.jsonOutput ?? false,
          options: {
            solver: 'gecode',
            'time-limit': 10000,
            ...minizincConfig.options,
          },
        });

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
            result.solution.output.default ??
            result.solution.output.dzn ??
            result.solution.output.json ??
            result.solution.output.raw ??
            result.solution.output;
          const msg = typeof output === 'string' ? output + status : output;
          // eslint-disable-next-line no-console
          console.log(msg);
          resolve(result);
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        resolve({
          status: 'ERROR',
          errors: [err],
        });
      }
    });
  },
  getSolvers: async () => {
    const MiniZinc = await modPromise;
    return MiniZinc.solvers();
  },
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  livecodes.minizinc.run('init');
} else {
  window.addEventListener('load', () => {
    livecodes.minizinc.run('init');
  });
}
