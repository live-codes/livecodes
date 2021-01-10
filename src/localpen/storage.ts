import { Pen } from './models';

interface Item {
  id: string;
  pen: Pen;
  lastModified: number;
}
interface Storage {
  activeItemId: string | null;
  items: Item[];
}

export const createStorage = (name = '__localpen_data__') => {
  const EMPTY: Storage = {
    activeItemId: null,
    items: [],
  };

  const getData = () => {
    const data = window.localStorage.getItem(name);
    return data ? (JSON.parse(data) as Storage) : EMPTY;
  };

  const setData = (data: Storage) => {
    window.localStorage.setItem(name, JSON.stringify(data));
  };

  const getList = () =>
    getData()
      .items?.map((item) => ({
        id: item.id,
        title: item.pen?.title,
        lastModified: item.lastModified,
      }))
      .sort((a, b) => b.lastModified - a.lastModified);

  const getItem = (itemId: string) => getData().items?.find((item) => itemId === item.id);

  const updateItem = (id: string, pen: Pen) => {
    const data = getData();
    const item = data.items?.find((item) => id === item.id);
    if (!item) return;

    item.pen = pen;
    item.lastModified = Date.now();
    data.activeItemId = id;
    setData(data);
  };

  const addItem = (pen: Pen) => {
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
    getItem,
    addItem,
    updateItem,
    deleteItem,
    clear,
  };
};
