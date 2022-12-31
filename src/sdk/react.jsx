// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import React, { useEffect, useRef } from 'react';
import { createPlayground } from './livecodes';

// Parameters may be declared in a variety of syntactic forms
/**
 * @param {import('./models').EmbedOptions & {
    params?: Record<keyof import('./models').UrlQueryParams, string>;
    style?: Record<string, string>;
    className?: string;
  }} props
 * @returns {JSX.Element}
 */
export default function LiveCodes(props) {
  const containerRef = useRef(null);

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
    createPlayground(containerRef.current, options);
  }, []);

  return (
    <>
      <div ref={containerRef} className={props.className} style={props.style}></div>
    </>
  );
}
