import { getLanguageEditorId } from '../languages/utils';
import type { Config, EditorId } from '../models';

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
