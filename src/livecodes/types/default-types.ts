import type { Types } from '../models';
// eslint-disable-next-line import/no-internal-modules
import { modulesService } from '../services/modules';

export const getDefaultTypes = (): Types => ({
  react: modulesService.getUrl('@types/react/index.d.ts'),
  'react-dom': modulesService.getUrl('@types/react-dom/index.d.ts'),
  'react-dom/client': modulesService.getUrl('@types/react-dom/client.d.ts'),
});
