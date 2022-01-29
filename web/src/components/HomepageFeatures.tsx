// eslint-disable-next-line import/no-unresolved
import Link from '@docusaurus/Link';
import React from 'react';
import clsx from 'clsx';
import { appUrl } from '../utils';
import styles from './HomepageFeatures.module.css';
import LiveCodes from './LiveCodes';
import Sliders from './LanguageSliders';
import HomepageCarousel from './HomepageCarousel';

interface FeatureItem {
  title: string;
  image: string;
  description: JSX.Element;
}

const FeatureList: FeatureItem[] = [
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
        Intellisense, Auto-loading TS Types, Emmet Support, GitHub Integration and a lot more{' '}
        <Link to="./docs/features">
          <strong>features</strong>
        </Link>
        . Only used features are loaded to stay light-weight.
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

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
interface ModeItem {
  title: string;
  description: JSX.Element;
}

const ModeList: ModeItem[] = [
  {
    title: 'Standalone App',
    description: (
      <>
        Use the standalone hosted app on{' '}
        <Link to="https://livecodes.io" target="_blank">
          livecodes.io
        </Link>
        . It is <strong>free</strong>, with no ads and no accounts required. Or{' '}
        <Link to="./docs/getting-started#self-hosted">self-host</Link> it on your own server. Do you
        need it for commercial use? No problem! It is{' '}
        <span style={{ whiteSpace: 'nowrap' }}>
          <Link to="./docs/license">
            <strong>MIT-licensed</strong>
          </Link>{' '}
          🎉
        </span>
        . Please consider <Link to="./docs/sponsor">sponsoring LiveCodes</Link> ❤.
      </>
    ),
  },
  {
    title: 'Embeds',
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
];

function Mode({ title, description, idx }: ModeItem & { idx: number }) {
  return (
    <div className={clsx('col col--4 col--offset-' + (idx + 1))}>
      <div className="text--center"></div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

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
              style={{ width: '95%', boxShadow: '0 0 20px var(--ifm-color-secondary-darkest)' }}
            ></LiveCodes>
            <div className={styles.editorHint}>
              * Try editing the code above and see the changes reflected in the result page.
            </div>
          </div>
        </div>
      </section>
      <section className={styles.rowDark}>
        <div className="container padding-vert--lg">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container padding-vert--lg">
          <div className="row">
            {ModeList.map((props, idx) => (
              <Mode key={idx} {...{ ...props, idx }} />
            ))}
          </div>
        </div>
      </section>
      <section className={styles.rowDark}>
        <div className={'container padding-vert--lg ' + styles.center}>
          <div className={['row', styles.carousel, styles.center].join(' ')}>
            <h3>Screenshots</h3>
            <HomepageCarousel></HomepageCarousel>
          </div>
        </div>
      </section>
      <section className={styles.rowDark}>
        <div className={'container padding-vert--lg ' + styles.center}>
          <div className={['row', styles.carousel, styles.center].join(' ')}>
            <div className={styles.buttons}>
              <Link
                className=" button button--primary button--outline button--lg"
                to="./docs/getting-started"
              >
                Get Started 📖
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
