import { compileAllBlocks } from '../../compiler';
import type { CompilerFunction } from '../../models';
import { getLanguageCustomSettings } from '../../utils';

(self as any).createRiotCompiler =
  (): CompilerFunction =>
  async (code, { config }) => {
    if (!code) return '';
    const { data, template, ...options } = getLanguageCustomSettings('riot', config);
    const source = template ? `<template type="${template}">${code}</template>` : code;
    const processedCode = await compileAllBlocks(source, config, {
      removeEnclosingTemplate: true,
      languageAttribute: 'type',
    });
    const result = await (window as any).riot.compileFromString(processedCode, options);
    const compiled: string = result.code;
    return `(() => {
const Component = ${compiled.replace('export default ', '')}
riot.register(Component.name, Component);
riot.mount(Component.name, {
...${JSON.stringify(data || {})},
...window.livecodes?.templateData
});
})();
`;
  };
