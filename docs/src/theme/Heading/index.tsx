import React, { type ReactNode, useContext, useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import Heading from '@theme-original/Heading';
import type HeadingType from '@theme/Heading';
import type { WrapperProps } from '@docusaurus/types';
import { CustomContentContext, loadAds } from '../../custom-content';
import styles from './styles.module.css';

type Props = WrapperProps<typeof HeadingType>;

export default function HeadingWrapper(props: Props): ReactNode {
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
