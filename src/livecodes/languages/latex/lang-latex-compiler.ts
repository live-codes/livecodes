import type { CompilerFunction } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { latexBaseUrl, latexUrl } from '../../vendors';

interface LatexGenerator {
  htmlDocument: (baseUrl?: string) => Document;
}

interface LatexModule {
  HtmlGenerator: new (options?: Record<string, unknown>) => LatexGenerator;
  parse: (code: string, options: { generator: LatexGenerator }) => LatexGenerator;
}

let latexPromise: Promise<LatexModule> | null = null;

const getLatex = (): Promise<LatexModule> => {
  if (!latexPromise) {
    latexPromise = import(latexUrl)
      .then((module) => module as LatexModule)
      .catch((error) => {
        // Reset so a later compile can retry the download.
        latexPromise = null;
        throw error;
      });
  }
  return latexPromise;
};

export const formatLatexError = /* @__PURE__ */ (error: unknown) => {
  const err = error as {
    message?: string;
    location?: { start?: { line?: number; column?: number } };
  };
  const message = err?.message || String(error);
  const start = err?.location?.start;
  return start?.line ? `${message} (line ${start.line}, column ${start.column ?? 1})` : message;
};

export const runOutsideWorker: CompilerFunction = async (code, { config }) => {
  if (!code.trim()) return '';

  try {
    const { HtmlGenerator, parse } = await getLatex();
    const generator = new HtmlGenerator({
      hyphenate: false,
      ...getLanguageCustomSettings('latex', config),
    });

    parse(code, { generator });

    // LaTeX.js creates a full HTML document. Only its body is inserted in the result page,
    // so carry over the stylesheets and page geometry that belong to the document class.
    // They are added in a cascade layer so the user's style editor can still override them.
    const doc = generator.htmlDocument(latexBaseUrl);
    const imports = [...doc.head.querySelectorAll('link[rel="stylesheet"]')]
      .map((link) => `@import url("${link.getAttribute('href')}") layer(latex);`)
      .join('\n');
    const rootStyle = doc.documentElement.getAttribute('style');
    const rootRules = rootStyle ? `@layer latex {\n:root {${rootStyle}}\n}` : '';
    const styles = imports || rootRules ? `<style>${imports}${rootRules}</style>` : '';

    return `${styles}${doc.body.innerHTML}`;
  } catch (error) {
    return { code: '', info: { errors: [formatLatexError(error)] } };
  }
};
