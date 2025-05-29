import type { ContentConfig, EventsManager } from '../models';
import { importFromImage } from './image';
import type { SourceFile, populateConfig as populateConfigFn } from './utils';
import { importFromZip } from './zip';

export const importFromFiles = async (
  files: FileList,
  populateConfig: typeof populateConfigFn,
  eventsManager: EventsManager,
) => {
  const loadFiles = (files: FileList) =>
    new Promise<Partial<ContentConfig>>((resolve, reject) => {
      const sourceFiles: SourceFile[] = [];

      for (const file of files) {
        // Max 100 MB allowed
        const maxSizeAllowed = 100 * 1024 * 1024;
        if (file.size > maxSizeAllowed) {
          reject('Error: Exceeded size 100 MB');
          return;
        }

        const reader = new FileReader();
        eventsManager.addEventListener(reader, 'load', (event: any) => {
          const text = (event.target?.result as string) || '';
          sourceFiles.push({
            filename: file.name,
            content: text,
          });

          if (sourceFiles.length === files.length) {
            resolve(populateConfig(sourceFiles, {}));
          }
        });

        eventsManager.addEventListener(reader, 'error', () => {
          reject('Error: Failed to read file');
        });

        reader.readAsText(file);
      }
    });

  const loadZipFile = (files: FileList) => importFromZip(files[0], populateConfig);
  const loadImage = (files: FileList) => importFromImage(files[0]);

  if (!files?.length) return {};

  const getConfigFromFiles =
    files?.length > 1
      ? loadFiles
      : files[0].name.endsWith('.zip')
        ? loadZipFile
        : files[0].type.startsWith('image/')
          ? loadImage
          : loadFiles;

  return getConfigFromFiles(files);
};
