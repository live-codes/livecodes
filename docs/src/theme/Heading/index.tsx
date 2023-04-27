import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import Heading from '@theme-original/Heading';
import styles from './index.module.css';

/**
 * wraps the theme Heading component
 * allows adding custom content below Heading (h1)
 * use this format in markdown to customize:
 * `# Overview {#overview-custom-content-option}`
 * available options: top, none
 */
export default function HeadingWrapper(props) {
  const [content, setContent] = useState('');
  const [id, customContentOption] = props.id?.split('-custom-content-') || [''];
  useEffect(() => {
    if (props.as === 'h1') {
      const timer = setTimeout(() => {
        setContent('My custom content');
        return () => {
          clearTimeout(timer);
        };
      }, 1000);
    }
  }, []);

  if (props.as === 'h1') {
    return (
      <>
        <Heading {...{ ...props, id }} />
        <div
          className={`custom-content custom-content-post-header ${styles.content} ${styles[customContentOption]}`}
        >
          {content}
        </div>
      </>
    );
  }

  return (
    <>
      <Heading {...{ ...props, id }} />
    </>
  );
}
