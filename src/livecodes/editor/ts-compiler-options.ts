import type * as Monaco from 'monaco-editor';

export const getCompilerOptions = (): Monaco.languages.typescript.CompilerOptions => ({
  allowJs: true,
  checkJs: false,
  strictNullChecks: false,
  allowNonTsExtensions: true,
  experimentalDecorators: true,
  emitDecoratorMetadata: true,
  allowSyntheticDefaultImports: true,
  allowUmdGlobalAccess: true,
  esModuleInterop: true,
  target: 7, // monaco.languages.typescript.ScriptTarget.ES2020,
  module: 99, // monaco.languages.typescript.ModuleKind.ESNext,
  moduleResolution: 2, // monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  lib: ['es2021', 'dom', 'dom.iterable'],
});
