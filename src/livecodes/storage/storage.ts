import { ContentConfig } from '../models';
import { loadScript } from '../utils';
import { localforageUrl } from '../vendors';
import { ProjectStorage, SavedProject, StorageItem } from './models';

let localforage: typeof import('localforage');
const dbName = 'livecodes';

const loadLocalforage = async () => {
  localforage = localforage || (await loadScript(localforageUrl, 'localforage'));
  localforage.config({
    name: dbName,
  });
};

/**
 * Creates asynchronous data store using localforage
 */
export const createStorage = async (name: string): Promise<ProjectStorage> => {
  await loadLocalforage();

  const store = localforage.createInstance({
    name: dbName,
    storeName: name,
  });

  const getList = async (): Promise<SavedProject[]> => {
    const list: SavedProject[] = [];
    await store.iterate((item: StorageItem, key) => {
      list.push({
        id: key,
        title: item.config?.title || '',
        description: item.config?.description || '',
        tags: item.config?.tags || [],
        languages: item.config
          ? [item.config.markup.language, item.config.style.language, item.config.script.language]
          : [],
        lastModified: item.lastModified,
      });
    });
    return list.sort((a, b) => b.lastModified - a.lastModified);
  };

  const getAllData = async (): Promise<StorageItem[]> => {
    const list: StorageItem[] = [];
    await store.iterate((item: StorageItem) => {
      list.push(item);
    });
    return list.sort((a, b) => b.lastModified - a.lastModified);
  };

  const getItem = (itemId: string): Promise<StorageItem | null> => store.getItem(itemId);

  const updateItem = async (id: string, config: ContentConfig) => {
    const newItem: StorageItem = {
      id,
      config,
      lastModified: Date.now(),
    };
    await store.setItem(id, newItem);
    return id;
  };

  const addItem = (config: ContentConfig) => {
    const id = (Date.now() + '' + Math.floor(Math.floor(Math.random() * Date.now()))).substring(
      0,
      24,
    );
    return updateItem(id, config);
  };

  const bulkInsert = async (newProjects: ContentConfig[]) => {
    for (const config of newProjects) {
      await addItem(config);
    }
  };

  const deleteItem = async (id: string) => {
    await store.removeItem(id);
  };

  const clear = async () => {
    await store.clear();
  };

  return {
    getList,
    getAllData,
    getItem,
    addItem,
    updateItem,
    deleteItem,
    bulkInsert,
    clear,
  };
};
