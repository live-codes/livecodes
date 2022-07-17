import { SimpleStorage, Storage } from './models';

export const fakeStorage: Omit<Storage<any>, 'getList'> & { getList: () => Promise<[]> } = {
  getList: async () => [],
  getAllData: async () => [],
  getItem: async () => null,
  addItem: async () => '',
  updateItem: async () => '',
  deleteItem: async () => undefined,
  bulkInsert: async () => undefined,
  restore: async () => undefined,
  clear: async () => undefined,
  subscribe: () => undefined,
  unsubscribeAll: () => undefined,
};

export const fakeSimpleStorage: SimpleStorage<any> = {
  getValue: () => null,
  setValue: () => undefined,
  clear: () => undefined,
  subscribe: () => undefined,
  unsubscribeAll: () => undefined,
};
