import { CustomEditor } from '../../models';

export const createCkeditor = (baseUrl: string): CustomEditor => {
  let ckeditor: typeof import('./ckeditor');

  const loadEditor = async () => {
    if (ckeditor) return;

    const editorContainer = document.querySelector('#markup') as HTMLElement;
    const editorElement = document.createElement('div');
    editorElement.id = 'ckeditor';
    editorElement.classList.add('custom-editor');
    editorElement.innerHTML = `<span class="loading-custom-editor">Loading rich text editor...</span>`;
    editorContainer.appendChild(editorElement);

    ckeditor = await import(baseUrl + 'ckeditor.js');
  };

  return {
    language: 'richtext',
    show: async (show, options) => {
      if (!ckeditor && show) {
        await loadEditor();
      }
      const editorContainer = document.querySelector<HTMLElement>('#ckeditor');
      if (!show || options.editors.markup.getLanguage() !== 'richtext') {
        if (editorContainer) editorContainer.style.display = 'none';
        return;
      }
      if (editorContainer) editorContainer.style.display = 'unset';

      await ckeditor.showCkeditor(options);
    },
    getContent: async (options) => {
      await loadEditor();
      return ckeditor.getCkeditorContent(options);
    },
    setTheme: (theme) => {
      ckeditor?.setCkeditorTheme(theme);
    },
  };
};
