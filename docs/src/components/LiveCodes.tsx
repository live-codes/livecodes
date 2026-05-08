// eslint-disable-next-line import/no-extraneous-dependencies
import { useColorMode } from '@docusaurus/theme-common';
import type { EmbedOptions } from '../../../src/sdk';
import LiveCodesReact from '../../../src/sdk/react';
import { appUrl } from '../utils';
import styles from './LiveCodes.module.css';
import ShowCode from './ShowCode';

export default function LiveCodes(
  props: EmbedOptions & {
    style?: Record<string, string>;
    className?: string;
    showCode?: boolean;
    height?: string;
  },
) {
  const { className, style, showCode, height, ...options } = props;
  const { colorMode } = useColorMode();

  const stringify = (obj: EmbedOptions) => JSON.stringify(obj, null, 2);

  const jsCode = `
import { createPlayground } from 'livecodes';

const options = ${stringify(options)};
createPlayground('#container', options);

`.trimStart();

  const tsCode = `
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${stringify(options)};
createPlayground('#container', options);

`.trimStart();

  const reactCode = `
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${stringify(options)};
  return (<LiveCodes {...options} />);
}

`.trimStart();

  const vueCode = `
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${stringify(options)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`;

  const svelteCode = `
<script>
import LiveCodes from 'livecodes/svelte';

export default function App() {
  const options = ${stringify(options)};
}
</script>

<LiveCodes {...options} />

`.trimStart();

  const solidCode = `
import LiveCodes from 'livecodes/solid';

export default function App() {
  const options = ${stringify(options)};
  return (<LiveCodes {...options} />);
}

`.trimStart();

  const preactCode = `
import LiveCodes from 'livecodes/preact';

export default function App() {
  const options = ${stringify(options)};
  return (<LiveCodes {...options} />);
}

`.trimStart();

  const getWebComponentsCode = (options: EmbedOptions) => {
    const { config, params, ...attrs } = options;

    // Build HTML attributes from simple props
    const attrEntries = Object.entries(attrs)
      .filter(([, v]) => v != null)
      .map(([key, value]) => {
        const attr = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
        if (typeof value === 'boolean') return value ? attr : null;
        return `${attr}="${value}"`;
      })
      .filter(Boolean);

    const attrString = attrEntries.length > 0 ? '\n  ' + attrEntries.join('\n  ') : '';

    // Build property assignments for complex values
    const assignments: string[] = [];
    if (config) {
      assignments.push(
        `playground.config = ${JSON.stringify(config, null, 2).split('\n').join('\n  ')};`,
      );
    }
    if (params) {
      assignments.push(
        `playground.params = ${JSON.stringify(params, null, 2).split('\n').join('\n  ')};`,
      );
    }

    const scriptBody =
      assignments.length > 0
        ? `\n\n  const playground = document.querySelector("live-codes");\n  ${assignments.join('\n  ')}`
        : '';

    return `
<live-codes${attrString}></live-codes>

<script type="module">
  import "livecodes/web-components";${scriptBody}
</script>
`.trimStart();
  };

  const webComponentsCode = getWebComponentsCode(options);

  return (
    <>
      <LiveCodesReact
        className={`${styles.container} ${props.className}`}
        style={{
          height: height || '50vh',
          ...props.style,
        }}
        appUrl={appUrl}
        {...props}
        config={{
          theme: colorMode,
          themeColor: 'hsl(215, 8%, 60%)',
          ...(typeof props.config === 'object' ? props.config : {}),
        }}
      />
      {props.showCode !== false && (
        <ShowCode
          js={jsCode}
          ts={tsCode}
          react={reactCode}
          vue={vueCode}
          svelte={svelteCode}
          solid={solidCode}
          preact={preactCode}
          webComponents={webComponentsCode}
        ></ShowCode>
      )}
    </>
  );
}
