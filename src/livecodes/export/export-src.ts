import { getFileLanguage, type getLanguageExtension as getLanguageExtensionFn } from '../languages';
import type { Config, EditorId } from '../models';
import { downloadFile, loadScript } from '../utils/utils';
import { jsZipUrl } from '../vendors';
import { getFilesFromConfig } from './utils';

export const exportSrc = async (
  config: Config,
  {
    html,
    deps,
  }: {
    html: string;
    deps: {
      getLanguageExtension: typeof getLanguageExtensionFn;
    };
  },
  _baseUrl?: string,
) => {
  const JSZip: any = await loadScript(jsZipUrl, 'JSZip');
  const zip = new JSZip();

  const files = getFilesFromConfig(config, deps);
  (Object.keys(files) as EditorId[]).forEach((filename) => {
    const content = files[filename]?.content || '';
    if (getFileLanguage(filename) === 'binary') {
      zip.file(filename, content.split('base64,')[1] || '', { base64: true });
    } else {
      zip.file(filename, content);
    }
  });
  zip.file('result.html', html);
  zip.file('livecodes.json', JSON.stringify(config, null, 2));
  const output = await zip.generateAsync({ type: 'base64' });

  const filename = config.title;
  const extension = 'zip';
  const content = 'data:application/zip;base64,' + encodeURIComponent(output);
  downloadFile(filename, extension, content);
};
