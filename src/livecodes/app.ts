import { createApi, initializeApp, loadToolsPane, extraHandlers } from './core';
import type { API, Config } from './models';

export const app = async (config: Partial<Config>, baseUrl: string): Promise<API> => {
  await initializeApp({ config, baseUrl }, async () => {
    await loadToolsPane();
    await extraHandlers();
  });
  return createApi();
};
