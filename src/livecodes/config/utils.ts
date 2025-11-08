import {
  getFileLanguage,
  getLanguageEditorId,
  languageIsEnabled,
  supportsMultiFile,
} from '../languages/utils';
import type { Config, EditorId } from '../models';
import { removeLeadingSlash } from '../utils/utils';

export const isEditorId = (editorId: string): editorId is 'markup' | 'style' | 'script' =>
  editorId === 'markup' || editorId === 'style' || editorId === 'script';

export const getSource = (editorId: EditorId, config: Config) =>
  isEditorId(editorId) ? config[editorId] : config.files.find((f) => f.filename === editorId);

export const getMainFile = (config: Config) =>
  !config.files?.length
    ? undefined
    : config.mainFile && config.files.find((f) => f.filename === config.mainFile)
      ? config.mainFile
      : config.files.find((f) => f.filename === 'index.html')
        ? 'index.html'
        : config.files.find((f) => getLanguageEditorId(f.language) === 'markup')?.filename ||
          'index.html';

export const validateFileName = (filename: string, config: Partial<Config>) => {
  filename = removeLeadingSlash(filename);
  if (!filename) return false;
  if (filename[0] >= '0' && filename[0] <= '9') return false;
  const language = getFileLanguage(filename);
  if (!language || !supportsMultiFile(language) || !languageIsEnabled(language, config as Config)) {
    return false;
  }
  return true;
};
