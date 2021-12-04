import { Language, Config, ProcessorName, BlocklyContent } from '../models';

export interface CompileOptions {
  html?: string;
  blockly?: BlocklyContent;
  forceCompile?: boolean;
}

export interface Compiler {
  load: (languages: LanguageOrProcessor[], config: Config) => Promise<unknown[]>;
  compile: (
    content: string,
    language: Language,
    config: Config,
    options: CompileOptions,
  ) => Promise<string>;
  clearCache: () => void;
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
  | CompileInCompilerMessage
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
    compiled: string;
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
