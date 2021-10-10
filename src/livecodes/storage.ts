import LZString from 'lz-string';
import { ContentConfig, Language } from './models';

export interface Item {
  id: string;
  pen: ContentConfig;
  lastModified: number;
}
export interface SavedProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  languages: Language[];
  lastModified: number;
}
interface Storage {
  activeItemId: string | null;
  items: Item[];
}

export const createStorage = (name = '__livecodes_data__') => {
  const EMPTY: Storage = {
    activeItemId: null,
    items: [],
  };

  const getData = () => {
    const data = window.localStorage.getItem(name);
    if (!data) return EMPTY;
    try {
      return JSON.parse(LZString.decompressFromUTF16(data) as string) as Storage;
    } catch {
      try {
        return JSON.parse(data) as Storage;
      } catch {
        return EMPTY;
      }
    }
  };

  const setData = (data: Storage) => {
    window.localStorage.setItem(name, LZString.compressToUTF16(JSON.stringify(data)));
  };

  const getList = (): SavedProject[] =>
    getData()
      .items?.map((item) => ({
        id: item.id,
        title: item.pen?.title || '',
        description: item.pen?.description || '',
        tags: item.pen?.tags || [],
        languages: item.pen
          ? [item.pen.markup.language, item.pen.style.language, item.pen.script.language]
          : [],
        lastModified: item.lastModified,
      }))
      .sort((a, b) => b.lastModified - a.lastModified);

  const getAllData = () => getData().items;

  const getItem = (itemId: string) => getData().items?.find((item) => itemId === item.id);

  const updateItem = (id: string, pen: ContentConfig) => {
    const data = getData();
    const item = data.items?.find((x) => id === x.id);
    if (!item) return;

    item.pen = pen;
    item.lastModified = Date.now();
    data.activeItemId = id;
    setData(data);
  };

  const addItem = (pen: ContentConfig) => {
    const id = (Date.now() + '' + Math.floor(Math.floor(Math.random() * Date.now()))).substring(
      0,
      24,
    );

    const item = {
      id,
      pen,
      lastModified: Date.now(),
    };
    const data = getData();

    setData({
      ...data,
      activeItemId: id,
      items: [...data.items, item],
    });

    return id;
  };

  const bulkInsert = (newItems: Item[]) => {
    const data = getData();
    setData({
      ...data,
      items: [...data.items, ...newItems],
    });
  };

  const deleteItem = (id: string) => {
    const data = getData();
    const items = data.items.filter((item) => item.id !== id);
    if (id === data.activeItemId) {
      data.activeItemId = items[items.length - 1]?.id;
    }
    setData({ ...data, items });
  };

  const clear = () => {
    setData(EMPTY);
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
