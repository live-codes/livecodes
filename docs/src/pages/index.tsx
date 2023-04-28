import React, { useEffect } from 'react';
import clsx from 'clsx';
// eslint-disable-next-line import/no-unresolved
import Layout from '@theme/Layout';
// eslint-disable-next-line import/no-unresolved
import Link from '@docusaurus/Link';
// eslint-disable-next-line import/no-unresolved
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// eslint-disable-next-line import/no-internal-modules
import HomepageFeatures from '../components/HomepageFeatures';
import { appUrl } from '../utils';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const openLivecodes = () => window.open(appUrl as string, '_blank');
  return (
    <header
      className={clsx('hero', styles.heroBanner)}
      style={{ backgroundColor: 'var(--ifm-color-secondary)' }}
    >
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={styles.tryButton + ' button button--secondary button--lg'}
            onClick={openLivecodes}
          >
            Try LiveCodes Now ⚡
          </Link>
        </div>
        <div className={styles.description}>
          An open-source client-side playground for React, Vue, Angular, Svelte, Typescript, Python,
          Go, Ruby and 80+ languages/frameworks.
        </div>
        <div
          className={`flat ${styles.eaHomepage}`}
          data-ea-publisher="livecodesio"
          data-ea-type="text"
          data-ea-manual="true"
        ></div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  useEffect(() => {
    (window as any).ethicalads.load();
  }, []);

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
