import type { Language, Config, Processor, CompileOptions, CompileResult } from '../models';

export interface Compiler {
  load: (languages: LanguageOrProcessor[], config: Config) => Promise<unknown[]>;
  compile: (
    content: string,
    language: Language,
    config: Config,
    options: CompileOptions,
  ) => Promise<CompileResult>;
  clearCache: () => void;
}

export type LanguageOrProcessor = Language | Processor;

export interface CompilerMessageEvent extends MessageEvent {
  data: CompilerMessage;
}

export type CompilerMessage = {
  from?: 'compiler';
} & (
  | InitMessage
  | InitSuccessMessage
  | LoadMessage
  | LoadedMessage
  | LoadFailedMessage
  | CompileMessage
  | CompileInCompilerMessage
  | CompiledMessage
  | CompileFailedMessage
);

export interface InitMessage {
  type: 'init';
  payload: Config;
  baseUrl: string;
  scriptUrl: string;
}

export interface InitSuccessMessage {
  type: 'init-success';
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

export interface LoadFailedMessage {
  type: 'load-failed';
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

export interface CompileInCompilerMessage {
  type: 'compileInCompiler';
  payload: {
    content: string;
    language: LanguageOrProcessor;
    config: Config;
    options: any;
  };
}

export interface CompiledMessage {
  type: 'compiled';
  trigger: 'compile' | 'compileInCompiler';
  payload: {
    content: string;
    language: LanguageOrProcessor;
    compiled: string | CompileResult;
    config: Config;
    options: any;
  };
}

export interface CompileFailedMessage {
  type: 'compile-failed';
  trigger: 'compile' | 'compileInCompiler';
  payload: {
    content: string;
    language: LanguageOrProcessor;
    error: string;
  };
}
