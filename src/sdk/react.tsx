// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import React, { useEffect, useRef } from 'react';
import type { EmbedOptions, Playground } from './models';
import { createPlayground } from '.';

export interface Props extends EmbedOptions {
  className?: string;
  style?: Record<string, string>;
  getSDK?: (sdk: Playground) => void;
}

export default function LiveCodes(props: Props) {
  const { className, style, getSDK, ...options } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);
  let playground: Playground | undefined;

  useEffect(() => {
    if (!containerRef.current) return;
    createPlayground(containerRef.current, options).then((sdk) => {
      playground = sdk;
      if (typeof getSDK === 'function') {
        getSDK(sdk);
      }
    });

    return () => {
      playground?.destroy();
    };
  });

  return <div ref={containerRef} className={className} style={style}></div>;
}
