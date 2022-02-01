/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-internal-modules */
import React, { useState, useRef, useEffect } from 'react';
import CodeBlock from '@theme/CodeBlock';
import detailsStyles from '@docusaurus/theme-common/lib/components/Details/styles.module.css';
import detailsStyles2 from '@docusaurus/theme-classic/src/theme/Details/styles.module.css';

const format = (code: string) =>
  (window as any).prettier.format(code, {
    parser: 'babel',
    plugins: (window as any).prettierPlugins,
  });

export default function ShowCode(props: { children: string; language: string }): JSX.Element {
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
          <CodeBlock language={props.language}>{format(props.children)}</CodeBlock>
        </div>
      </div>
    </details>
  );
}
