import { getFileLanguage } from '../languages';
import { importFromImage } from './image';
import { populateConfig } from './utils';
import { importFromZip } from './zip';

export const importFromFiles = async (
  // Use DataTransferItemList interface for folder support
  entries: { files: FileList; items?: DataTransferItemList | undefined },
) => {
  if (!entries.items?.length && !entries.files?.length) return {};

  if (entries.files?.length === 1) {
    const file = entries.files[0];
    if (file.type.startsWith('image/') && file.type !== 'image/svg+xml') {
      return importFromImage(file);
    } else if (file.name.endsWith('.zip')) {
      return importFromZip(file, populateConfig);
    }
  }

  const localFiles = filterFiles(await getLocalFiles(entries));

  if (!localFiles?.length) return {};
  return populateConfig(localFiles, {});
};

export const filterFiles = (files: LocalFile[]) => {
  const maxSizeAllowed = 100 * 1024 * 1024; // 100 MB
  const localFiles = files.filter(
    (file) =>
      !file.path.startsWith('.') && // e.g. .git, .vscode
      !file.path.includes('node_modules') &&
      !file.path.startsWith('dist') &&
      !file.filename.includes('-lock.json') &&
      (!file.size || file.size <= maxSizeAllowed) &&
      getFileLanguage(file.filename) != null,
  );
  localFiles.sort((a, b) => {
    if (a.filename.endsWith('.md')) return 1;
    if (b.filename.endsWith('.md')) return -1;

    if (!a.path.includes('/') && a.filename.endsWith('.json')) return 1;
    if (!b.path.includes('/') && b.filename.endsWith('.json')) return -1;

    if (!a.path.includes('/') && a.filename.includes('.config.')) return 1;
    if (!b.path.includes('/') && b.filename.includes('.config.')) return -1;

    if (a.path.startsWith('public/')) return 1;
    if (b.path.startsWith('public/')) return -1;

    return 0;
  });

  return localFiles;
};

interface LocalFile {
  filename: string;
  content: string;
  path: string;
  size?: number;
  error?: boolean;
}

export const getLocalFiles = async (
  entries: { items: DataTransferItemList | undefined } | { files: FileList | undefined },
): Promise<LocalFile[]> => {
  interface FileInfo {
    file: File | FileSystemEntry;
    path: string;
  }

  if ('items' in entries) {
    if (!entries.items?.length) return [];
    return handleItems(entries.items);
  } else if ('files' in entries) {
    if (!entries.files?.length) return [];
    return handleFiles(entries.files);
  } else {
    return [];
  }

  async function handleItems(items: DataTransferItemList) {
    const entries: Array<FileInfo['file']> = [];

    for (const item of items) {
      // Use webkitGetAsEntry for folder support (works in most modern browsers)
      if (item.webkitGetAsEntry) {
        const entry = item.webkitGetAsEntry();
        if (entry) {
          entries.push(entry);
        }
      } else if (item.getAsFile) {
        // Fallback for browsers without webkitGetAsEntry
        const file = item.getAsFile();
        if (file) {
          entries.push(file);
        }
      }
    }

    if (entries.length === 0) return [];
    try {
      const files = await getAllFiles(entries);
      return processFiles(files);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error processing files:', error);
      return [];
    }
  }

  async function handleFiles(files: FileList) {
    const fileData = [...files].map((file) => ({
      file,
      path: file.webkitRelativePath || file.name,
    }));

    return processFiles(fileData);
  }

  async function getAllFiles(entries: Array<FileInfo['file']>) {
    const files: Array<{ file: File; path: string }> = [];

    async function traverseEntry(entry: FileInfo['file'], path = '') {
      if (isFile(entry)) {
        return new Promise<void>((resolve) => {
          entry.file(
            (file) => {
              files.push({
                file,
                path: path + file.name,
              });
              resolve();
            },
            (error) => {
              // eslint-disable-next-line no-console
              console.error('Error reading file:', error);
              resolve();
            },
          );
        });
      } else if (isDir(entry)) {
        const dirReader = entry.createReader();

        return new Promise<void>((resolve) => {
          const readEntries = () => {
            dirReader.readEntries(
              async (entries: FileSystemEntry[]) => {
                if (entries.length === 0) {
                  resolve();
                  return;
                }

                for (const childEntry of entries) {
                  await traverseEntry(childEntry, path + entry.name + '/');
                }

                // Continue reading (directories might have more than 100 entries)
                readEntries();
              },
              (error: Error) => {
                // eslint-disable-next-line no-console
                console.error('Error reading directory:', error);
                resolve();
              },
            );
          };

          readEntries();
        });
      } else if (entry instanceof File) {
        // Fallback for File objects
        files.push({
          file: entry,
          path: entry.name,
        });
      }
    }

    for (const entry of entries) {
      await traverseEntry(entry);
    }

    return files;
  }

  async function processFiles(fileData: Array<{ file: File; path: string }>) {
    const processedFiles = [];
    for (const { file, path } of fileData) {
      try {
        const content = await readFileContent(file);
        processedFiles.push({
          filename: file.name,
          content,
          path,
          size: file.size,
        });
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(`Error reading file: ${path}.`, error.message || error);
      }
    }
    // Sort by path
    processedFiles.sort((a, b) => a.path.localeCompare(b.path));
    return processedFiles;
  }

  function readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        let content = reader.result || '';
        if (typeof content !== 'string') {
          const decoder = new TextDecoder('utf-8');
          content = decoder.decode(content);
        }
        resolve(content);
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }

  function isFile(x: any): x is FileSystemFileEntry {
    return 'isFile' in x && x.isFile;
  }

  function isDir(x: any): x is FileSystemDirectoryEntry {
    return 'isDirectory' in x && x.isDirectory;
  }
};
