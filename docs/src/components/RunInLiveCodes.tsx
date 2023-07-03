/* eslint-disable import/no-unresolved */
import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import CodeBlock from '@theme/CodeBlock';
/* eslint-disable import/no-internal-modules */
import type { EmbedOptions } from '../../../src/sdk';
import { appUrl } from '../utils';
import styles from './LiveCodes.module.css';

export default function RunInLiveCodes(props: {
  params: EmbedOptions['params'];
  code?: string;
  language?: string;
  formatCode?: boolean;
  linkText?: string;
}): JSX.Element {
  const { params, code, language = 'js', formatCode = true, linkText = 'Run in LiveCodes' } = props;
  const url = new URL(appUrl);
  if (typeof params === 'object') {
    (Object.keys(params) as string[]).forEach((param) => {
      url.searchParams.set(param, String(params[param]));
    });
  }
  return (
    <div style={{ marginBottom: '30px' }}>
      {code && (
        <BrowserOnly>
          {() => {
            const format = (str: string, lang = 'js') =>
              (window as any).prettier?.format(str, {
                parser: lang === 'html' ? 'html' : 'babel',
                plugins: (window as any).prettierPlugins,
              });

            return (
              <CodeBlock language={language}>
                {formatCode ? format(code, language) : code}
              </CodeBlock>
            );
          }}
        </BrowserOnly>
      )}
      <a href={url.href} target="_blank" rel="noreferrer">
        {linkText}
        <svg
          width="12"
          height="12"
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"
        >
          <path
            fill="currentColor"
            d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
          ></path>
        </svg>
      </a>
    </div>
  );
}
