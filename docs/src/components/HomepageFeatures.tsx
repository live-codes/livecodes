/* eslint-disable import/no-unresolved */
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import HomepageCarousel from './HomepageCarousel';
import styles from './HomepageFeatures.module.css';
import Sliders from './LanguageSliders';
import LiveCodes from './LiveCodes';

interface FeatureItem {
  title: string;
  image?: string;
  description: ReactNode;
}

const FeatureList1: FeatureItem[] = [
  {
    title: 'Feature-Rich',
    image: './img/light-bulb.svg',
    description: (
      <>
        Supports{' '}
        <Link to="./languages">
          <strong>90+ languages/frameworks</strong>
        </Link>
        . TypeScript Support, npm Modules, Console, Compiled code viewer, Tests, Starter Templates,
        Save, Import, Export, Share, Deploy, Assets, Snippets, Backup/Restore, Sync, Broadcast and a
        lot more{' '}
        <Link to="./features">
          <strong>features</strong>
        </Link>
        . Features are downloaded only when used.
      </>
    ),
  },
  {
    title: 'Client-Side!',
    image: './img/clients.svg',
    description: (
      <>
        LiveCodes <strong>runs in the browser</strong>, where all the processing/transpilation
        occurs, with <strong>no server rounds</strong> required. So, after the initial load, it
        becomes pretty <strong>fast</strong>. It can be hosted on any{' '}
        <strong>static file server or CDN</strong>. No <code>npm&nbsp;install</code>s. Just the
        browser!
      </>
    ),
  },
  {
    title: 'Integrations',
    image: './img/integrations.svg',
    description: (
      <>
        Rich set of integrations. <Link to="./features/import">Import</Link> code from{' '}
        <strong>GitHub</strong> files/repos/gists, Gitlab files/repos/snippets, JsBin or web pages.{' '}
        <Link to="./features/export">Export</Link> to GitHub gists, CodePen or JsFiddle.{' '}
        <Link to="./features/deploy">Deploy</Link> to GitHub Pages.{' '}
        <Link to="./features/sync">Sync</Link> to GitHub Repo.
      </>
    ),
  },
];

const FeatureList2: FeatureItem[] = [
  {
    title: 'Powerful Editor',
    image: './img/feather.svg',
    description: (
      <>
        The code editor offers <strong>auto-complete</strong>, intellisense, code
        <strong> format</strong>, multi-cursor editing, <strong>Emmet</strong> support,{' '}
        <strong>Vim and Emacs</strong> modes, editor themes, customizable{' '}
        <Link to="./features/editor-settings">editor settings</Link> and more. The powerful Monaco
        editor (that powers <strong>VS&nbsp;Code</strong>) is used on desktop, and a touch-friendly
        editor is used on mobile.
      </>
    ),
  },

  // {
  //   title: 'AI Code Assistant',
  //   image: './img/magic-wand.svg',
  //   description: (
  //     <>
  //       Leverage the <Link to="./features/ai">power of AI</Link> to help you write/learn code, using
  //       the <strong>free</strong> Copilot alternative. It understands the context of your code and
  //       comments to generate suggestions. It has a wide range of language support, and it works
  //       everywhere (in the <Link to="./getting-started#standalone-app">standalone app</Link>,{' '}
  //       <Link to="./features/embeds">embedded playgrounds</Link> and{' '}
  //       <Link to="./features/self-hosting">self-hosted</Link> apps).
  //     </>
  //   ),
  // },
  {
    title: 'Mobile-Friendly',
    image: './img/responsive.svg',
    description: (
      <>
        LiveCodes offers a great <Link to="./features/mobile">mobile</Link> experience. The{' '}
        <strong>responsive</strong> layout allows working on devices with different screen sizes.
        The <strong>touch-friendly</strong> CodeMirror 6 editor is used on mobile. Don't wait to be
        on your desk. Try your ideas on the go! And then <Link to="./features/share">share</Link> or{' '}
        <Link to="./features/sync">sync</Link> your work across devices. You can even share using{' '}
        <strong>QR code</strong>.
      </>
    ),
  },
];

