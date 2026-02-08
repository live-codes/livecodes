import type { LanguageSpecs } from '../../models';
import { modulesService } from '../../services';
import { svelteBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const svelte: LanguageSpecs = {
  name: 'svelte',
  title: 'Svelte',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html, parserPlugins.babel],
  },
  compiler: {
    url: svelteBaseUrl + 'compiler/index.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-svelte-compiler.js}}');
      return (self as any).createSvelteCompiler();
    },
    imports: {
      // from https://github.com/sveltejs/svelte/blob/main/packages/svelte/package.json
      '#client/constants': svelteBaseUrl + 'src/internal/client/constants.js',
      '#compiler/builders': svelteBaseUrl + 'src/compiler/utils/builders.js',
      svelte: svelteBaseUrl + 'src/index-client.js',
      'svelte/animate': svelteBaseUrl + 'src/animate/index.js',
      'svelte/attachments': svelteBaseUrl + 'src/attachments/index.js',
      'svelte/easing': svelteBaseUrl + 'src/easing/index.js',
      'svelte/internal': svelteBaseUrl + 'src/internal/index.js',
      'svelte/internal/client': svelteBaseUrl + 'src/internal/client/index.js',
      'svelte/internal/disclose-version': svelteBaseUrl + 'src/internal/disclose-version.js',
      'svelte/internal/flags/legacy': svelteBaseUrl + 'src/internal/flags/legacy.js',
      'svelte/internal/flags/tracing': svelteBaseUrl + 'src/internal/flags/tracing.js',
      'svelte/internal/server': svelteBaseUrl + 'src/internal/server/index.js',
      'svelte/legacy': svelteBaseUrl + 'src/legacy/legacy-client.js',
      'svelte/motion': svelteBaseUrl + 'src/motion/index.js',
      'svelte/reactivity': svelteBaseUrl + 'src/reactivity/index-client.js',
      'svelte/reactivity/window': svelteBaseUrl + 'src/reactivity/window/index.js',
      'svelte/server': svelteBaseUrl + 'src/server/index.js',
      'svelte/store': svelteBaseUrl + 'src/store/index-client.js',
      'svelte/transition': svelteBaseUrl + 'src/transition/index.js',
      'svelte/events': svelteBaseUrl + 'src/events/index.js',
      clsx: modulesService.getModuleUrl('clsx'),
      'esm-env': modulesService.getModuleUrl('esm-env'),
    },
    inlineScript: 'globalThis.process = { env: { NODE_ENV: "production" } };',
  },
  extensions: ['svelte'],
  editor: 'script',
};

export const svelteApp: LanguageSpecs = {
  ...svelte,
  name: 'svelte-app',
  compiler: 'svelte',
  extensions: ['app.svelte'],
  editor: 'markup',
  editorLanguage: 'html',
};
