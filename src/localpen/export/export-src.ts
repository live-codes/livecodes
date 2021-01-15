import { getLanguageExtension } from '../languages';
import { EditorId, Pen } from '../models';
import { downloadFile } from './utils';

export const exportSrc = async (
  config: Pen,
  { JSZip, iframeDocument, editors, getEditorLanguage }: any,
) => {
  if (!JSZip) {
    JSZip = (await import(config.baseUrl + 'vendor/jszip/jszip.js')).default;
  }

  const zip = new JSZip();

  const filenames = {
    markup: 'index',
    style: 'style',
    script: 'script',
  };
  (Object.keys(editors) as EditorId[]).forEach((editorId) => {
    const language = getEditorLanguage(editorId);
    const extension = getLanguageExtension(language) || '';
    const filename = filenames[editorId];
    const content = editors[editorId].getValue() || '';
    zip.file(filename + '.' + extension, content);
  });
  zip.file('result.html', iframeDocument.documentElement.outerHTML);
  zip.file('config.json', JSON.stringify(config, null, 2));
  const output = await zip.generateAsync({ type: 'base64' });

  const filename = config.title;
  const extension = 'zip';
  const content = 'data:application/zip;base64,' + encodeURIComponent(output);
  downloadFile(filename, extension, content);
};
