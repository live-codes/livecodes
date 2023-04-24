import type { EventsManager } from '../models';

const handler = (event: MessageEvent) => {
  if (event.data.type === 'customEditorCommand') {
    if (event.data.payload === 'fork') {
      window.dispatchEvent(
        new KeyboardEvent('keydown', {
          keyCode: 83,
          shiftKey: true,
          ctrlKey: !navigator.platform.match('Mac'),
          metaKey: !!navigator.platform.match('Mac'),
        }),
      );
    }
    if (event.data.payload === 'save') {
      window.dispatchEvent(
        new KeyboardEvent('keydown', {
          keyCode: 83,
          ctrlKey: !navigator.platform.match('Mac'),
          metaKey: !!navigator.platform.match('Mac'),
        }),
      );
    }
  }
};

export const registerEditorCommands = (enable: boolean, eventsManager: EventsManager) => {
  if (enable) {
    eventsManager.addEventListener(window, 'message', handler as any);
  } else {
    eventsManager.removeEventListener(window, 'message', handler as any);
  }
};
