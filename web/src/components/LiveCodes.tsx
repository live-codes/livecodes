import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-unresolved
import { appUrl } from '../utils';
// eslint-disable-next-line import/no-internal-modules
import { playground } from '../../../build/lib/livecodes.esm';
// eslint-disable-next-line import/no-internal-modules
import type { Config } from '../../../build/lib';
import ShowCode from './ShowCode';
import styles from './LiveCodes.module.css';

export const embedUrl = appUrl + '?embed&';

export default function LiveCodes(props: {
  config?: Config;
  template?: string;
  query?: string;
  style?: Record<string, string>;
  showCode?: boolean;
}): JSX.Element {
  const containerRef = useRef(null);
  useEffect(() => {
    playground(containerRef.current, {
      config: props.config,
      template: props.template,
      appUrl: 'http://127.0.0.1:8080/?' + props.query,
    });
  }, []);

  const options = {
    ...(props.query ? { appUrl: 'https://livecodes.io/?' + props.query } : {}),
    ...(props.template ? { template: props.template } : {}),
    ...(props.config ? { config: props.config } : {}),
  };

  const code = `
import { playground } from '@live-codes/livecodes';

const options = ${JSON.stringify(options, null, 2)};
playground('#container', options);

`.trimStart();

  return (
    <>
      <div ref={containerRef} className={styles.container} style={props.style}></div>
      {props.showCode !== false && <ShowCode language="js">{code}</ShowCode>}
    </>
  );
}
