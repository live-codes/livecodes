// eslint-disable-next-line import/no-unresolved
import Link from '@docusaurus/Link';
import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import LiveCodes from './LiveCodes';
import Sliders from './LanguageSliders';
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
        . Save/Import/Export/Share/Deploy/Auto-Complete/NPM Modules/Code Format/Starter Templates
        and a lot more{' '}
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
        occurs, with <strong>no server rounds</strong> required. It can be hosted on any{' '}
        <strong>static file server</strong>. However, it is dynamic by communicating with various{' '}
        <strong>APIs</strong>.
      </>
    ),
  },
  {
    title: 'Mobile-Friendly',
    image: './img/responsive.svg',
    description: (
      <>
        It has a <strong>responsive</strong> layout. Uses the powerful Monaco editor (that powers{' '}
        <strong>VS&nbsp;code</strong>) on desktop, and the <strong>touch-friendly</strong>{' '}
        CodeMirror 6 editor on mobile.
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
        . It is free, with no-ads and no accounts required. Or{' '}
        <Link to="./docs/getting-started">self-host</Link> it on your own server. Do you need it for
        commercial use? No problem! It is{' '}
        <span style={{ whiteSpace: 'nowrap' }}>
          <Link to="./docs/license">MIT-licensed</Link> 🎉
        </span>
        .
      </>
    ),
  },
  {
    title: 'Embeds',
    description: (
      <>
        LiveCodes can be embedded in your web pages. Code can be easily{' '}
        <Link to="./docs/features/code-preload">preloaded</Link> in the editors. This is
        particularly useful for educational websites and for library documentations. It is highly{' '}
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
              src="/?embed&template=react"
              style={{ boxShadow: '0 0 20px var(--ifm-color-secondary-darkest)' }}
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
    </>
  );
}
