// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import React, { useEffect, useRef } from 'react';
import { EmbedOptions, UrlQueryParams } from './models';
import { createPlayground } from '.';

interface Props extends EmbedOptions {
  params?: Record<keyof UrlQueryParams, string>;
  style?: Record<string, string>;
  className?: string;
}

export default function LiveCodes(props: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const options = {
    ...(props.appUrl ? { appUrl: props.appUrl } : {}),
    ...(props.config ? { config: props.config } : {}),
    ...(props.import ? { import: props.import } : {}),
    ...(props.lite ? { lite: props.lite } : {}),
    ...(props.loading ? { loading: props.loading } : {}),
    ...(props.template ? { template: props.template } : {}),
    ...(props.view ? { view: props.view } : {}),
  };

  useEffect(() => {
    if (containerRef.current) {
      createPlayground(containerRef.current, options);
    }
  }, []);

  const styles = {
    border: '1px solid black',
    borderRadius: '5px',
    display: 'flex',
    height: '100%',
    width: '100%',
  };

  return (
    <div ref={containerRef} className={props.className} style={{ ...styles, ...props.style }}></div>
  );
}
