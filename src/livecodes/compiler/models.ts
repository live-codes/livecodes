import { Language, Config, ProcessorName } from '../models';

export interface Compiler {
  load: (languages: LanguageOrProcessor[], config: Config) => Promise<unknown[]>;
  compile: (content: string, language: Language, config: Config, options?: any) => Promise<string>;
}

export type LanguageOrProcessor = Language | ProcessorName;

export interface CompilerMessageEvent extends MessageEvent {
  data: CompilerMessage;
}

export type CompilerMessage = {
  from?: 'compiler';
} & (
  | InitMessage
  | LoadMessage
  | LoadedMessage
  | CompileMessage
  | CompiledMessage
  | CompileFailedMessage
);

export interface InitMessage {
  type: 'init';
  payload: Config;
  baseUrl: string;
}

export interface LoadMessage {
  type: 'load';
  payload: {
    language: LanguageOrProcessor;
    config: Config;
  };
}

export interface LoadedMessage {
  type: 'loaded';
  payload: LanguageOrProcessor;
}

export interface CompileMessage {
  type: 'compile';
  payload: {
    content: string;
    language: LanguageOrProcessor;
    config: Config;
    options: any;
  };
}

export interface CompiledMessage {
  type: 'compiled';
  payload: {
    content: string;
    language: LanguageOrProcessor;
    compiled: string;
  };
}

export interface CompileFailedMessage {
  type: 'compile-failed';
  payload: {
    content: string;
    language: LanguageOrProcessor;
    error: string;
  };
}
