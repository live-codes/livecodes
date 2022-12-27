// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import React, { useEffect, useRef } from 'react';
import { defaultStyles } from './shared';
import type { EmbedOptions, Playground } from './models';
import { createPlayground } from '.';

interface Props extends EmbedOptions {
  className?: string;
  style?: Record<string, string>;
  getAPI?: (api: Playground) => void;
}

export default function LiveCodes(props: Props) {
  const { className, style, getAPI, ...options } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);
  let playground: Playground | undefined;

  useEffect(() => {
    if (!containerRef.current) return;
    createPlayground(containerRef.current, options).then((api) => {
      playground = api;
      if (typeof getAPI === 'function') {
        getAPI(api);
      }
    });

    return () => {
      playground?.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ ...defaultStyles, ...style }}></div>
  );
}
