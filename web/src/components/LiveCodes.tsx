import React from 'react';
// eslint-disable-next-line import/no-unresolved
import BrowserOnly from '@docusaurus/BrowserOnly';
import { appUrl } from '../utils';
import ShowCode from './ShowCode';

export const embedUrl = appUrl + '?embed&';

export default function LiveCodes(props: {
  query: string;
  style?: Record<string, string>;
  showCode?: boolean;
}): JSX.Element {
  const code = `<iframe
src="${embedUrl + props.query}"
></iframe>`;

  return (
    <BrowserOnly>
      {() => (
        <>
          <iframe
            src={embedUrl + props.query}
            style={{
              width: '100%',
              height: '70vh',
              borderRadius: '5px',
              border: '1px solid black',
              backgroundColor: '#fff',
              ...props.style,
            }}
            seamless
          ></iframe>
          {props.showCode !== false && <ShowCode language="html">{code}</ShowCode>}
        </>
      )}
    </BrowserOnly>
  );
}
