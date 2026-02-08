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
  return (<LiveCodes {...options}></LiveCodes>);
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
import { onMount } from 'svelte';
import { createPlayground } from 'livecodes';

let options = $state(${stringify(options)});
let container = $state(null);
onMount(() => {
  createPlayground(container, options);
});
</script>

<div bind:this="{container}"></div>

`.trimStart();

  const solidCode = `
import { createPlayground, type EmbedOptions } from 'livecodes';

export default function App() {
  const options: EmbedOptions = ${stringify(options)};
  const onMounted = (container: HTMLElement) => {
    createPlayground(container, options);
  };

  return <div ref={onMounted}></div>;
}

`.trimStart();

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
        ></ShowCode>
      )}
    </>
  );
}
