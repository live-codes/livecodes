import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function LiveCodes(props: {
  src: string;
  style?: Record<string, string>;
}): JSX.Element {
  return (
    <BrowserOnly>
      {() => {
        console.log(location.hostname);

        const baseUrl =
          location.hostname.startsWith('127.0.0.1') || location.hostname.startsWith('localhost')
            ? 'http://127.0.0.1:8080/'
            : location.origin;
        return (
          <iframe
            src={baseUrl + props.src}
            style={
              props.style || {
                width: '100%',
                height: '70vh',
                borderRadius: '5px',
                border: '1px solid black',
                backgroundColor: '#fff',
              }
            }
            seamless
          ></iframe>
        );
      }}
    </BrowserOnly>
  );
}
