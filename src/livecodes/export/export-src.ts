import type { EditorId, Config } from '../models';
import type { getLanguageExtension as getLanguageExtensionFn } from '../languages';
// eslint-disable-next-line import/no-internal-modules
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
