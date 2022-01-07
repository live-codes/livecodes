import { CustomEditor } from '../../models';

export const createBlocklyEditor = (baseUrl: string): CustomEditor => {
  let blockly: typeof import('./blockly');

  const loadBlockly = async () => {
    if (blockly) return;

    const editorContainer = document.querySelector('#script') as HTMLElement;
    const blocklyElement = document.createElement('div');
    blocklyElement.id = 'blockly';
    blocklyElement.classList.add('custom-editor');
    blocklyElement.innerHTML = `<span class="loading-custom-editor">Loading blockly editor...</span>`;
    editorContainer.appendChild(blocklyElement);

    blockly = await import(baseUrl + 'blockly.js');
  };

  return {
    language: 'blockly',
    show: async (show, options) => {
      if (!blockly && show) {
        await loadBlockly();
      }

      const blocklyEditor = document.querySelector<HTMLElement>('#blockly');
      if (!show || options.editors.script.getLanguage() !== 'blockly') {
        if (blocklyEditor) blocklyEditor.style.display = 'none';
        return;
      }
      if (blocklyEditor) blocklyEditor.style.display = 'unset';

      await blockly.showBlockly(options);
    },
    getContent: async (options) => {
      await loadBlockly();
      return blockly.getBlocklyContent(options);
    },
    setTheme: (theme) => {
      blockly?.setBlocklyTheme(theme);
    },
  };
};
