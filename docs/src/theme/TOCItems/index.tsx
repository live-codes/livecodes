import React, { type ReactNode, useContext } from 'react';
// eslint-disable-next-line import/no-unresolved
import TOCItems from '@theme-original/TOCItems';
import type TOCItemsType from '@theme/TOCItems';
import type { WrapperProps } from '@docusaurus/types';
import { CustomContentContext } from '../../custom-content';
import styles from './styles.module.css';

type Props = WrapperProps<typeof TOCItemsType>;

export default function TOCItemsWrapper(props: Props): ReactNode {
  const { tocContent } = useContext(CustomContentContext);

  return (
    <>
      <TOCItems {...props} />
      {tocContent && (
        <div
          className={`custom-content custom-content-toc ${styles.content}`}
          dangerouslySetInnerHTML={{ __html: tocContent }}
        ></div>
      )}
    </>
  );
}
