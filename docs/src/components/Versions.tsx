import React from 'react';
// eslint-disable-next-line import/no-unresolved
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const AppVersion = () => {
  const { siteConfig } = useDocusaurusContext();
  return <>{siteConfig.customFields.appVersion}</>;
};

export const SDKVersion = () => {
  const { siteConfig } = useDocusaurusContext();
  return <>{siteConfig.customFields.sdkVersion}</>;
};
