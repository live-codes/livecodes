import {
  getLanguageByAlias,
  getLanguageEditorId,
  processorIsActivated,
  processorIsEnabled,
} from '../languages/utils';
import type { CompileInfo, Config } from '../models';
import { modulesService } from '../services/modules';
import { getFileExtension, maskComments } from '../utils/utils';
import { compileInCompiler } from './compile-in-compiler';
import { hasStyleImports } from './import-map';
import type { LanguageOrProcessor } from './models';
import { getCompileResult } from './utils';

interface CompileBlocksOptions {
  removeEnclosingTemplate?: boolean;
  languageAttribute?: 'lang' | 'type';
  prepareFn?: (code: string, config: Config) => Promise<string>;
  skipCompilers?: LanguageOrProcessor[];
  /**
   * Do not match block tags that sit inside JavaScript comments (`// …` and
   * `/* … *\/`). For script-like languages (e.g. Ripple), where a comment may
   * mention `<style>`.
   */
  ignoreComments?: boolean;
}

/**
 * The block matches of `pattern` in `code`. With a `mask` (see `maskComments`)
 * the matching runs over the mask and the groups are re-read from the original
 * code, so a tag inside a comment is not a block while the blocks keep their
 * authored content.
 */
const matchBlocks = (code: string, pattern: string, mask?: string): RegExpMatchArray[] => {
  if (!mask) return [...code.matchAll(new RegExp(pattern, 'g'))];
  return [...mask.matchAll(new RegExp(pattern, 'g'))].map((match) => {
    const index = match.index ?? 0;
    const element = code.slice(index, index + match[0].length);
    return new RegExp(pattern).exec(element) ?? match;
  });
};

/**
 * Replace the matches of `pattern` in `code` with `blocks`, in document order.
 */
const replaceBlocks = (code: string, pattern: string, blocks: string[], mask?: string) => {
  const re = new RegExp(pattern, 'g');
  if (!mask) return code.replace(re, () => blocks.shift() || '');
  let out = '';
  let last = 0;
  for (const match of mask.matchAll(re)) {
    const index = match.index ?? 0;
    out += code.slice(last, index) + (blocks.shift() || '');
    last = index + match[0].length;
  }
  return out + code.slice(last);
};

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
export const exportDefaultImports = (code: string) => {
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
  mask?: string,
) => {
  const getBlockPattern = (el: typeof blockElement) =>
    `(<${el}(?:[^>]*?))(?:\\ssrc=["']([^"'\\s]*?)["'])((?:[^>]*))(>(?:\\s*?)<\\/${el}>|\\/>)`;
  const pattern = getBlockPattern(blockElement);
  const blocks: string[] = [];
  for (const arr of matchBlocks(code, pattern, mask)) {
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
  return replaceBlocks(code, pattern, blocks, mask);
};

const postProcess = async (content: string, config: Config, language: LanguageOrProcessor) => {
  // also in create-compiler
  let code = content;
  let info: CompileInfo = {};
  let postcssRequired = false;

  const editorId = getLanguageEditorId(language) || 'markup';
  // let tailwindcss handle style imports if activated, otherwise use postcss
  const tailwindcssIsActive =
    processorIsEnabled('tailwindcss', config) && processorIsActivated('tailwindcss', config);
  if (editorId === 'style' && hasStyleImports(code) && !tailwindcssIsActive) {
    postcssRequired = true;
  }

  for (const processor of window.deps.processors) {
    // do not place compiled css for tailwind and similar in style blocks
    if (['tailwindcss', 'unocss', 'windicss'].includes(processor.name)) continue;

    if (
      (processorIsEnabled(processor.name, config) &&
        processorIsActivated(processor.name, config) &&
        processor.editor === editorId) ||
      (editorId === 'style' && processor.name === 'postcss')
    ) {
      if (processor.isPostcssPlugin) {
        postcssRequired = true;
      } else {
        if (processor.name === 'postcss' && !postcssRequired) continue;
        const tailwindcssReference =
          tailwindcssIsActive && processor.name === 'tailwindcss'
            ? '@reference "tailwindcss";\n'
            : '';
        const processResult = await compileInCompiler(
          tailwindcssReference + code,
          processor.name,
          config,
        );
        const result = getCompileResult(processResult);
        code = result.code;
        info = {
          ...info,
          ...result.info,
        };
      }
    }
  }

  return { code, info };
};

export const compileBlocks = async (
  code: string,
  blockElement: 'template' | 'style' | 'script',
  config: Config,
  options: CompileBlocksOptions = {},
) => {
  const maskOf = (text: string) => (options.ignoreComments ? maskComments(text) : undefined);
  let fullCode = await fetchBlocksSource(code, blockElement, maskOf(code));

  if (typeof options.prepareFn === 'function') {
    fullCode = await options.prepareFn(fullCode, config);
  }

  const hasProcessors =
    config.processors.filter((p) => !options.skipCompilers?.includes(p)).length > 0;

  const getBlockPattern = (el: typeof blockElement, langAttr = 'lang') =>
    `(<${el}\\s*)(?:([\\s\\S]*?)${langAttr}\\s*=\\s*["']([A-Za-z0-9 _]*)["'])?((?:[^>]*)>)([\\s\\S]*?)(<\\/${el}>)`;

  const pattern = getBlockPattern(blockElement, options.languageAttribute);
  const mask = maskOf(fullCode);
  const blocks: string[] = [];
  for (const arr of matchBlocks(fullCode, pattern, mask)) {
    const [element, opentag, opentagPre = '', language = '', opentagPost, content, closetag] = arr;
    if ((!language || !content) && (blockElement !== 'style' || !hasProcessors)) {
      blocks.push(element);
      continue;
    }
    const lang = getLanguageByAlias(language);
    if (
      (!lang || options.skipCompilers?.includes(lang)) &&
      (blockElement !== 'style' || !hasProcessors)
    ) {
      blocks.push(element);
      continue;
    }
    let exports = '';
    if (['typescript', 'jsx', 'tsx', 'babel', 'sucrase'].includes(lang || '')) {
      exports = exportDefaultImports(content);
    }
    let compiled = (await compileInCompiler(content + exports, lang, config)).code || content;
    if (exports) {
      compiled = compiled.replace(exports, '');
    }
    if (hasProcessors) {
      compiled = getCompileResult(await postProcess(compiled, config, lang ?? 'css')).code;
    }
    blocks.push(
      element.replace(
        new RegExp(pattern, 'g'),
        blockElement === 'template' && options.removeEnclosingTemplate
          ? compiled
          : opentag + opentagPre + opentagPost + compiled + closetag,
      ),
    );
  }
  return replaceBlocks(fullCode, pattern, blocks, mask);
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
