/* eslint-disable import/no-unresolved */
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import HomepageFeatures from '../components/HomepageFeatures';
import { loadAds } from '../custom-content';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={styles.tryButton + ' button button--secondary button--lg'}
            href="pathname:///../"
          >
            Start Coding ⚡
          </Link>
        </div>
        <div className={styles.description}>
          An open-source <strong>client-side</strong> playground for React, Vue, Svelte, Solid,
          Typescript, Python, Go, Ruby, PHP and{' '}
          <Link to="./languages">
            <strong>90+ languages/frameworks</strong>
          </Link>
          .
        </div>
        <div className={styles.eaHomepage}>
          <div
            className="flat"
            data-ea-publisher="livecodesio"
            data-ea-type="text"
            data-ea-manual="true"
          ></div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  useEffect(() => {
    loadAds();
  }, []);

  return (
    <Layout description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
