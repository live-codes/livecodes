import type { Config } from '../models';
import { downloadFile } from '../utils';

export const exportJSON = (config: Config) => {
  const filename = config.title;
  const extension = 'json';
  const content =
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
  downloadFile(filename, extension, content);
};
