/**
 * LiveCodes Web Components
 *
 * This module provides Web Components for embedding LiveCodes playgrounds.
 *
 * @module
 */

/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/order
import { createPlayground } from './index';
import { parseChildren } from './internal';
import type { Config, EmbedOptions, Playground, TemplateName } from './models';
export type { Code, Config, EmbedOptions, Language, Playground } from './models';

/**
 * Props for the LiveCodes Web Component.
 */
export interface Props extends EmbedOptions {
  /** Height of the playground container. */
  height?: string;
  /** The SDK instance. */
  sdk?: Playground;
}

/**
 * A Web Component that renders a LiveCodes playground.
 *
 * Acts as a wrapper for the [LiveCodes JS SDK](https://livecodes.io/docs/sdk/js-ts).
 * @see {@link https://livecodes.io/docs/sdk/web-components}
 *
 * @attr {string} app-url - The URL of the LiveCodes app. Defaults to `https://livecodes.io/`.
 * @attr {string} import - A resource to [import](https://livecodes.io/docs/features/import) (from any of the supported [sources](https://livecodes.io/docs/features/import#sources)).
 * @attr {boolean} headless - Whether to use the headless mode of LiveCodes.
 * @attr {boolean} lite - Deprecated! Use `config.mode = "lite"` instead - Whether to use the lite mode of LiveCodes.
 * @attr {string} loading - When to load the playground.
 * @attr {string} template - A [starter template](https://livecodes.io/docs/features/templates) to load.
 * @attr {string} view - Deprecated! The `view` option has been moved to `config.view`. For headless mode use `headless` attribute - The [default view](https://livecodes.io/docs/features/default-view) for the playground.
 * @attr {string} height - Sets the [height of playground container](https://livecodes.io/docs/sdk/js-ts#height) element.
 * @attr {string} data-default-styles - If set to `"false"`, disables the default styles applied to the playground container element.
 * @attr {string} config - A JSON string representing the [config object](https://livecodes.io/docs/api/interfaces/Config) for the playground. When set as an attribute, the value is parsed as JSON. When set as a property, it can be an object or a URL string.
 * @attr {string} params - A JSON string representing [URL Query parameters](https://livecodes.io/docs/configuration/query-params). When set as an attribute, the value is parsed as JSON. When set as a property, it can be an object.
 *
 * @prop {object|string} config - The [config object](https://livecodes.io/docs/api/interfaces/Config) for the playground or the URL of the config file.
 * @prop {object} params - An object that represents [URL Query parameters](https://livecodes.io/docs/configuration/query-params).
 * @prop {Playground} sdk - (Read-only) The playground SDK instance, if initialized.
 *
 * @fires sdkready - Fired when the SDK is ready. Access the SDK via `event.detail.sdk`.
 *
 * @example
 * ```html
 * <!-- Declarative code via children -->
 * <live-codes height="400px">
 *   <template>
 *     <template lang="html"><h1>Hello World!</h1></template>
 *     <style lang="css">h1 { color: royalblue; }</style>
 *     <script lang="ts">console.log('Hello!');</script>
 *   </template>
 * </live-codes>
 *
 * <!-- Config via attributes -->
 * <live-codes
 *   template="react"
 *   config='{"processors": ["tailwindcss"]}'
 * ></live-codes>
 *
 * <!-- Config via properties -->
 * <live-codes template="react"></live-codes>
 * <script type="module">
 *   import 'livecodes/web-components';
 *
 *   const el = document.querySelector('live-codes');
 *   el.config = {
 *     markup: {
 *       language: 'markdown',
 *       content: '# Hello World!',
 *     },
 *   };
 *   el.addEventListener('sdkready', (e) => {
 *     const sdk = e.detail.sdk;
 *     // use sdk ...
 *   });
 * </script>
 * ```
 */
class LiveCodesElement extends HTMLElement {
  private _playground: Playground | undefined;
  private _config: EmbedOptions['config'];
  private _params: EmbedOptions['params'];
  private _configCache = '';
  private _otherOptionsCache = '';
  private _connected = false;
  private _updateScheduled = false;
  private _generation = 0;
  private _childrenObserver: MutationObserver | undefined;

  /** The list of attributes that trigger an update. */
  public static get observedAttributes(): string[] {
    return [
      'app-url',
      'config',
      'import',
      'loading',
      'params',
      'template',
      'view',
      'height',
      'headless',
      'lite',
    ];
  }

  /** Initialize the component. */
  public connectedCallback(): void {
    this._connected = true;
    this._observeChildren();
    this._scheduleUpdate();
    this.style.display = 'block';
  }

  /** Destroy the component. */
  public disconnectedCallback(): void {
    this._connected = false;
    this._childrenObserver?.disconnect();
    this._childrenObserver = undefined;
    ++this._generation; // invalidate pending async callbacks
    this._playground?.destroy();
    this._playground = undefined;
  }

  /** Update the component. */
  public attributeChangedCallback(
    _name: string,
    oldValue: string | null,
    newValue: string | null,
  ): void {
    if (oldValue !== newValue && this._connected) {
      this._scheduleUpdate();
    }
  }

  /** The config object or URL of the config file. */
  public get config(): EmbedOptions['config'] {
    return this._config;
  }

  /** The config object or URL of the config file. */
  public set config(value: EmbedOptions['config']) {
    this._config = value;
    if (this._connected) {
      this._scheduleUpdate();
    }
  }

  /** An object that represents URL Query parameters. */
  public get params(): EmbedOptions['params'] {
    return this._params;
  }

