import type { CustomEvents } from '../models';

export const customEvents: CustomEvents = {
  getConfig: 'livecodes-get-config',
  config: 'livecodes-config',
  load: 'livecodes-load',
  appLoaded: 'livecodes-app-loaded',
  ready: 'livecodes-ready',
  change: 'livecodes-change',
  testResults: 'livecodes-test-results',
  console: 'livecodes-console',
  destroy: 'livecodes-destroy',
  resizeEditor: 'livecodes-resize-editor',
  apiResponse: 'livecodes-api-response',
};
