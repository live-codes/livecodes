// eslint-disable-next-line import/no-unresolved
import Link from '@docusaurus/Link';
// eslint-disable-next-line import/no-unresolved
import CodeBlock from '@theme/CodeBlock';

import React from 'react';
import clsx from 'clsx';
import { appUrl } from '../utils';
import styles from './HomepageFeatures.module.css';
import LiveCodes from './LiveCodes';
import Sliders from './LanguageSliders';
import HomepageCarousel from './HomepageCarousel';

interface FeatureItem {
  title: string;
  image?: string;
  description: JSX.Element;
}

const FeatureList1: FeatureItem[] = [
  {
    title: 'Feature-Rich',
    image: './img/light-bulb.svg',
    description: (
      <>
        Supports{' '}
        <Link to="./docs/languages">
          <strong>60+ languages/frameworks</strong>
        </Link>
        . Save, Import, Export, Share, Deploy, NPM Modules, Code Format, Starter Templates, Console,
        Intellisense, Auto-loading TS Types, Emmet Support and a lot more{' '}
        <Link to="./docs/features">
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
        occurs, with <strong>no server rounds</strong> required. So, after the initial load it
        becomes pretty <strong>fast</strong>. It can be hosted on any{' '}
        <strong>static file server or CDN</strong>. No <code>npm&nbsp;install</code>s. Just the
        browser!
      </>
    ),
  },
  {
    title: 'Mobile-Friendly',
    image: './img/responsive.svg',
    description: (
      <>
        It has a <strong>responsive</strong> layout. We use the powerful Monaco editor (that powers{' '}
        <strong>VS&nbsp;Code</strong>) on desktop, and the <strong>touch-friendly</strong>{' '}
        CodeMirror 6 editor on mobile. Don't wait to be on your desk. Try your ideas on the go!
      </>
    ),
  },
];

const FeatureList2: FeatureItem[] = [
  {
    title: 'Standalone App',
    image: './img/star.svg',
    description: (
      <>
        Use the standalone app for quick prototyping, testing new ideas or learning a new
        framework/language. Share your code with friends. Deploy your project to a public URL.
      </>
    ),
  },
  {
    title: 'Embeds',
    image: './img/add-frame.svg',
    description: (
      <>
        LiveCodes can be <Link to="./docs/features/embeds">embedded</Link> in your web pages. Code
        can be easily <Link to="./docs/features/code-preload">preloaded</Link>. This is particularly
        useful for educational websites and for library documentations. It is{' '}
        <Link to="./docs/features/security">secure</Link> and highly{' '}
        <Link to="./docs/configuration">configurable</Link>.{' '}
        <Link to="./docs/features/intellisense">Intellisense</Link> is available even for custom
        libraries!
      </>
    ),
  },
  {
    title: 'Integrations',
    image: './img/integrations.svg',
    description: (
      <>
        Rich set of integrations. <Link to="./docs/features/import">Import</Link> code from{' '}
        <strong>GitHub</strong> files/repos/gists, <strong>Gitlab</strong> files/repos/snippets,{' '}
        <strong>JsBin</strong> or <strong>web pages</strong>.{' '}
        <Link to="./docs/features/export">Export</Link> to GitHub gists, <strong>CodePen</strong> or{' '}
        <strong>JsFiddle</strong>. <Link to="./docs/features/deploy">Deploy</Link> to GitHub Pages.
      </>
    ),
  },
];

const FeatureList3: FeatureItem[] = [
  {
    title: 'Free and Open-Source',
    image: './img/oss.svg',
    description: (
      <>
        LiveCodes is <strong>free</strong>,<br></br> with no ads and no account required.*<br></br>
        Do you need to <Link to="./docs/getting-started#self-hosted">self-host</Link> it for
        commercial use? No problem! It is{' '}
        <span style={{ whiteSpace: 'nowrap' }}>
          <Link to="./docs/license">
            <strong>MIT-licensed</strong>
          </Link>{' '}
          🎉
        </span>
        <br></br>
        Please consider <Link to="./docs/sponsor">sponsoring LiveCodes</Link> ❤
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
import { playground } from "@live-codes/livecodes";

playground("#container", { template: "react" });
`.trimStart();

export default function HomepageFeatures(): JSX.Element {
  return (
    <>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            <Sliders></Sliders>
          </div>
          <div className={'row ' + styles.center}>
            <LiveCodes
              query="template=react"
              style={{
                height: '70vh',
                width: '95%',
                boxShadow: '0 0 20px var(--ifm-color-secondary-darkest)',
              }}
              showCode={false}
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
              className="button button--primary button--outline button--lg"
              to="/web/docs/examples/display-modes/"
            >
              Examples 🎨
            </Link>
            <Link
              className=" button button--info button--outline button--lg"
              to="./docs/getting-started"
            >
              Get Started ✈️
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.rowDark}>
        <div className="container padding-vert--lg">
          <div className={'row ' + styles.center}>
            {FeatureList1.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container padding-vert--lg">
          <div className={'row ' + styles.center}>
            {FeatureList2.map((props, idx) => (
              <Feature key={idx} {...{ ...props, idx }} />
            ))}
          </div>
        </div>
      </section>
      <section className={styles.rowDark}>
        <div className="container padding-vert--lg">
          <div className={'row ' + styles.center}>
            {FeatureList3.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
          <p className={styles.finePrint}>
            The OSI logo trademark is the trademark of Open Source Initiative.<br></br>* GitHub
            account is required only for features that use GitHub Integration.
          </p>
        </div>
      </section>
      <section>
        <div className={'container padding-vert--lg ' + styles.center}>
          <div className={['row', styles.carousel, styles.center].join(' ')}>
            <HomepageCarousel></HomepageCarousel>
          </div>
        </div>
      </section>
      <section>
        <div className={'container padding-vert--lg ' + styles.center}>
          <div className={['row', styles.carousel, styles.center].join(' ')}>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--outline button--lg"
                to="./docs/getting-started"
              >
                Documentation 📖
              </Link>
              <Link
                className=" button button--info button--outline button--lg"
                to={appUrl + '?screen=new'}
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
