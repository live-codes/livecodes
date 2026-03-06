import type { CompilerFunction } from '../../models';
import { markedHighlightUrl, markedUrl, vendorsBaseUrl } from '../../vendors';
import { getLanguageCustomSettings } from '../utils';

(self as any).createMarkdownCompiler = (): CompilerFunction => {
  (window as any).importScripts(markedUrl);
  const marked = (window as any).marked;
  let hljs: any;
  let markedHighlight: any;
  return async (code, { config }) => {
    if (code.includes('```')) {
      if (!hljs) {
        (window as any).importScripts(vendorsBaseUrl + 'highlight.js/highlight.umd.js');
        hljs = (window as any).hljs;
      }
      if (!markedHighlight) {
        (window as any).importScripts(markedHighlightUrl);
        markedHighlight = (window as any).markedHighlight.markedHighlight;
      }
      marked.use(
        markedHighlight({
          async: true,
          emptyLangClass: 'hljs',
          langPrefix: 'hljs language-',
          async highlight(codeBlock: string, lang: string) {
            if (lang === 'mermaid') {
              return `<pre class="mermaid">${codeBlock}</pre><!-- mermaid -->`;
            }
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(codeBlock, { language }).value;
          },
        }),
      );
    }
    let html = await marked.parse(code, { ...getLanguageCustomSettings('markdown', config) });
    html = html
      .replace(/<pre><code class="hljs language-mermaid">/g, '')
      .replace(/<!-- mermaid -->\s?<\/code><\/pre>/g, '');
    return html;
  };
};
