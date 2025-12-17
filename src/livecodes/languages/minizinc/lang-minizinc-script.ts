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

livecodes.minizinc = {
  run: async (data: { dzn: string; json: string } | 'init') => {
    if (data === 'init' && hasRun) return;
    const { dzn = '', json = '' } = data === 'init' ? {} : data;
    hasRun = true;
    await pageLoaded;
    let code = '';
    const scripts = document.querySelectorAll('script[type="text/minizinc"]');
    scripts.forEach((script) => (code += script.innerHTML + '\n'));

    const { Model } = await import(minizincUrl);
    return new Promise((resolve) => {
      const minizincConfig = livecodes.minizinc.config ?? {};
      const model = new Model();
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
      solve.on('exit', (_msg: any) => {
        if (errors.length) {
          resolve({
            status: 'ERROR',
            errors,
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
    });
  },
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  livecodes.minizinc.run('init');
} else {
  window.addEventListener('load', () => {
    livecodes.minizinc.run('init');
  });
}
