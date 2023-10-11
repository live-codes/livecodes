// eslint-disable-next-line import/no-internal-modules
import { loadScript } from '../utils/utils';
import { jsZipUrl } from '../vendors';
import type { ContentConfig } from '../models';
import type { populateConfig as populateConfigFn, SourceFile } from './utils';

export const importFromZip = async (blob: Blob, populateConfig: typeof populateConfigFn) =>
  new Promise<Partial<ContentConfig>>(async (resolve, reject) => {
    const JSZip: any = await loadScript(jsZipUrl, 'JSZip');

    JSZip.loadAsync(blob)
      .then(async (zip: any) => {
        const projectJson: any[] = zip.file(/livecodes\.json/);
        if (projectJson.length > 0) {
          projectJson[0]
            .async('string')
            .then((str: string) => {
              resolve(JSON.parse(str));
            })
            .catch(reject);
          return;
        }

        const filesInSrcDir: any[] = zip.file(/((^src\/)|(\/src\/))/);
        const allFiles: any[] = zip.file(/.*/);
        const rootFiles = allFiles.filter((file) => !file.name.includes('/'));
        const selectedFiles =
          filesInSrcDir.length > 0 ? filesInSrcDir : rootFiles.length > 0 ? rootFiles : allFiles;

        if (selectedFiles.length > 0) {
          const sourceFiles: SourceFile[] = await Promise.all(
            selectedFiles.map(async (file) => ({
              filename: file.name,
              content: await file.async('string'),
            })),
          );
          resolve(populateConfig(sourceFiles, {}));
          return;
        }

        resolve({});
      })
      .catch(reject);
  });
