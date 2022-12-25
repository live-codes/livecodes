// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import React, { useEffect, useRef } from 'react';
import { defaultStyles } from './shared';
import type { EmbedOptions, Playground } from './models';
import { createPlayground } from '.';

interface Props extends EmbedOptions {
  style?: Record<string, string>;
  className?: string;
}

export default function LiveCodes(props: Props) {
  const { style, className, ...options } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);
  let playground: Playground | undefined;

  useEffect(() => {
    if (containerRef.current) {
      createPlayground(containerRef.current, options).then((p) => {
        playground = p;
        // eslint-disable-next-line no-console
        console.log(playground);
      });
    }
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ ...defaultStyles, ...style }}></div>
  );
}
