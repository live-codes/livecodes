import { basicHandlers, createApi, initializeApp } from './core';
import type { API, Config } from './models';

export const app = async (config: Partial<Config>, baseUrl: string): Promise<API> => {
  await initializeApp({ config, baseUrl, isEmbed: true, isLite: true }, async () => {
    basicHandlers();
  });
  return createApi();
};
