// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import React, { useEffect, useRef, useState } from 'react';
import type { EmbedOptions, Playground } from './models';
import { createPlayground } from '.';

export interface Props extends EmbedOptions {
  className?: string;
  style?: Record<string, string>;
  height?: string;
  sdkReady?: (sdk: Playground) => void;
}

export default function LiveCodes(props: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [className, setClassName] = useState(props.className || '');
  const [style, setStyle] = useState(props.style || {});
  const [height, setHeight] = useState(props.height);
  const [playground, setPlayground] = useState<Playground | undefined>();
  const [configCache, setConfigCache] = useState(JSON.stringify(props.config || ''));
  const [otherOptionsCache, setOtherOptionsCache] = useState('');

  useEffect(() => {
    if (!containerRef.current) return;
    const { className, style, height, sdkReady, config, ...otherOptions } = props;
    setClassName(className || '');
    setStyle(style || {});
    setHeight(height);

    if (!playground || otherOptionsCache !== JSON.stringify(otherOptions)) {
      setOtherOptionsCache(JSON.stringify(otherOptions));
      playground?.destroy();
      createPlayground(containerRef.current, { config, ...otherOptions }).then((sdk) => {
        setPlayground(sdk);
        if (typeof sdkReady === 'function') {
          sdkReady(sdk);
        }
      });
    } else {
      if (configCache === JSON.stringify(config)) return;
      setConfigCache(JSON.stringify(config));

      if (typeof config === 'string') {
        fetch(config)
          .then((res) => res.json())
          .then((json) => {
            playground?.setConfig(json);
          });
      } else if (config) {
        playground.setConfig(config);
      }
    }
  }, [props]);

  useEffect(
    () => () => {
      playground?.destroy();
    },
    [],
  );

  return <div ref={containerRef} className={className} style={style} data-height={height}></div>;
}
