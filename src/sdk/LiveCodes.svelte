<script lang="ts">
  import { createPlayground, type EmbedOptions, type Playground, type Props } from './svelte.js';

  let {
    class: className = '',
    style = {},
    height = undefined,
    sdkReady = undefined,
    config = undefined,
    appUrl = undefined,
    import: importUrl = undefined,
    headless = undefined,
    lite = undefined,
    loading = undefined,
    params = undefined,
    template = undefined,
    view = undefined,
  }: Props = $props();

  let container: HTMLDivElement;

  // Internal mutable state — intentionally plain variables (not $state)
  // so they don't create reactive dependencies inside the effect.
  // We only want the effect to re-run when *props* change.
  let playground: Playground | undefined;
  let configCache = '';
  let otherOptionsCache = '';

  function buildOtherOptions() {
    const opts: Omit<EmbedOptions, 'config'> = {};
    if (appUrl !== undefined) opts.appUrl = appUrl;
    if (importUrl !== undefined) opts.import = importUrl;
    if (headless !== undefined) opts.headless = headless;
    if (lite !== undefined) opts.lite = lite;
    if (loading !== undefined) opts.loading = loading;
    if (params !== undefined) opts.params = params;
    if (template !== undefined) opts.template = template;
    if (view !== undefined) opts.view = view;
    return opts;
  }

  function styleToString(obj: Record<string, string>, height?: string): string {
    return (
      Object.entries(obj)
        .filter(([key]) => (key === 'height' && height ? false : true))
        .map(([key, val]) => {
          const kebab = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          return `${kebab}: ${val}`;
        })
        .join('; ') + (height ? `; height: ${Number(height) ? `${height}px` : height}` : '')
    );
  }

  let styleString = $derived(styleToString(style, height));

  let generation = 0;

  $effect(() => {
    if (!container) return;

    const currentConfig = config;
    const currentSdkReady = sdkReady;
    const otherOptions = buildOtherOptions();
    const otherOptionsStr = JSON.stringify(otherOptions);
    const configStr = JSON.stringify(currentConfig || '');
    const currentGeneration = ++generation;

    // avoid race conditions if props change while doing async operation (creating playground)
    const isStale = () => currentGeneration !== generation;

    if (!playground || otherOptionsCache !== otherOptionsStr) {
      otherOptionsCache = otherOptionsStr;
      configCache = configStr;
      playground?.destroy();
      playground = undefined;

      createPlayground(container, { config: currentConfig, ...otherOptions }).then((sdk) => {
        if (isStale()) {
          sdk.destroy();
          return;
        }
        playground = sdk;
        if (typeof currentSdkReady === 'function') {
          currentSdkReady(sdk);
        }
      });
    } else {
      if (configCache === configStr) return;
      configCache = configStr;
      if (currentConfig) {
        playground.setConfig(currentConfig);
      }
    }
  });

  $effect(() => {
    return () => {
      ++generation;
      playground?.destroy();
    };
  });
</script>

<div bind:this={container} class={className} style={styleString} data-height={height}></div>
