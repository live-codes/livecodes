/* eslint-disable @typescript-eslint/no-empty-function */
import { ContentConfig } from '../models';
import { ProjectStorage, SimpleStorage } from './models';

export const fakeStorage: ProjectStorage = {
  getList: async () => [],
  getAllData: async () => [],
  getItem: async (_itemId: string) => null,
  addItem: async (_config: ContentConfig) => '',
  updateItem: async (_id: string, _config: ContentConfig) => '',
  deleteItem: async (_id: string) => {},
  bulkInsert: async (_newProjects: ContentConfig[]) => {},
  addGenericItem: async (_value: any) => '',
  updateGenericItem: async (_id: string, _value: any) => '',
  clear: async () => {},
};

export const fakeSimpleStorage: SimpleStorage<any> = {
  getValue: () => null,
  setValue: () => {},
  clear: () => {},
};
