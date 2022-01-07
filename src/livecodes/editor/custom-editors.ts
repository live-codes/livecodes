import { CustomEditors } from '../models';
import { createBlocklyEditor } from './blockly';
import { createQuillEditor } from './quill';

export const createCustomEditors = (baseUrl: string): CustomEditors => ({
  blockly: createBlocklyEditor(baseUrl),
  richtext: createQuillEditor(baseUrl),
});
