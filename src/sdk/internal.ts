/**
 * This module contains internal functions and types used by the LiveCodes SDK.
 * These are not part of the public API and should not be exported from SDK modules.
 *
 * @module
 */

import type { Config, EditorId, Language } from './models';

/**
 * Custom events emitted by LiveCodes playground.
 */
export interface CustomEvents {
  init: 'livecodes-init';
  /** @deprecated config is sent in hash params */
  getConfig: 'livecodes-get-config';
  /** @deprecated config is sent in hash params */
  config: 'livecodes-config';
  load: 'livecodes-load';
  appLoaded: 'livecodes-app-loaded';
  ready: 'livecodes-ready';
  change: 'livecodes-change';
  run: 'livecodes-run';
  testResults: 'livecodes-test-results';
  console: 'livecodes-console';
  destroy: 'livecodes-destroy';
  resizeEditor: 'livecodes-resize-editor';
  apiResponse: 'livecodes-api-response';
  i18n: 'livecodes-i18n';
}

// https://blog.codepen.io/2025/10/20/google-chrome-iframe-allow-permissions-problems/
// https://blog.codepen.io/2025/11/18/417-iframe-allow-attribute-saga/
const allowAttributes: Record<'chrome' | 'firefox' | 'default', string[]> = {
  chrome: [
    'accelerometer',
    'bluetooth',
    'camera',
    'clipboard-read',
    'clipboard-write',
    'display-capture',
    'encrypted-media',
    'geolocation',
    'gyroscope',
    'language-detector',
    'language-model',
    'local-network-access',
    'microphone',
    'midi',
    'proofreader',
    'rewriter',
    'serial',
    'summarizer',
    'translator',
    'web-share',
    'writer',
    'window-placement',
    'xr-spatial-tracking',
  ],
  firefox: ['camera', 'display-capture', 'geolocation', 'microphone', 'web-share'],
  default: [
    'accelerometer',
    'ambient-light-sensor',
    'camera',
    'display-capture',
    'encrypted-media',
    'geolocation',
    'gyroscope',
    'microphone',
    'midi',
    'payment',
    'serial',
    'vr',
    'web-share',
    'xr-spatial-tracking',
  ],
};

/**
 * Detects the current browser type.
 *
 * @returns 'chrome', 'firefox', or 'default' based on user agent detection
 */
export const detectBrowser = (): 'chrome' | 'firefox' | 'default' => {
  if (typeof navigator === 'undefined') return 'default';
  const ua = navigator.userAgent;
  if (/Firefox\//i.test(ua)) return 'firefox';
  if (/Chrome\//i.test(ua)) return 'chrome';
  return 'default';
};

/**
 * Generates the iframe allow attribute value based on detected browser capabilities.
 *
 * @returns A semicolon-separated string of allowed features for the iframe
 */
export const getIframeAllowAttribute = (): string =>
  allowAttributes[detectBrowser()]
    .filter((feature) => {
      const supportedFeatures = (globalThis.document as any)?.featurePolicy?.features?.();
      if (!supportedFeatures) return true;
      return supportedFeatures.includes(feature);
    })
    .join('; ');

// ---------------------------------------------------------------------------
// parseChildren – declarative code children for <live-codes> web component
// ---------------------------------------------------------------------------

/**
 * A file entry parsed from a child element with a `filename` attribute.
 */
interface ParsedFile {
  filename: string;
  content: string;
  language?: Language;
}

/**
 * The result of parsing children: a partial config that can be merged
 * with an explicit config object (children take precedence for content).
 */
export type ParsedChildrenConfig = Partial<
  Pick<Config, 'markup' | 'style' | 'script' | 'activeEditor'> & { files: ParsedFile[] }
>;

/** Maps HTML element tag names to their corresponding editor IDs. */
const tagToEditor: Record<string, EditorId> = {
  template: 'markup',
  style: 'style',
  script: 'script',
};

/** Default languages for each editor when no `lang` attribute is specified. */
const defaultLangs: Record<EditorId, Language> = {
  markup: 'html',
  style: 'css',
  script: 'javascript',
};

/**
 * Removes the common leading whitespace from all lines (dedent),
 * and trims the single leading/trailing newline caused by the tag boundary.
 *
 * Only the first newline (from `<tag>\n`) and the last whitespace-only line
 * (from `\n  </tag>`) are stripped. Intentional blank lines within the
 * content are preserved.
 */
const dedent = (text: string): string => {
  // Strip the single leading newline from the opening tag boundary
  const trimmed = text.replace(/^\n/, '');
  // Strip the trailing whitespace-only line from the closing tag boundary
  // (only the last line, if it contains only whitespace)
  const lines = trimmed.split('\n');
  if (lines.length > 1 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }
  // Find the minimum indentation among non-empty lines
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const match = line.match(/^(\s*)/);
      return match ? match[1].length : 0;
    });
  const minIndent = indents.length > 0 ? Math.min(...indents) : 0;
  if (minIndent === 0) return lines.join('\n');
  return lines.map((line) => line.slice(minIndent)).join('\n');
};

