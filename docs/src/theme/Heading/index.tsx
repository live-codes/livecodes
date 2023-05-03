import React, { useContext, useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import Heading from '@theme-original/Heading';
import { CustomContentContext, loadAds } from '../../custom-content';
import styles from './styles.module.css';

/**
 * wraps the theme Heading component
 * allows adding custom content below Heading (h1)
 * use this format in markdown to customize:
 * `# Overview {#overview-custom-content-option}`
 * available options: top, none
 */
export default function HeadingWrapper(props) {
  const { docContent, updateContent } = useContext(CustomContentContext);
  const [id, customContentOption] = props.id?.split('-custom-content-') || [''];

  useEffect(() => {
    if (props.as === 'h1') {
      updateContent();
      loadAds();
    }
  }, []);

  if (props.as === 'h1') {
    return (
      <>
        <Heading {...{ ...props, id }} />
        {docContent && (
          <div
            className={`custom-content custom-content-header ${styles.content} ${styles[customContentOption]}`}
            dangerouslySetInnerHTML={{ __html: docContent }}
          ></div>
        )}
      </>
    );
  }

  return (
    <>
      <Heading {...{ ...props, id }} />
    </>
  );
}
