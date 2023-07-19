/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-internal-modules */
import React, { useState, useRef, useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import detailsStyles from '../../node_modules/@docusaurus/theme-common/src/components/Details/styles.module.css';
import detailsStyles2 from '../../node_modules/@docusaurus/theme-classic/src/theme/Details/styles.module.css';

export default function ShowCode(props: {
  js: string;
  ts: string;
  react: string;
  vue: string;
  svelte: string;
}): JSX.Element {
  const [jsCode, setJsCode] = useState(props.js);
  const [tsCode, setTsCode] = useState(props.ts);
  const [reactCode, setReactCode] = useState(props.react);
  const [vueCode, setVueCode] = useState(props.vue);
  const [svelteCode, setSvelteCode] = useState(props.svelte);

  const codeBlockTitleHeight = '3.7rem';
  const [codeCollapsed, setCodeCollapsed] = useState(true);
  const [height, setHeight] = useState(codeBlockTitleHeight);
  const codeBlockContainer = useRef(null);

  const resize = () => {
    setTimeout(() => {
      setHeight(`calc(${codeBlockContainer.current.offsetHeight}px + ${codeBlockTitleHeight})`);
    }, 5);
    setTimeout(() => {
      setHeight(`calc(${codeBlockContainer.current.offsetHeight}px + ${codeBlockTitleHeight})`);
    }, 255);
  };

  const toggle = () => {
    setCodeCollapsed(!codeCollapsed);
    resize();
  };

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      const format = (code: string, language = 'js') => {
        try {
          return (window as any).prettier?.format(code, {
            parser: language === 'html' ? 'html' : 'babel',
            plugins: (window as any).prettierPlugins,
          });
        } catch {
          return code;
        }
      };
      setJsCode(format(jsCode, 'js'));
      setTsCode(format(tsCode, 'ts'));
      setReactCode(format(reactCode, 'jsx'));
      setVueCode(format(vueCode, 'html'));
      setSvelteCode(format(svelteCode, 'html'));
    }
  }, []);

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
            <TabItem value="js" label="JS" attributes={{ onMouseDown: resize }}>
              <CodeBlock language="js">{jsCode}</CodeBlock>
            </TabItem>
            <TabItem value="ts" label="TS" attributes={{ onMouseDown: resize }}>
              <CodeBlock language="ts">{tsCode}</CodeBlock>
            </TabItem>
            <TabItem value="react" label="React" attributes={{ onMouseDown: resize }}>
              <CodeBlock language="jsx">{reactCode}</CodeBlock>
            </TabItem>
            <TabItem value="vue" label="Vue" attributes={{ onMouseDown: resize }}>
              <CodeBlock language="html">{vueCode}</CodeBlock>
            </TabItem>
            <TabItem value="svelte" label="Svelte" attributes={{ onMouseDown: resize }}>
              <CodeBlock language="html">{svelteCode}</CodeBlock>
            </TabItem>
          </Tabs>
        </div>
      </div>
    </details>
  );
}
