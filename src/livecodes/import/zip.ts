import type { ContentConfig } from '../models';
import { loadScript } from '../utils/utils';
import { jsZipUrl } from '../vendors';
import { filterFiles } from './files';
import type { populateConfig as populateConfigFn } from './utils';

export const importFromZip = async (blob: Blob, populateConfig: typeof populateConfigFn) =>
  new Promise<Partial<ContentConfig>>(async (resolve, reject) => {
    if (blob.size > 100 * 1024 * 1024) {
      // > 100 MB
      reject(new Error('File is too big'));
    }
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

        const allFiles: any[] = zip.file(/.*/);
        if (allFiles.length > 0) {
          const sourceFiles = await Promise.all(
            allFiles.map(async (file) => ({
              filename: file.name.split('/').pop(),
              content: await file.async('string'),
              path: file.name,
            })),
          );
          resolve(populateConfig(filterFiles(sourceFiles), {}));
          return;
        }

        resolve({});
      })
      .catch(reject);
  });
