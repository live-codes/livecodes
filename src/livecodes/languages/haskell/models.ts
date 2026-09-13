export interface HaskellResult {
  output: string;
  error: string;
  exitCode: number;
}

export type HaskellRequest = { type: 'init'; bsdtarUrl: string } | { type: 'run'; code: string };

export type HaskellResponse =
  | { type: 'ready' }
  | { type: 'result'; result: HaskellResult }
  | { type: 'error'; message: string };
