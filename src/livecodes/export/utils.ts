import { replaceImports } from '../compiler/import-map';
import { getSource, isEditorId } from '../config/utils';
import type {
  getLanguageCompiler as getLanguageCompilerFn,
  getLanguageExtension as getLanguageExtensionFn,
} from '../languages';
import type { Config, ContentConfig, EditorId, Language, User } from '../models';
import { escapeScript, safeName } from '../utils';

export interface Files {
  [key: string]: { content: string };
}
export const getFilesFromConfig = (
  config: Config | ContentConfig,
  {
    getLanguageExtension,
  }: {
    getLanguageExtension: typeof getLanguageExtensionFn;
  },
): Files => {
  const filenames = {
    markup: 'index',
    style: 'style',
    script: 'script',
  };
  const codeFiles =
    config.files.length > 0
      ? config.files.reduce(
          (files, file) => ({
            ...files,
            [file.filename]: { content: file.content },
          }),
          {},
        )
      : (Object.keys(filenames) as EditorId[]).reduce((files, editorId) => {
          if (!isEditorId(editorId)) {
            return files;
          }
          const filename = filenames[editorId];
          const language = config[editorId].language;
          const extension = getLanguageExtension?.(language) || 'md';
          const content = config[editorId].content || '';
          return {
            ...files,
            ...(content ? { [filename + '.' + extension]: { content } } : {}),
          };
        }, {});

  const externalStyles =
    config.stylesheets.length > 0
      ? {
          styles: {
            content: config.stylesheets
              .map((url) => `<link rel="stylesheet" href="${url}" />`)
              .join('\n'),
          },
        }
      : undefined;

  const externalScripts =
    config.scripts.length > 0
      ? {
          scripts: {
            content: config.scripts.map((url) => `<script src="${url}"></script>`).join('\n'),
          },
        }
      : undefined;

  const tests = config.tests?.content
    ? {
        ['script.spec.' + getLanguageExtension?.(config.tests?.language) || 'ts']: {
          content: config.tests?.content,
        },
      }
    : undefined;

  return {
    ...codeFiles,
    ...externalStyles,
    ...externalScripts,
    ...tests,
  };
};

export const getDescriptionFile = (
  config: ContentConfig,
  user?: User,
  url?: string,
  gist = true,
) => {
  const githubUrl = gist ? 'https://gist.github.com/' : 'https://github.com/';
  const displayName = user?.displayName || user?.username;
  const userInfo = !displayName
    ? ''
    : !user.username
      ? 'by ' + displayName
      : 'by [' + displayName + '](' + githubUrl + user.username + ')';
  const projectInfo = url ? `[project](https://livecodes.io/?x=${url})` : 'project';

  return {
    [safeName(config.title) + '.md']: {
      content: `# ${config.title}\nA ${projectInfo} created ${userInfo} on [LiveCodes](https://livecodes.io).`,
    },
  };
};

export const getCompilerScripts = ({
  baseUrl,
  editorId,
  config,
  compiled,
  supportedLanguages,
  getLanguageCompiler,
}: {
  baseUrl: string;
  editorId: EditorId;
  config: Config;
  compiled: { [key in EditorId]: string };
  supportedLanguages: { [key in EditorId]: Language[] };
  getLanguageCompiler: typeof getLanguageCompilerFn;
}) => {
  const src = getSource(editorId, config);
  if (!src || supportedLanguages[editorId].includes(src.language)) return [];
  const compilerScripts = getLanguageCompiler?.(src.language)?.scripts;
  const compiledCode = src.language === 'python' ? src.content || '' : compiled[editorId];
  const scripts =
    typeof compilerScripts === 'function'
      ? compilerScripts({ compiled: compiledCode, baseUrl, config })
      : compilerScripts;
  return scripts?.filter((url) => url.startsWith('https://')) || [];
};

export const getContent = ({
  editorId,
  config,
  compiled,
  supportedLanguages,
  getLanguageCompiler,
}: {
  editorId: EditorId;
  config: Config;
  compiled: Partial<{ [key in EditorId]: string }>;
  supportedLanguages: { [key in EditorId]: Language[] };
  getLanguageCompiler: typeof getLanguageCompilerFn;
}) => {
  const isScriptSupported = ['javascript', 'jsx', 'tsx', ...supportedLanguages.script].includes(
    config.script.language,
  );

  const content = {
    markup: ['html', ...supportedLanguages.markup].includes(config.markup.language)
      ? config.markup.content
      : compiled.markup || '',
    style: ['css', ...supportedLanguages.style].includes(config.style.language)
      ? config.style.content
      : compiled.style || '',
    script:
      config.script.language === 'php'
        ? config.script.content?.replace(/<\?php/g, '') || ''
        : config.script.language === 'python'
          ? config.script.content
          : replaceImports(
              (isScriptSupported ? config.script.content : compiled.script || '') || '',
              config,
            ),
    files: config.files.map((file) => ({
      ...file,
      content: replaceImports(file.content, config),
    })),
  };

  const scriptType = getLanguageCompiler?.(config.script.language)?.scriptType;
  if (!isScriptSupported && scriptType && scriptType !== 'module') {
    if (editorId === 'markup') {
      return (
        content.markup +
        `
<script type="${scriptType}">
${escapeScript(content.script || '')}
</script>
`
      );
    }
    if (editorId === 'script') {
      if (config.script.language === 'python') {
        return 'window.addEventListener("load", () => {brython()});';
      }
      return '';
    }
  }
  return getSource(editorId, content as any)?.content || '';
};
