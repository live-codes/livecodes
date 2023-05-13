import type { CustomEditors, EventsManager } from '../models';
import { createBlocklyEditor } from './blockly';
import { createQuillEditor } from './quill';

export const createCustomEditors = (options: {
  baseUrl: string;
  eventsManager: EventsManager;
}): CustomEditors => ({
  blockly: createBlocklyEditor(options),
  richtext: createQuillEditor(options),
});