/**
 * Extracts content from an element.
 *
 * For `<template>` elements, serializes the inert `.content` DocumentFragment
 * to preserve HTML markup (e.g. `<h1>Hello</h1>`).
 * For `<style>` and `<script>`, reads `.textContent` directly
 * (safe because they are inside an outer `<template>` which is inert).
 *
 * The result is dedented to remove indentation from the HTML source.
 */
const getContent = (el: Element): string => {
  let raw: string;
  if (el instanceof HTMLTemplateElement) {
    const div = el.ownerDocument.createElement('div');
    div.appendChild(el.content.cloneNode(true));
    raw = div.innerHTML;
  } else {
    raw = el.textContent ?? '';
  }
  return dedent(raw);
};

/**
 * Infers a language from a filename extension.
 * Returns the extension as a Language (the LiveCodes app resolves aliases).
 */
const inferLangFromFilename = (filename: string): Language | undefined => {
  const parts = filename.split('.');
  if (parts.length < 2) return undefined;
  return parts[parts.length - 1] as Language;
};

/**
 * Parses the direct `<template>` child of a container element to extract
 * code configuration.
 *
 * @param container - The `<live-codes>` custom element to parse children from.
 * @returns A partial config derived from children, or `undefined` if no wrapper `<template>` child is found.
 *
 * @example
 * ```html
 * <live-codes>
 *   <template>
 *     <template lang="html"><h1>Hello</h1></template>
 *     <style lang="scss">body { color: blue; }</style>
 *     <script lang="ts">console.log('hi');</script>
 *   </template>
 * </live-codes>
 * ```
 */
export const parseChildren = (container: Element): ParsedChildrenConfig | undefined => {
  // Find the wrapper <template> among direct children
  const wrapper = Array.from(container.children).find(
    (child): child is HTMLTemplateElement =>
      child instanceof HTMLTemplateElement &&
      !child.hasAttribute('lang') &&
      !child.hasAttribute('filename'),
  );
  if (!wrapper) return undefined;

  const fragment = wrapper.content;
  const codeElements = Array.from(fragment.children).filter(
    (el) => el.tagName === 'TEMPLATE' || el.tagName === 'STYLE' || el.tagName === 'SCRIPT',
  );
  if (codeElements.length === 0) return undefined;

  const hasFilenames = codeElements.some((el) => el.hasAttribute('filename'));

  if (hasFilenames) {
    return parseMultiFile(codeElements);
  }
  return parseSingleEditor(codeElements);
};

/**
 * Parses children into single-editor mode config.
 * First `<template>` -> markup, first `<style>` -> style, first `<script>` -> script.
 */
const parseSingleEditor = (elements: Element[]): ParsedChildrenConfig | undefined => {
  const config: ParsedChildrenConfig = {};
  const seen = new Set<EditorId>();

  for (const el of elements) {
    const tag = el.tagName.toLowerCase();
    const editorId = tagToEditor[tag];
    if (!editorId || seen.has(editorId)) continue;
    seen.add(editorId);

    const lang = (el.getAttribute('lang') as Language) || defaultLangs[editorId];
    const content = getContent(el);

    config[editorId] = { language: lang, content };

    if (el.hasAttribute('active')) {
      config.activeEditor = editorId;
    }
  }

  return Object.keys(config).length > 0 ? config : undefined;
};

/**
 * Parses children into multi-file mode config.
 * Each element with a `filename` attribute becomes a file entry.
 */
const parseMultiFile = (elements: Element[]): ParsedChildrenConfig | undefined => {
  const files: ParsedFile[] = [];
  let activeEditor: string | undefined;

  for (const el of elements) {
    const filename = el.getAttribute('filename');
    if (!filename) continue;

    const content = getContent(el);
    const langAttr = el.getAttribute('lang') as Language | null;
    const language = langAttr || inferLangFromFilename(filename);

    const file: ParsedFile = { filename, content };
    if (language) {
      file.language = language;
    }
    files.push(file);

    if (el.hasAttribute('active')) {
      activeEditor = filename;
    }
  }

  if (files.length === 0) return undefined;

  const config: ParsedChildrenConfig = { files };
  if (activeEditor) {
    config.activeEditor = activeEditor as EditorId;
  }
  return config;
};
