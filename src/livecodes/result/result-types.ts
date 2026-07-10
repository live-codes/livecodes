export type ConsoleSource = 'markup' | 'script';

export type ConsoleDisplaySource = ConsoleSource | 'style';

export interface ConsoleCallSite {
  lineNumber?: number;
  source: ConsoleSource;
  callerFrame?: string;
  markupOffset?: number;
  scriptOffset?: number;
  externalScriptFrame?: boolean;
}

export interface ConsoleErrorSite {
  lineNumber?: number;
  source: ConsoleSource;
  rawLine?: number;
  markupOffset: number;
  scriptOffset: number;
  externalScript: boolean;
}

export const isConsoleDisplaySource = (source: unknown): source is ConsoleDisplaySource =>
  source === 'markup' || source === 'style' || source === 'script';
