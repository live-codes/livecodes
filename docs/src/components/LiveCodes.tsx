import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { appUrl } from '../utils';
/* eslint-disable import/no-internal-modules */
import { EmbedOptions } from '../../../src/sdk';
import LiveCodesReact from '../../../src/sdk/react';
import ShowCode from './ShowCode';
import styles from './LiveCodes.module.css';

export default function LiveCodes(
  props: EmbedOptions & {
    query?: string;
    style?: Record<string, string>;
    className?: string;
    showCode?: boolean;
  },
): JSX.Element {
  // TODO: improve this: use `new URL()` & searchParams
  const url = (props.appUrl || appUrl) + '?';

  const options = {
    ...(props.query ? { appUrl: url + props.query } : {}),
    ...(props.config ? { config: props.config } : {}),
    ...(props.import ? { import: props.import } : {}),
    ...(props.lite ? { lite: props.lite } : {}),
    ...(props.loading ? { loading: props.loading } : {}),
    ...(props.template ? { template: props.template } : {}),
    ...(props.view ? { view: props.view } : {}),
  };

  const jsCode = `
import { createPlayground } from 'livecodes';

const options = ${JSON.stringify(options, null, 2)};
createPlayground('#container', options);

`.trimStart();

  const tsCode = `
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${JSON.stringify(options, null, 2)};
createPlayground('#container', options);

`.trimStart();

  const reactCode = `
import LiveCodes from 'livecodes/react';
export default function app() {
  const options = ${JSON.stringify(options, null, 2)};
  return (<LiveCodes {...options}></LiveCodes>);
}

`.trimStart();

  const vueCode = `
<script setup>
import LiveCodes from "livecodes/vue";
const options = ${JSON.stringify(options, null, 2)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`;

  return (
    <>
      <LiveCodesReact
        className={`${styles.container} ${props.className}`}
        style={{
          height: '50vh',
          ...props.style,
        }}
        appUrl={url + props.query}
        {...props}
      ></LiveCodesReact>
      {props.showCode !== false && (
        <ShowCode js={jsCode} ts={tsCode} react={reactCode} vue={vueCode}></ShowCode>
      )}
    </>
  );
}
