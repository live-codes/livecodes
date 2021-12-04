import { CustomEditors } from '../models';
import { createBlocklyEditor } from './blockly';

export const createCustomEditors = (baseUrl: string): CustomEditors => ({
  blockly: createBlocklyEditor(baseUrl),
});
