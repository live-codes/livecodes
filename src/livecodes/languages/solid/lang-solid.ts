import type { LanguageSpecs } from '../../models';
import { modulesService } from '../../services/modules';
import { vendorsBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const solid: LanguageSpecs = {
  name: 'solid',
  title: 'Solid',
  formatter: {
    prettier: {
      name: 'babel',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
  },
  compiler: {
    dependencies: ['babel'],
    url: vendorsBaseUrl + 'solid-babel-plugin/solid-babel-plugin.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-solid-compiler.js}}');
      return (self as any).createSolidCompiler();
    },
    imports: {
      'solid-js': modulesService.getModuleUrl('solid-js@2'),
      'solid-js/': modulesService.getModuleUrl('solid-js@2') + '/',
      '@solidjs/web': modulesService.getModuleUrl('@solidjs/web@2', { external: 'solid-js' }),
    },
    types: {
      '@solidjs/web/jsx-runtime': {
        url: vendorsBaseUrl + 'types/solid-js-2-jsx.d.ts',
        declareAsModule: false,
        autoload: true,
      },
    },
  },
  extensions: ['solid.jsx'],
  editor: 'script',
  editorLanguage: 'javascript',
  editorSupport: {
    compilerOptions: {
      jsx: 1, // monaco.languages.typescript.JsxEmit.Preserve,
      jsxImportSource: '@solidjs/web',
      jsxFactory: 'JSX',
      jsxFragmentFactory: 'Fragment',
    },
  },
};
