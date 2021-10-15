import { extraHandlers, createApi, initializeApp } from './core';
import { API, Config } from './models';

export const app = async (config: Partial<Config>, baseUrl: string): Promise<API> => {
  await initializeApp({ config, baseUrl }, () => {
    extraHandlers();
  });
  return createApi();
};
