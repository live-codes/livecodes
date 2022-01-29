import React, { useState, useRef } from 'react';
// eslint-disable-next-line import/no-unresolved
import BrowserOnly from '@docusaurus/BrowserOnly';
// eslint-disable-next-line import/no-unresolved
import CodeBlock from '@theme/CodeBlock';

import { appUrl } from '../utils';

export const embedUrl = appUrl + '?embed&';

export default function LiveCodes(props: {
  query: string;
  style?: Record<string, string>;
}): JSX.Element {
  const codeBlockTitleHeight = '3.7rem';
  const [codeCollapsed, setCodeCollapsed] = useState(true);
  const [height, setHeight] = useState(codeBlockTitleHeight);
  const codeBlockContainer = useRef(null);

  const toggle = () => {
    setCodeCollapsed(!codeCollapsed);
    setTimeout(() => {
      setHeight(`calc(${codeBlockContainer.current.offsetHeight}px + ${codeBlockTitleHeight})`);
    }, 5);
    setTimeout(() => {
      setHeight(`calc(${codeBlockContainer.current.offsetHeight}px + ${codeBlockTitleHeight})`);
    }, 255);
  };
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

          <details
            className="details_node_modules-@docusaurus-theme-common-lib-components-Details-styles-module isBrowser_node_modules-@docusaurus-theme-common-lib-components-Details-styles-module alert alert--info details_node_modules-@docusaurus-theme-classic-lib-next-theme-Details-styles-module"
            data-collapsed={codeCollapsed}
            style={{
              height: codeCollapsed ? codeBlockTitleHeight : height,
              overflow: 'hidden',
              willChange: 'height',
              transition: `height ${codeCollapsed ? '250ms' : '265ms'} ease-in-out 0s`,
            }}
          >
            <summary onClick={toggle}>show code</summary>
            <div
              ref={codeBlockContainer}
              style={{
                display: 'block',
                overflow: 'hidden',
              }}
            >
              <div className="collapsibleContent_node_modules-@docusaurus-theme-common-lib-components-Details-styles-module">
                <CodeBlock language="html">
                  {`<iframe
  src="${embedUrl + props.query}"
></iframe>`}
                </CodeBlock>
              </div>
            </div>
          </details>
        </>
      )}
    </BrowserOnly>
  );
}
