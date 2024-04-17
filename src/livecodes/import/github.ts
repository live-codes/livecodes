/* eslint-disable import/no-internal-modules */
import { decode } from 'js-base64';
import type { Language, Config, User, EditorId } from '../models';
import { getLanguageByAlias, getLanguageEditorId, getLanguageExtension } from '../languages/utils';
import { getGithubHeaders } from '../services/github';
import { modulesService } from '../services/modules';

const getValidUrl = (url: string) =>
  url.startsWith('https://') ? new URL(url) : new URL('https://' + url);

// based on https://github.com/yusanshi/embed-like-gist
const getFileData = (urlObj: URL): FileData => {
  const pathSplit = urlObj.pathname.split('/');
  const user = pathSplit[1];
  const repo = pathSplit[2];
  const ref = pathSplit[4];
  const filePath = pathSplit.slice(5, pathSplit.length).join('/');
  const filename = filePath.split('/')[filePath.split('/').length - 1];
  const extension = (filename.split('.')[filename.split('.').length - 1] || 'md') as Language;
  const lineSplit = urlObj.hash.split('-');
  const startLine = urlObj.hash !== '' ? Number(lineSplit[0].replace('#L', '')) : -1;
  const endLine =
    urlObj.hash !== '' && lineSplit.length > 1 ? Number(lineSplit[1].replace('L', '')) : startLine;
  const apiUrl = `https://api.github.com/repos/${user}/${repo}/contents/${filePath}?ref=${ref}`;
  return {
    user,
    repo,
    ref,
    path: filePath,
    filename,
    extension,
    startLine,
    endLine,
    apiUrl,
  };
};

interface FileData {
  user: string;
  repo: string;
  ref: string;
  path: string;
  filename: string;
  extension: Language;
  startLine: number;
  endLine: number;
  apiUrl: string;
}

const getContent = async (
  fileData: FileData,
  loggedInUser: User | null | void,
): Promise<Partial<Config>> => {
  const { apiUrl, extension, startLine, endLine } = fileData;
  try {
    const fileContent = await fetch(apiUrl, {
      ...(loggedInUser ? { headers: getGithubHeaders(loggedInUser) } : {}),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Cannot fetch: ' + apiUrl);
        return res.json();
      })
      .then((data) => decode(data.content));

    if (fileData.filename === 'livecodes.json' && fileContent?.trim()) {
      try {
        return JSON.parse(fileContent);
      } catch {
        // invalid JSON
      }
    }

    const content =
      startLine > 0
        ? fileContent
            .split('\n')
            .slice(startLine - 1, endLine)
            .join('\n')
        : fileContent;
    const language = getLanguageByAlias(extension) || 'html';
    const editorId = getLanguageEditorId(language) || 'markup';
    const config = {
      [editorId]: {
        language,
        content,
      },
      activeEditor: editorId,
    };
    return addBaseTag(config, [fileData]);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Cannot fetch: ' + apiUrl);
    return {};
  }
};

export const importFromGithub = (
  url: string,
  loggedInUser: User | null | void,
): Promise<Partial<Config>> => {
  const validUrl = getValidUrl(url);
  const fileData = getFileData(validUrl);
  return getContent(fileData, loggedInUser);
};

export const addBaseTag = (
  config: Partial<Config>,
  files: Array<{ user: string; repo: string; ref: string; path: string }>,
): Partial<Config> => {
  const markupLanguages = ['html', 'markdown', 'mdx'];
  const markupFile = files.find((file) =>
    markupLanguages.find((lang) => file.path.endsWith(`.${getLanguageExtension(lang)}`)),
  );
  const getFile = (editorId: EditorId) =>
    files.find((file) => {
      const extension = file.path.split('.')[file.path.split('.').length - 1];
      return editorId === getLanguageEditorId(extension);
    });
  const styleFile = getFile('style');
  const scriptFile = getFile('script');
  if (
    !markupFile ||
    !config.markup?.language ||
    !markupLanguages.includes(config.markup?.language || '') ||
    config.markup.content?.includes('<base')
  ) {
    return config;
  }
  const { user, repo, ref, path } = markupFile;
  const baseUrl = modulesService.getUrl(`gh:${user}/${repo}@${ref}/${path}`);
  const baseTag = `<base href="${baseUrl}">`;

  const removeTags = (markupContent: string, tag: 'link' | 'script') => {
    const file = tag === 'link' ? styleFile : scriptFile;
    if (!file) return markupContent;
    const filename = file.path.split('/')[file.path.split('/').length - 1];
    if (!markupContent.includes(filename)) return markupContent;
    const linkPattern = new RegExp(
      `<link[^>]{1,200}?href=["']((?!http(s)?:\\/\\/).){0,200}?${filename}["'][^>]{0,200}?>`,
      'g',
    );
    const scriptPattern = new RegExp(
      `<script[\\s\\S]{1,200}?src=["']((?!http(s)?:\\/\\/).){0,200}?${filename}["'][\\s\\S]{0,200}?</script>`,
      'g',
    );
    const pattern = tag === 'link' ? linkPattern : scriptPattern;
    return markupContent.replace(pattern, '');
  };

  let content = removeTags(config.markup.content || '', 'link');
  content = removeTags(content, 'script');

  return {
    ...config,
    head: `${baseTag}\n${config.head || ''}`,
    markup: {
      ...config.markup,
      content,
    },
  };
};
