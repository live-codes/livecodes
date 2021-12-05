import { CustomEditors } from '../models';
import { createBlocklyEditor } from './blockly';
import { createCkeditor } from './ckeditor';

export const createCustomEditors = (baseUrl: string): CustomEditors => ({
  blockly: createBlocklyEditor(baseUrl),
  richtext: createCkeditor(baseUrl),
});
