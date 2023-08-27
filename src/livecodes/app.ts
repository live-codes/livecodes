import { createApi, initializeApp, loadToolsPane, extraHandlers, basicHandlers } from './core';
import type { API, Config } from './models';

export const app = async (config: Partial<Config>, baseUrl: string): Promise<API> => {
  await initializeApp({ config, baseUrl }, async () => {
    basicHandlers();
    await loadToolsPane();
    await extraHandlers();
  });
  return createApi();
};
