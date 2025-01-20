/* eslint-disable import/no-internal-modules */
import { ctrl } from '../utils/utils';

document.addEventListener('keydown', function (e) {
  // Cmd + Shift + S forks the project (save as...)
  if (ctrl(e) && e.shiftKey && e.code === 'KeyS') {
    e.preventDefault();
    parent.postMessage({ type: 'customEditorCommand', payload: 'fork' }, '*');
    return;
  }

  // Cmd + S saves the project
  if (ctrl(e) && e.code === 'KeyS') {
    // save
    e.preventDefault();
    parent.postMessage({ type: 'customEditorCommand', payload: 'save' }, '*');
    return;
  }
});
