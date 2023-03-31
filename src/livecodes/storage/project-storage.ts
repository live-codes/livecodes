import type { ContentConfig } from '../models';
import type { ProjectStorage, SavedProject, StorageItem, StoreName } from './models';
import { createStorage, generateId } from './storage';

export const createProjectStorage = async (
  name: StoreName,
  isEmbed: boolean,
): Promise<ProjectStorage> => {
  const storage = await createStorage<StorageItem>(name, isEmbed);

  const getList = async (): Promise<SavedProject[]> =>
    (await storage.getAllData())
      .map((item: StorageItem) => ({
        id: item.id,
        title: item.config?.title || '',
        description: item.config?.description || '',
        tags: item.config?.tags || [],
        languages: item.config
          ? [item.config.markup.language, item.config.style.language, item.config.script.language]
          : [],
        lastModified: item.lastModified,
      }))
      .sort((a, b) => b.lastModified - a.lastModified);

  const updateItem = (id: string, config: ContentConfig) => {
    const newItem: StorageItem = {
      id,
      config,
      lastModified: Date.now(),
    };
    return storage.updateItem(id, newItem);
  };

  const addItem = async (config: ContentConfig) => {
    const id = generateId();
    return updateItem(id, config);
  };

  const bulkInsert = async (newProjects: ContentConfig[]) => {
    for (const config of newProjects) {
      await addItem(config);
    }
  };

  return {
    ...storage,
    getList,
    addItem,
    updateItem,
    bulkInsert,
  };
};
