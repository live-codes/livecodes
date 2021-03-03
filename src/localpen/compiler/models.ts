import { Language, Pen, ProcessorName } from '../models';

export type LanguageOrProcessor = Language | ProcessorName;

export interface CompilerMessageEvent extends MessageEvent {
  data: CompilerMessage;
}

export type CompilerMessage =
  | InitMessage
  | LoadMessage
  | LoadedMessage
  | CompileMessage
  | CompiledMessage
  | CompileFailedMessage;

export interface InitMessage {
  type: 'init';
  payload: Pen;
}

export interface LoadMessage {
  type: 'load';
  payload: {
    language: LanguageOrProcessor;
    config: Pen;
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
    config: Pen;
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
