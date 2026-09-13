import type { HaskellResponse } from '../models';
import { createHaskellRunner } from '../runner';

describe('Haskell runner', () => {
  const setup = () => {
    const workers: Worker[] = [];
    const createWorker = jest.fn(() => {
      const worker = {
        postMessage: jest.fn(),
        terminate: jest.fn(),
        onmessage: null,
        onerror: null,
      } as unknown as Worker;
      workers.push(worker);
      return worker;
    });
    const respond = (data: HaskellResponse) => {
      const worker = workers[workers.length - 1];
      worker.onmessage!.call(worker, { data } as MessageEvent<HaskellResponse>);
    };
    return { runner: createHaskellRunner(createWorker), workers, respond, createWorker };
  };

  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test('rejects stalled initialization and allows retry', async () => {
    const { runner, workers, respond } = setup();
    const init = runner.init();
    const rejection = expect(init).rejects.toThrow('timed out');
    jest.advanceTimersByTime(300_000);
    await rejection;
    expect(workers[0].terminate).toHaveBeenCalledTimes(1);
    const retry = runner.init();
    respond({ type: 'ready' });
    await retry;
    expect(workers).toHaveLength(2);
    expect(jest.getTimerCount()).toBe(0);
  });

  test('settles initialization errors and starts a fresh worker', async () => {
    const { runner, workers, respond } = setup();
    const init = runner.init();
    respond({ type: 'error', message: 'Download failed' });
    await expect(init).rejects.toThrow('Download failed');
    expect(workers[0].terminate).toHaveBeenCalledTimes(1);
    const retry = runner.init();
    respond({ type: 'ready' });
    await retry;
    expect(workers).toHaveLength(2);
  });

  test('serializes executions and preserves stdout and diagnostics', async () => {
    const { runner, workers, respond } = setup();
    const init = runner.init();
    respond({ type: 'ready' });
    await init;
    const first = runner.run('main = print 1');
    const second = runner.run('main = print 2');
    await Promise.resolve();
    await Promise.resolve();
    expect(workers[0].postMessage).toHaveBeenCalledTimes(2);
    respond({ type: 'result', result: { output: '1\n', error: 'warning', exitCode: 0 } });
    await expect(first).resolves.toEqual({ output: '1\n', error: 'warning', exitCode: 0 });
    await Promise.resolve();
    expect(workers[0].postMessage).toHaveBeenLastCalledWith({
      type: 'run',
      code: 'main = print 2',
    });
    respond({ type: 'result', result: { output: '2\n', error: '', exitCode: 0 } });
    await expect(second).resolves.toEqual({ output: '2\n', error: '', exitCode: 0 });
    expect(jest.getTimerCount()).toBe(0);
  });

  test('keeps the worker alive after a Haskell error', async () => {
    jest.useRealTimers();
    const { runner, workers, respond } = setup();
    const init = runner.init();
    respond({ type: 'ready' });
    await init;
    const failure = runner.run('main = missingValue');
    await new Promise((resolve) => setTimeout(resolve, 0));
    respond({ type: 'result', result: { output: '', error: 'missingValue', exitCode: 1 } });
    await expect(failure).resolves.toEqual({ output: '', error: 'missingValue', exitCode: 1 });
    const retry = runner.run('main = print 42');
    await new Promise((resolve) => setTimeout(resolve, 0));
    respond({ type: 'result', result: { output: '42\n', error: '', exitCode: 0 } });
    await expect(retry).resolves.toEqual({ output: '42\n', error: '', exitCode: 0 });
    expect(workers).toHaveLength(1);
  });

  test('rejects a timed-out run and recovers on the next run', async () => {
    const { runner, workers, respond } = setup();
    const init = runner.init();
    respond({ type: 'ready' });
    await init;
    const first = runner.run('main = main');
    const rejection = expect(first).rejects.toThrow('timed out');
    await Promise.resolve();
    await Promise.resolve();
    jest.advanceTimersByTime(120_000);
    await rejection;
    expect(workers[0].terminate).toHaveBeenCalledTimes(1);
    const retry = runner.run('main = print 42');
    await Promise.resolve();
    respond({ type: 'ready' });
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    respond({ type: 'result', result: { output: '42\n', error: '', exitCode: 0 } });
    await expect(retry).resolves.toEqual({ output: '42\n', error: '', exitCode: 0 });
    expect(workers).toHaveLength(2);
  });
});
