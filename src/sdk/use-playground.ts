import { createPlayground } from './index';
// eslint-disable-next-line import/order
import type { EmbedOptions, Playground } from './models';

/**
 * Props for the usePlayground hook.
 */
interface Props extends EmbedOptions {
  className?: string;
  style?: Record<string, string>;
  height?: string;
  sdkReady?: (sdk: Playground) => void;
}

/**
 * A reference to a value.
 */
interface Ref<T> {
  current: T;
}

/**
 * Hooks interface for framework integration.
 */
interface Hooks {
  useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  useRef<T>(initial: T): Ref<T>;
}

/**
 * Handle returned by the usePlayground hook.
 */
interface PlaygroundHandle {
  containerRef: Ref<HTMLDivElement | null>;
  className: string;
  style: Record<string, string>;
  height: string | undefined;
}

/**
 * Creates a framework-agnostic hook to provide the LiveCodes SDK implementation.
 * @param hooks - React/Preact hooks (useEffect, useRef) to use for the integration
 * @returns A hook function that manages the playground instance
 */
export function createUsePlayground(hooks: Hooks): (props: Props) => PlaygroundHandle {
  const { useEffect, useRef } = hooks;

  return function usePlayground(props: Props): PlaygroundHandle {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const playgroundRef = useRef<Playground | undefined>(undefined);
    const configCacheRef = useRef('');
    const otherOptionsCacheRef = useRef('');
    const generationRef = useRef(0);
    const unmountedRef = useRef(false);

    const className = props.className || '';
    const style = props.style || {};
    const height = props.height && Number(props.height) ? `${props.height}px` : props.height;

    useEffect(() => {
      if (!containerRef.current) return;

      const {
        className: _className,
        style: _style,
        height: _height,
        sdkReady,
        config,
        ...otherOptions
      } = props;

      // avoid race conditions if props change while doing async operation (creating playground)
      const generation = ++generationRef.current;
      const isStale = () => generationRef.current !== generation || unmountedRef.current;

      const otherOptionsStr = JSON.stringify(otherOptions);

      if (!playgroundRef.current || otherOptionsCacheRef.current !== otherOptionsStr) {
        otherOptionsCacheRef.current = otherOptionsStr;
        configCacheRef.current = JSON.stringify(config);
        playgroundRef.current?.destroy();
        playgroundRef.current = undefined;

        createPlayground(containerRef.current, { config, ...otherOptions }).then((sdk) => {
          if (isStale()) {
            sdk.destroy();
            return;
          }
          playgroundRef.current = sdk;
          if (typeof sdkReady === 'function') {
            sdkReady(sdk);
          }
        });
      } else {
        const configStr = JSON.stringify(config);
        if (configCacheRef.current === configStr) return;
        configCacheRef.current = configStr;
        if (config) {
          playgroundRef.current.setConfig(config);
        }
      }
    }, [props]);

    useEffect(
      () => () => {
        unmountedRef.current = true;
        playgroundRef.current?.destroy();
        playgroundRef.current = undefined;
      },
      [],
    );

    return { containerRef, className, style, height };
  };
}
