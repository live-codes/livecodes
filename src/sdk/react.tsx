// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import React, { useEffect, useRef, useState } from 'react';
import type { EmbedOptions, Playground } from './models';
import { createPlayground } from './index';

export interface Props extends EmbedOptions {
  className?: string;
  style?: Record<string, string>;
  height?: string;
  sdkReady?: (sdk: Playground) => void;
}

/**
 * A React component that renders a LiveCodes playground.
 *
 * Acts as a wrapper for the [LiveCodes JS SDK](https://livecodes.io/docs/sdk/js-ts).
 * @see {@link https://livecodes.io/docs/sdk/react}
 *
 * @prop {string} [appUrl] - The URL of the LiveCodes app. Defaults to `https://livecodes.io/`.
 * @prop {object | string} [config] - The [config object](https://livecodes.io/docs/api/interfaces/Config) for the playground or the URL of the config file.
 * @prop {string} [import] - A resource to [import](https://livecodes.io/docs/features/import) (from any of the supported [sources](https://livecodes.io/docs/features/import#sources)).
 * @prop {boolean} [headless=false] - Whether to use the headless mode of LiveCodes.
 * @prop {boolean} [lite=false] - Deprecated! Use `config={{ mode: "lite" }}` instead - Whether to use the lite mode of LiveCodes.
 * @prop {string} [loading='lazy'] - When to load the playground.
 * @prop {object} [params] - An object that represents [URL Query parameters](https://livecodes.io/docs/configuration/query-params).
 * @prop {string} [template] - A [starter template](https://livecodes.io/docs/features/templates) to load.
 * @prop {string} [view='split'] - Deprecated! The `view` option has been moved to `config.view`. For headless mode use `headless="true"` - The [default view](https://livecodes.io/docs/features/default-view) for the playground.
 * @prop {string} [height] - Sets the [height of playground container](https://livecodes.io/docs/sdk/js-ts#height) element.
 * @prop {string} [className] - Sets the class name of playground container element.
 * @prop {object} [style] - Sets the style of playground container element.
 * @prop {function} [sdkReady] - A callback function that will be called when the SDK is ready.
 * @example
 * ```jsx
 * import LiveCodes from 'livecodes/react';
 *
 * const config = {
 *   markup: {
 *     language: 'markdown',
 *     content: '# Hello World!',
 *   },
 * };
 * export const Playground = () => <LiveCodes config={config} />;
 * ```
 */
export default function LiveCodes(props: Props): React.ReactElement<Props> {
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