const FeatureList3: FeatureItem[] = [
  {
    title: 'Standalone App',
    image: './img/star.svg',
    description: (
      <>
        Use the <Link to="./getting-started#standalone-app">standalone app</Link> for quick
        prototyping, testing new ideas or learning a new framework/language. The app remembers your{' '}
        <Link to="./features/user-settings">settings</Link>. Organize your{' '}
        <Link to="./features/projects">projects</Link> and{' '}
        <Link to="./features/assets">assets</Link>. <Link to="./features/share">Share</Link> code
        with friends. <Link to="./features/deploy">Deploy</Link> projects to public URLs.
      </>
    ),
  },
  {
    title: 'Embedded Playgrounds',
    image: './img/add-frame.svg',
    description: (
      <>
        LiveCodes can be <Link to="./features/embeds">embedded</Link> in your web pages. Code can be
        easily <Link to="./features/code-prefill">prefilled</Link>. This is particularly useful for
        educational websites and for library documentations. It is{' '}
        <Link to="./features/security">secure</Link> and highly{' '}
        <Link to="./configuration">configurable</Link>.{' '}
        <Link to="./features/intellisense">Intellisense</Link> is available even for custom
        libraries!
      </>
    ),
  },
  {
    title: 'Developer-Friendly',
    image: './img/code.svg',
    description: (
      <>
        It is easy to <Link to="./getting-started">get started</Link>. LiveCodes is highly{' '}
        <Link to="./configuration/configuration-object">configurable</Link> (even by URL{' '}
        <Link to="./configuration/query-params">query params</Link>). The{' '}
        <Link to="./sdk/">SDK</Link> facilitates <Link to="./features/embeds">embedding</Link>{' '}
        playgrounds and allows easy <Link to="./sdk/js-ts#sdk-methods">communication</Link> with
        them. The SDK is available for <Link to="./sdk/js-ts">vanilla JS/TS</Link>,{' '}
        <Link to="./sdk/react">React</Link>, <Link to="./sdk/vue">Vue</Link>,{' '}
        <Link to="./sdk/svelte">Svelte</Link> and <Link to="./sdk/solid">Solid</Link>. There is also
        a <Link to="./sdk/headless">headless mode</Link> for full control over the UI.
      </>
    ),
  },
];

