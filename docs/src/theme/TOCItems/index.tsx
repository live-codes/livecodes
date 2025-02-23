import React, {type ReactNode} from 'react';
import TOCItems from '@theme-original/TOCItems';
import type TOCItemsType from '@theme/TOCItems';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof TOCItemsType>;

export default function TOCItemsWrapper(props: Props): ReactNode {
  return (
    <>
      <TOCItems {...props} />
    </>
  );
}
