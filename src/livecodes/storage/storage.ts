import { localforageUrl } from '../vendors';
import { createPub } from '../events';
import { bypassAMD, loadScript } from '../utils';
import type { Storage, StoreName } from './models';
import { fakeStorage } from './fake-storage';

type LocalForage = typeof import('localforage');
let localforage: LocalForage;
const dbName = 'livecodes';
const stores: Record<string, LocalForage> = {};

export const generateId = () =>
  (Date.now() + '' + Math.floor(Math.floor(Math.random() * Date.now()))).substring(0, 24);

const loadLocalforage = async (store: string) => {
  if (!localforage) {
    localforage = (await bypassAMD(() => loadScript(localforageUrl, 'localforage'))) as LocalForage;
    localforage.config({
      name: dbName,
    });
  }
  if (!stores[store]) {
    stores[store] = localforage.createInstance({
      name: dbName,
      storeName: store,
    });
  }
};

/**
 * Creates asynchronous data store using localforage
 */
export const createStorage = async <T>(name: StoreName, isEmbed: boolean): Promise<Storage<T>> => {
  // do not allow access to storage in embeds
  if (isEmbed) return fakeStorage;

  let store: LocalForage;
  const pub = createPub<T[]>();

  const subscribe = (fn: (data: T[]) => void) => pub.subscribe(fn);

  const unsubscribeAll = () => {
    pub.unsubscribeAll();
  };

  const notifyPub = () => {
    if (pub.hasSubscribers()) {
      getAllData().then((data) => {
        pub.notify(data);
      });
    }
  };

  const load = async () => {
    await loadLocalforage(name);
    store = stores[name];
  };

  const getList = async (): Promise<string[]> => {
    await load();
    return store.keys();
  };

  const getAllData = async (): Promise<T[]> => {
    await load();
    const list: T[] = [];
    await store.iterate((item: T) => {
      list.push(item);
    });
    return list.sort((a: any, b: any) =>
      b.lastModified && a.lastModified ? b.lastModified - a.lastModified : 0,
    );
  };

  const getItem = async (id: string): Promise<T | null> => {
    await load();
    return store.getItem(id);
  };

  const updateItem = async (id: string, value: T, notify = true) => {
    await load();
    await store.setItem(id, value);
    if (notify) {
      notifyPub();
    }
    return id;
  };

  const addItem = async (value: T, notify = true) => {
    const id = generateId();
    await updateItem(id, value, notify);
    return id;
  };

  const deleteItem = async (id: string) => {
    await load();
    await store.removeItem(id);
    notifyPub();
  };

  const bulkInsert = async (data: T[]) => {
    for (const item of data) {
      await addItem(item, false);
    }
    notifyPub();
  };

  // like bulkInsert, with same ids
  const restore = async (data: T[]) => {
    for (const item of data as any) {
      if (item.id) {
        await updateItem(item.id, item, false);
      } else {
        await addItem(item, false);
      }
    }
    notifyPub();
  };

  const clear = async () => {
    await load();
    await store.clear();
    notifyPub();
  };

  return {
    getList,
    getAllData,
    getItem,
    addItem: (value) => addItem(value),
    updateItem: (id, value) => updateItem(id, value),
    deleteItem,
    bulkInsert,
    restore,
    clear,
    subscribe,
    unsubscribeAll,
  };
};
