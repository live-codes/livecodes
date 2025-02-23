import React, {type ReactNode} from 'react';
import Heading from '@theme-original/Heading';
import type HeadingType from '@theme/Heading';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof HeadingType>;

export default function HeadingWrapper(props: Props): ReactNode {
  return (
    <>
      <Heading {...props} />
    </>
  );
}
