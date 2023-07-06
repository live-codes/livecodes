/* eslint-disable import/no-internal-modules */
import type { Config } from '../models';
import { getLanguageByAlias } from '../languages';
import { modulesService } from '../services/modules';
import { getFileExtension } from '../utils/utils';
import { compileInCompiler } from './compile-in-compiler';

interface CompileBlocksOptions {
  removeEnclosingTemplate?: boolean;
  languageAttribute?: 'lang' | 'type';
  prepareFn?: (code: string, config: Config) => Promise<string>;
}

/**
 * This is a workaround to prevent typescript removing default imports (components)
 * that are not used in the typescript code but are used in the template
 * by exporting them
 * e.g.
 * <script setup>
 * import Counter from './App.vue';
 * </script>
 * <template><Counter /></template>
 */
const exportDefaultImports = (code: string) => {
  const defaultImportPattern =
    /(?:import\s+?(?:(?:(\w*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g;

  const tokens = [];
  for (const arr of [...code.matchAll(new RegExp(defaultImportPattern, 'g'))]) {
    const [_match, token] = arr;
    tokens.push(token);
  }
  if (tokens.length === 0) return '';
  return `\nexport { ${tokens.join(', ')} };`;
};

export const fetchBlocksSource = async (
  code: string,
  blockElement: 'template' | 'style' | 'script',
) => {
  const getBlockPattern = (el: typeof blockElement) =>
    `(<${el}(?:[^>]*?))(?:\\ssrc=["']([^"'\\s]*?)["'])((?:[^>]*))(>(?:\\s*?)<\\/${el}>|\\/>)`;
  const pattern = getBlockPattern(blockElement);
  const blocks: string[] = [];
  for (const arr of [...code.matchAll(new RegExp(pattern, 'g'))]) {
    const [element, opentagPre, src, opentagPost, _closetag] = arr;
    if (!src) {
      blocks.push(element);
    } else {
      const url = modulesService.getUrl(src);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('failed to fetch: ' + url);
        const content = await res.text();
        const langAttr =
          opentagPre.includes('lang') || opentagPost.includes('lang')
            ? ''
            : ` lang="${getFileExtension(url)}"`;
        blocks.push(`${opentagPre + langAttr + opentagPost}>${content}</${blockElement}>`);
      } catch {
        blocks.push(element);
      }
    }
  }
  return code.replace(new RegExp(pattern, 'g'), () => blocks.pop() || '');
};

export const compileBlocks = async (
  code: string,
  blockElement: 'template' | 'style' | 'script',
  config: Config,
  options: CompileBlocksOptions = {},
) => {
  let fullCode = await fetchBlocksSource(code, blockElement);

  if (typeof options.prepareFn === 'function') {
    fullCode = await options.prepareFn(fullCode, config);
  }

  const getBlockPattern = (el: typeof blockElement, langAttr = 'lang') =>
    `(<${el}(?:[^(?:${langAttr})]*))(?:\\s${langAttr}=["']([A-Za-z0-9 _]*)["'])((?:[^>]*)>)([\\s\\S]*?)(<\\/${el}>)`;
  const pattern = getBlockPattern(blockElement, options.languageAttribute);
  const blocks: string[] = [];
  for (const arr of [...fullCode.matchAll(new RegExp(pattern, 'g'))]) {
    const [element, opentagPre, language, opentagPost, content, closetag] = arr;
    if (!language || !content) {
      blocks.push(element);
      continue;
    }
    const lang = getLanguageByAlias(language);
    if (!lang) {
      blocks.push(element);
      continue;
    }
    let exports = '';
    if (['typescript', 'babel', 'sucrase', 'jsx', 'tsx'].includes(lang)) {
      exports = exportDefaultImports(content);
    }
    let compiled = (await compileInCompiler(content + exports, lang, config)).code;
    if (exports) {
      compiled = compiled.replace(exports, '');
    }
    blocks.push(
      element.replace(
        new RegExp(pattern, 'g'),
        blockElement === 'template' && options.removeEnclosingTemplate
          ? compiled
          : opentagPre + opentagPost + compiled + closetag,
      ),
    );
  }
  return fullCode.replace(new RegExp(pattern, 'g'), () => blocks.pop() || '');
};

export const compileAllBlocks = async (
  code: string,
  config: Config,
  options: CompileBlocksOptions = {},
) => {
  const blockElements: Array<'template' | 'style' | 'script'> = ['template', 'style', 'script'];
  for (const el of blockElements) {
    code = await compileBlocks(code, el, config, options);
  }
  return code;
};
