import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-unresolved
import { appUrl } from '../utils';
// eslint-disable-next-line import/no-internal-modules
import { playground, Config } from '../../../src/lib/livecodes';
import ShowCode from './ShowCode';
import styles from './LiveCodes.module.css';

const url = appUrl + '?';

export default function LiveCodes(props: {
  config?: Config;
  template?: string;
  query?: string;
  style?: Record<string, string>;
  className?: string;
  showCode?: boolean;
}): JSX.Element {
  const containerRef = useRef(null);
  useEffect(() => {
    playground(containerRef.current, {
      appUrl: url + props.query,
      template: props.template,
      config: props.config,
    });
  }, []);

  const options = {
    ...(props.query ? { appUrl: url + props.query } : {}),
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
      <div
        ref={containerRef}
        className={`${styles.container} ${props.className}`}
        style={props.style}
      ></div>
      {props.showCode !== false && <ShowCode language="js">{code}</ShowCode>}
    </>
  );
}
