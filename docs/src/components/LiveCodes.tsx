import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-unresolved
import { appUrl } from '../utils';
// eslint-disable-next-line import/no-internal-modules
import { createPlayground, EmbedOptions } from '../../../src/lib/livecodes';
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
  const containerRef = useRef(null);
  useEffect(() => {
    createPlayground(containerRef.current, {
      appUrl: url + props.query,
      config: props.config,
      import: props.import,
      lite: props.lite,
      loading: props.loading,
      template: props.template,
      view: props.view,
    });
  }, []);

  const options = {
    ...(props.query ? { appUrl: url + props.query } : {}),
    ...(props.config ? { config: props.config } : {}),
    ...(props.import ? { import: props.import } : {}),
    ...(props.lite ? { lite: props.lite } : {}),
    ...(props.loading ? { loading: props.loading } : {}),
    ...(props.template ? { template: props.template } : {}),
    ...(props.view ? { view: props.view } : {}),
  };

  const code = `
import { createPlayground } from 'livecodes';

const options = ${JSON.stringify(options, null, 2)};
createPlayground('#container', options);

`.trimStart();

  return (
    <>
      <div
        ref={containerRef}
        className={`${styles.container} ${props.className}`}
        style={props.style}
      ></div>
      {props.showCode !== false && <ShowCode language="js">{code}</ShowCode>}
    </>
  );
}
