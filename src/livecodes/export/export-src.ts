import { EditorId, Config } from '../models';
import { downloadFile, getFilesFromConfig } from './utils';

export const exportSrc = async (config: Config, { JSZip, html }: any, baseUrl?: string) => {
  if (!JSZip) {
    JSZip = (await import(baseUrl + 'vendor/jszip/jszip.js')).default;
  }

  const zip = new JSZip();

  const files = getFilesFromConfig(config);
  (Object.keys(files) as EditorId[]).forEach((filename) => {
    zip.file(filename, files[filename]?.content);
  });
  zip.file('result.html', html);
  zip.file('livecodes.json', JSON.stringify(config, null, 2));
  const output = await zip.generateAsync({ type: 'base64' });

  const filename = config.title;
  const extension = 'zip';
  const content = 'data:application/zip;base64,' + encodeURIComponent(output);
  downloadFile(filename, extension, content);
};
