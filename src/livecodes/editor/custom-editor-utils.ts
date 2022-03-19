document.addEventListener('keydown', function (e) {
  const ctrl = (e: KeyboardEvent) => (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey);

  // Cmd + Shift + S forks the project (save as...)
  if (ctrl(e) && e.shiftKey && e.keyCode === 83) {
    e.preventDefault();
    parent.postMessage({ type: 'customEditorCommand', payload: 'fork' }, '*');
    return;
  }

  // Cmd + S saves the project
  if (ctrl(e) && e.keyCode === 83) {
    // save
    e.preventDefault();
    parent.postMessage({ type: 'customEditorCommand', payload: 'save' }, '*');
    return;
  }
});
