import type { FormatFn, FormatterConfig, Language } from '../models';

export interface Formatter {
  load: (languages: Language[]) => Promise<string>;
  getFormatFn: (language: Language) => Promise<FormatFn>;
  destroy: () => void;
}

export interface FormatterMessageEvent extends MessageEvent {
  data: FormatterMessage;
}

export type FormatterMessage =
  | InitMessage
  | LoadMessage
  | LoadedMessage
  | LoadFailedMessage
  | FormatMessage
  | FormattedMessage
  | FormatFailedMessage;

export interface InitMessage {
  type: 'init';
  baseUrl: string;
}

export interface LoadMessage {
  type: 'load';
  payload: Language[];
}
export interface LoadedMessage {
  type: 'loaded';
  payload: Language[];
}
export interface LoadFailedMessage {
  type: 'load-failed';
  payload: Language[];
}

export interface FormatMessage {
  type: 'format';
  payload: {
    language: Language;
    value: string;
    cursorOffset: number;
    formatterConfig: Partial<FormatterConfig>;
  };
}

export interface FormattedMessage {
  type: 'formatted';
  payload: {
    language: Language;
    value: string;
    cursorOffset: number;
    formatted: string;
    formattedCursorOffset: number;
  };
}

export interface FormatFailedMessage {
  type: 'format-failed';
  payload: {
    language: Language;
    value: string;
    cursorOffset: number;
    error: string;
  };
}
