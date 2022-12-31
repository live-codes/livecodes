/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-internal-modules */
import React, { useState, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import detailsStyles from '../../node_modules/@docusaurus/theme-common/src/components/Details/styles.module.css';
import detailsStyles2 from '../../node_modules/@docusaurus/theme-classic/src/theme/Details/styles.module.css';

export default function ShowCode(props: { js: string; ts: string; react: string }): JSX.Element {
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
      {() => {
        const format = (code: string) =>
          (window as any).prettier.format(code, {
            parser: 'babel',
            plugins: (window as any).prettierPlugins,
          });

        return (
          <details
            className={`alert alert--info ${detailsStyles.details} ${detailsStyles2.details}`}
            data-collapsed={codeCollapsed}
            style={{
              height: codeCollapsed ? codeBlockTitleHeight : height,
              overflow: 'hidden',
              willChange: 'height',
              transition: `height ${codeCollapsed ? '250ms' : '265ms'} ease-in-out 0s`,
              margin: '1em 0',
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
              <div className={detailsStyles.collapsibleContent}>
                <Tabs groupId="sdk-code">
                  <TabItem value="js" label="JS">
                    <CodeBlock language="js">{format(props.js)}</CodeBlock>
                  </TabItem>
                  <TabItem value="ts" label="TS">
                    <CodeBlock language="ts">{format(props.ts)}</CodeBlock>
                  </TabItem>
                  <TabItem value="react" label="React">
                    <CodeBlock language="jsx">{format(props.react)}</CodeBlock>
                  </TabItem>
                </Tabs>
              </div>
            </div>
          </details>
        );
      }}
    </BrowserOnly>
  );
}