const FeatureList4: FeatureItem[] = [
  {
    title: 'Documentations',
    image: './img/docs.svg',
    description: (
      <>
        Comprehensive <Link to="./overview">documentations</Link> for{' '}
        <Link to="./features">features</Link>, <Link to="./configuration">configuration</Link> and{' '}
        <Link to="./sdk">SDK</Link> (including <Link to="./api/globals">TypeScript types</Link>).
        Documentations are rich with code samples, live demos and screenshots. A gallery of usage
        examples is provided as a <Link to="pathname:///../stories">storybook</Link>.
      </>
    ),
  },
  {
    title: 'Focused on Privacy',
    image: './img/data-privacy.svg',
    description: (
      <>
        Projects are private by default. The code you write in LiveCodes never leaves your device,
        unless you choose to share, export or sync it. User data is stored in the browser. User code
        runs in a sandboxed environment. <Link to="./features/security">Security</Link> is taken
        seriously.
      </>
    ),
  },
  {
    title: 'Free and Open-Source',
    image: './img/oss.svg',
    description: (
      <>
        LiveCodes is <strong>free</strong>, with <strong>no&nbsp;limits</strong> for use,{' '}
        <strong>no&nbsp;ads</strong> and no&nbsp;account required*.
        <br></br>
        Do you want to <Link to="./features/self-hosting">self-host</Link> it for commercial use? No
        problem! It is{' '}
        <span style={{ whiteSpace: 'nowrap' }}>
          <Link to="./license">
            <strong>MIT-licensed</strong>
          </Link>{' '}
          🎉
        </span>
        <br></br>
        Please consider <Link to="./sponsor">sponsoring LiveCodes</Link> ❤
      </>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      {image && (
        <div className="text--center">
          <img className={styles.featureSvg} alt={title} src={image} />
        </div>
      )}
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

const codeSample = `
import { createPlayground } from "livecodes";

createPlayground("#container", { template: "react" });
`.trimStart();

const ESMCode = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <CodeBlock language="html" showLineNumbers={true}>
      {`
<div id="container"></div>\n<script type="module">
import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes@${siteConfig.customFields.sdkVersion}';

createPlayground('#container', {
  params: {
    markdown: '# Hello LiveCodes!',
    css: 'h1 {color: dodgerblue;}',
    js: 'console.log("Hello, from JS!");',
    console: 'open',
  },
});
</script>`.trimStart()}
    </CodeBlock>
  );
};

export default function HomepageFeatures(): ReactNode {
  return (
    <>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            <Sliders></Sliders>
          </div>
          <div className={'row ' + styles.center}>
            <LiveCodes
              template="react"
              style={{
                height: '70vh',
                width: '95%',
                boxShadow: '0 0 20px var(--ifm-color-secondary-darkest)',
              }}
              showCode={false}
              loading="eager"
            ></LiveCodes>
            <div className="margin-vert--md">
              <p>
                Psst. This is an interactive playground!
                <img
                  src="./img/arrow.svg"
                  alt="arrow-up"
                  style={{
                    height: '2em',
                    verticalAlign: 'middle',
                    marginLeft: '0.5em',
                    marginBottom: '0.7em',
                  }}
                ></img>
                <br></br>
                Try editing the code above and see the changes reflected in the result page.
              </p>
            </div>
          </div>
          <div className={'row ' + styles.center}>
            <p>Want a similar playground for your website?</p>
          </div>
          <div style={{ maxWidth: '35em', margin: 'auto' }}>
            <CodeBlock language="js">{codeSample}</CodeBlock>
          </div>
          <div className={`row ${styles.center} ${styles.buttons}`}>
            <Link
              className=" button button--info button--outline button--lg"
              to="./getting-started"
            >
              Get Started ✈️
            </Link>
            <Link className="button button--primary button--outline button--lg" to="./overview">
              Documentations 📖
            </Link>
          </div>
        </div>
      </section>
      <section className={clsx(styles.features, styles.rowDark)}>
        <div className="container padding-vert--lg">
          <div className="text--center padding-horiz--md">
            <h2 className={styles.padding}>Code Playground That Just Works!</h2>
            <div className={'row ' + styles.center}>
              <div className={clsx('col col--6', styles.left)}>
                <ul>
                  <li>No servers to configure (or pay for!)</li>
                  <li>No databases to maintain (or pay for!)</li>
                  <li>No installs</li>
                  <li>No configuration files</li>
                  <li>No build steps</li>
                  <li>
                    No subscription fees (free and <Link to="./license/">open-source</Link>)
                  </li>
                  <li>No account required *</li>
                  <li>No limits for usage (unlimited private projects)</li>
                  <li>
                    <Link to="./languages/">90+ languages/frameworks/processors</Link>
                  </li>
                  <li>
                    Large set of <Link to="./features/">features</Link> and integrations
                  </li>
                  <li>
                    <Link to="./features/import">Import</Link> code from a wide variety of sources
                  </li>
                  <li>
                    Use modules from <Link to="./features/module-resolution">npm</Link>,{' '}
                    <Link to="./features/module-resolution#deno-modules">deno.land/x</Link>,{' '}
                    <Link to="./features/module-resolution#jsr-modules">jsr</Link>,{' '}
                    <Link to="./features/module-resolution#githubgitlabbitbucket">GitHub</Link>, and
                    others
                  </li>
                  <li>
                    Easily <Link to="./features/embeds">embed</Link> it in your web pages
                  </li>
                  <li>It runs in the browser (client-side)</li>
                </ul>
              </div>
              <div className={clsx('col col--6', styles.left)}>
                <div>
                  <p>
                    <strong>Steps:</strong>
                  </p>
                  <ol className={styles.steps}>
                    <li>
                      Go to{' '}
                      <a href="https://livecodes.io/" target="_blank">
                        livecodes.io
                      </a>
                    </li>
                  </ol>
                  ... and enjoy all the <Link to="./features/">features</Link>!
                </div>
                <hr />
                <div>
                  <p>
                    Do you want to <Link to="./features/embeds">embed</Link> it in a web page?
                  </p>
                  <p>Add this code to your page:</p>
                  <div className={styles.border}>
                    <ESMCode />
                  </div>
                </div>
                <hr />
                <div>
                  <p>
                    Ok, do you want to <Link to="./features/self-hosting">self-host</Link> it?
                  </p>
                  <ol className={styles.steps}>
                    <li>
                      Download a{' '}
                      <a href="https://github.com/live-codes/livecodes/releases" target="_blank">
                        release
                      </a>
                    </li>
                    <li>
                      Put it on a static file server (for free!)
                      <sup>
                        {' '}
                        <a href="https://pages.cloudflare.com/" target="_blank" rel="noopener">
                          1
                        </a>
                        ,{' '}
                        <a href="https://www.netlify.com/" target="_blank" rel="noopener">
                          2
                        </a>
                        ,{' '}
                        <a href="https://firebase.google.com/" target="_blank" rel="noopener">
                          3
                        </a>
                        ,{' '}
                        <a href="https://pages.github.com/" target="_blank" rel="noopener">
                          4
                        </a>
                      </sup>
                    </li>
                  </ol>
                  ... and it just works!
                </div>
              </div>
            </div>
            <p className={styles.finePrint}>
              * GitHub account is required only for features that use{' '}
              <Link to="./features/github-integration">GitHub Integration</Link>.
            </p>
          </div>
        </div>
      </section>
      <section className={clsx(styles.features, styles.rowLight)}>
        <div className="container padding-vert--lg">
          <div className={'row ' + styles.center}>
            {FeatureList1.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
      <section className={clsx(styles.features, styles.rowDark)}>
        <div className="container padding-vert--lg">
          <div className={'row ' + styles.center}>
            {FeatureList2.map((props, idx) => (
              <Feature key={idx} {...{ ...props, idx }} />
            ))}
          </div>
        </div>
      </section>
      <section className={clsx(styles.features, styles.rowLight)}>
        <div className="container padding-vert--lg">
          <div className={'row ' + styles.center}>
            {FeatureList3.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
      <section className={clsx(styles.features, styles.rowDark)}>
        <div className="container padding-vert--lg">
          <div className={'row ' + styles.center}>
            {FeatureList4.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
          <p className={styles.finePrint}>
            The OSI logo trademark is the trademark of Open Source Initiative.<br></br>* GitHub
            account is required only for features that use{' '}
            <Link to="./features/github-integration">GitHub Integration</Link>.
          </p>
        </div>
      </section>
      <section>
        <div className={'container padding-vert--lg ' + styles.center}>
          <div className={['row', styles.carousel, styles.center].join(' ')}>
            <h3>Screenshots</h3>
            <HomepageCarousel></HomepageCarousel>
          </div>
        </div>
      </section>
      <section>
        <div className={'container padding-vert--lg ' + styles.center}>
          <div className={['row', styles.carousel, styles.center].join(' ')}>
            <div className={styles.buttons}>
              <Link className="button button--primary button--outline button--lg" to="./overview">
                Documentations 📖
              </Link>
              <Link
                className=" button button--info button--outline button--lg"
                href="pathname:///../?new"
                target="_blank"
              >
                New Project ✨
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
