import type * as Monaco from 'monaco-editor';
import type { Language } from '../models';

type CompilerOptions = Monaco.languages.typescript.CompilerOptions;

export const getCompilerOptions = (language: Language): CompilerOptions => {
  const JSLangs = ['javascript', 'jsx', 'react', 'flow', 'solid', 'react-native'];
  const hasJsx = [
    'jsx',
    'tsx',
    'react',
    'react-tsx',
    'sucrase',
    'babel',
    'flow',
    'solid',
    'solid.tsx',
    'react-native',
    'react-native-tsx',
  ];
  const isJSLang = JSLangs.includes(language);
  const isJsx = hasJsx.includes(language);
  const nonReactJsx = ['solid', 'solid.tsx', 'stencil'].includes(language);

  const settings: CompilerOptions = {
    allowJs: true,
    checkJs: !isJSLang,
    strictNullChecks: !isJSLang,
    allowNonTsExtensions: true,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    allowSyntheticDefaultImports: true,
    allowUmdGlobalAccess: true,
    esModuleInterop: true,
    target: 7, // monaco.languages.typescript.ScriptTarget.ES2020,
    module: 99, // monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: 2, // monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  };

  const jsxSettings: CompilerOptions = {
    jsx: 4, // monaco.languages.typescript.JsxEmit.ReactJSX,
    // jsxFactory: 'React.createElement',
    // reactNamespace: 'React',
    // jsxFragmentFactory: 'React.Fragment',
  };

  const nonReactJsxSettings: CompilerOptions = {
    jsx: 1, // monaco.languages.typescript.JsxEmit.Preserve,
    jsxFactory: 'h',
    ...(['solid', 'solid.tsx'].includes(language)
      ? { jsxImportSource: 'solid-js', jsxFactory: 'JSX' }
      : {}),
    jsxFragmentFactory: 'Fragment',
  };

  return {
    ...settings,
    ...(isJsx ? jsxSettings : {}),
    ...(nonReactJsx ? nonReactJsxSettings : {}),
  };
};
