import {
  getFileLanguage,
  getLanguageEditorId,
  languageIsEnabled,
  supportsMultiFile,
} from '../languages/utils';
import type { Cache, Config, EditorId } from '../models';
import { handleSlash } from '../utils/utils';

export const isEditorId = (editorId: string): editorId is 'markup' | 'style' | 'script' =>
  editorId === 'markup' || editorId === 'style' || editorId === 'script';

export const getSource = <T extends Config | Cache>(
  editorId: EditorId,
  config: T,
): T['markup'] | T['files'][0] | undefined =>
  isEditorId(editorId) ? config[editorId] : config.files.find((f) => f.filename === editorId);

export const getMainFile = (config: Config | Cache) =>
  !config.files?.length
    ? undefined
    : config.mainFile && config.files.find((f) => f.filename === config.mainFile)
      ? config.mainFile
      : config.files.find((f) => f.filename === 'index.html')
        ? 'index.html'
        : config.files.find((f) => getLanguageEditorId(f.language) === 'markup')?.filename ||
          'index.html';

export const getValidFileName = (
  filename: string,
  config: Partial<Config>,
): string | { error: 'invalid name' | 'invalid type' } => {
  const name = handleSlash(filename.trim() || '');
  if (name === '') return { error: 'invalid name' };
  if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(name[0])) {
    return { error: 'invalid name' };
  }
  if ([':', '*', '?', '"', '<', '>', '|'].some((c) => name.includes(c))) {
    return { error: 'invalid name' };
  }
  const language = getFileLanguage(name, config.fileLanguages);
  if (!language || !supportsMultiFile(language) || !languageIsEnabled(language, config as Config)) {
    return { error: 'invalid type' };
  }
  return name;
};
