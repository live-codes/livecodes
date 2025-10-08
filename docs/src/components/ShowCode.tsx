/* eslint-disable import/no-unresolved */

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import detailsStyles2 from '../../node_modules/@docusaurus/theme-classic/src/theme/Details/styles.module.css';
import detailsStyles from '../../node_modules/@docusaurus/theme-common/src/components/Details/styles.module.css';

export default function ShowCode(props: {
  js: string;
  ts: string;
  react: string;
  vue: string;
  svelte: string;
  solid: string;
  ripple: string;
}): ReactNode {
  const [jsCode, setJsCode] = useState(props.js);
  const [tsCode, setTsCode] = useState(props.ts);
  const [reactCode, setReactCode] = useState(props.react);
  const [vueCode, setVueCode] = useState(props.vue);
  const [svelteCode, setSvelteCode] = useState(props.svelte);
  const [solidCode, setSolidCode] = useState(props.solid);
  const [rippleCode, setRippleCode] = useState(props.ripple);

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
      setSolidCode(format(solidCode, 'tsx'));
      setRippleCode(format(rippleCode, 'tsx'));
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
            <TabItem value="solid" label="Solid" attributes={{ onMouseDown: resize }}>
              <CodeBlock language="tsx">{solidCode}</CodeBlock>
            </TabItem>
            <TabItem value="ripple" label="Ripple" attributes={{ onMouseDown: resize }}>
              <CodeBlock language="tsx">{rippleCode}</CodeBlock>
            </TabItem>
          </Tabs>
        </div>
      </div>
    </details>
  );
}