  /** An object that represents URL Query parameters. */
  public set params(value: EmbedOptions['params']) {
    this._params = value;
    if (this._connected) {
      this._scheduleUpdate();
    }
  }

  /** The playground SDK instance (read-only). Available after initialization. */
  public get sdk(): Playground | undefined {
    return this._playground;
  }

  /**
   * Destroys the playground instance and cleans up resources.
   */
  public destroy(): void {
    ++this._generation;
    this._playground?.destroy();
    this._playground = undefined;
  }

  /**
   * Sets up a MutationObserver on the wrapper `<template>` child to watch
   * for content changes (characterData and childList in the template's
   * DocumentFragment). When changes are detected, the children are re-parsed
   * and `setConfig` is called on the existing playground.
   */
  private _observeChildren(): void {
    this._childrenObserver?.disconnect();

    const wrapper = Array.from(this.children).find(
      (child): child is HTMLTemplateElement =>
        child instanceof HTMLTemplateElement &&
        !child.hasAttribute('lang') &&
        !child.hasAttribute('filename'),
    );
    if (!wrapper) return;

    this._childrenObserver = new MutationObserver(() => {
      if (!this._connected || !this._playground) return;
      const childConfig = parseChildren(this);
      if (childConfig) {
        this._playground.setConfig(childConfig as Partial<Config>);
      }
    });

    // Observe the template's inert DocumentFragment for changes
    this._childrenObserver.observe(wrapper.content, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  private _scheduleUpdate(): void {
    if (this._updateScheduled) return;
    this._updateScheduled = true;
    queueMicrotask(() => {
      this._updateScheduled = false;
      if (this._connected) {
        this._update();
      }
    });
  }

  /**
   * Parses the `config` attribute as JSON if present.
   * Returns `undefined` if the attribute is absent or invalid JSON.
   */
  private _getConfigAttribute(): Partial<Config> | undefined {
    const attr = this.getAttribute('config');
    if (attr == null) return undefined;
    try {
      return JSON.parse(attr);
    } catch {
      return undefined;
    }
  }

  /**
   * Parses the `params` attribute as JSON if present.
   * Returns `undefined` if the attribute is absent or invalid JSON.
   */
  private _getParamsAttribute(): EmbedOptions['params'] | undefined {
    const attr = this.getAttribute('params');
    if (attr == null) return undefined;
    try {
      return JSON.parse(attr);
    } catch {
      return undefined;
    }
  }

  private _getEmbedOptions(): EmbedOptions {
    const options: EmbedOptions = {};

    const appUrl = this.getAttribute('app-url');
    if (appUrl != null) options.appUrl = appUrl;

    const importAttr = this.getAttribute('import');
    if (importAttr != null) options.import = importAttr;

    const loading = this.getAttribute('loading') as EmbedOptions['loading'];
    if (loading != null) options.loading = loading;

    const template = this.getAttribute('template');
    if (template != null) options.template = template as TemplateName;

    const view = this.getAttribute('view') as EmbedOptions['view'];
    if (view != null) options.view = view;

    if (this.hasAttribute('headless')) options.headless = true;
    if (this.hasAttribute('lite')) options.lite = true;

    // Resolve config: children > property > attribute
    const childConfig = parseChildren(this);
    const configAttr = this._getConfigAttribute();
    const configProp = this._config;

    if (childConfig || configAttr || configProp !== undefined) {
      if (typeof configProp === 'string') {
        // Config property is a URL string — use it as-is
        options.config = configProp;
      } else {
        // Merge: configAttr (lowest) < childConfig < configProp (highest)
        // Children are declarative defaults; properties are explicit overrides.
        const merged: Partial<Config> = {
          ...(configAttr || {}),
          ...(childConfig || {}),
          ...((configProp as Partial<Config>) || {}),
        };
        options.config = merged;
      }
    }

    // Resolve params: merge attribute (lowest) < property (highest)
    const paramsAttr = this._getParamsAttribute();
    const paramsProp = this._params;
    if (paramsAttr || paramsProp !== undefined) {
      options.params = {
        ...(paramsAttr || {}),
        ...(paramsProp || {}),
      };
    }

    return options;
  }

  private _update(): void {
    const { config, ...otherOptions } = this._getEmbedOptions();
    const otherOptionsStr = JSON.stringify(otherOptions);
    const configStr = JSON.stringify(config || '');

    const height = this.getAttribute('height');
    if (height != null) {
      const ht = Number(height) ? `${height}px` : height;
      this.dataset.height = ht;
      this.style.height = ht;
    }

    if (!this._playground || this._otherOptionsCache !== otherOptionsStr) {
      const currentGeneration = ++this._generation;
      this._otherOptionsCache = otherOptionsStr;
      this._configCache = configStr;
      this._playground?.destroy();
      this._playground = undefined;

      createPlayground(this, { config, ...otherOptions }).then((sdk: Playground) => {
        if (this._generation !== currentGeneration) {
          sdk.destroy();
          return;
        }
        this._playground = sdk;

        this.dispatchEvent(
          new CustomEvent('sdkready', {
            detail: { sdk },
            bubbles: true,
            composed: true,
          }),
        );
      });
    } else {
      if (this._configCache === configStr) return;
      this._configCache = configStr;
      if (config) {
        this._playground.setConfig(config);
      }
    }
  }
}

if (!customElements.get('live-codes')) {
  customElements.define('live-codes', LiveCodesElement);
}
