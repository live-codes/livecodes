import type { CompilerFunction } from '../../models';
import { getLanguageCustomSettings } from '../../utils';

(self as any).createWindicssCompiler =
  (): CompilerFunction =>
  async (css, { config, options }) => {
    const html = `<template>${options.html}\n<script>${config.script.content}</script></template>`;

    const customSettings = getLanguageCustomSettings('windicss', config);
    const { Processor, HTMLParser, CSSParser } = (self as any).windicss;
    const processor = new Processor();
    processor.loadConfig(customSettings);

    const htmlParser = new HTMLParser(html);
    let htmlSheet;
    if (customSettings.attributify) {
      const castArray = (val: unknown) => (Array.isArray(val) ? val : [val]);
      const attrs = htmlParser.parseAttrs().reduceRight((acc: any, curr: any) => {
        const attrKey = curr.key;
        if (attrKey === 'class' || attrKey === 'className') return acc;
        const attrValue = castArray(curr.value);
        if (attrKey in acc) {
          const attrKeyValue = castArray(acc[attrKey]);
          acc[attrKey] = [...attrKeyValue, ...attrValue];
        } else {
          acc[attrKey] = attrValue;
        }
        return acc;
      }, {});
      htmlSheet = processor.attributify(attrs).styleSheet;
    } else {
      const htmlClasses = htmlParser
        .parseClasses()
        .map((i: { result: string }) => i.result)
        .join(' ');
      htmlSheet = processor.interpret(htmlClasses).styleSheet;
    }

    const includeBase = customSettings.preflight !== false;
    const includeGlobal = customSettings.preflight !== false;
    const includePlugins = customSettings.preflight !== false;
    const preflightSheet = processor.preflight(html, includeBase, includeGlobal, includePlugins);

    const cssSheet = new CSSParser(css, processor).parse();

    const APPEND = true;
    const MINIFY = false;
    const styles = cssSheet.extend(preflightSheet, !APPEND).extend(htmlSheet, APPEND).build(MINIFY);
    return styles;
  };
