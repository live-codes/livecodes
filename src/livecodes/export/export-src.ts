import { EditorId, Config } from '../models';
import { jsZipUrl } from '../vendors';
import { downloadFile } from '../utils';
import { getFilesFromConfig } from './utils';

export const exportSrc = async (config: Config, { JSZip, html }: any, _baseUrl?: string) => {
  if (!JSZip) {
    JSZip = (await import(jsZipUrl)).default;
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
