import type { Types } from '../models';
// eslint-disable-next-line import/no-internal-modules
import { modulesService } from '../services/modules';

export const getDefaultTypes = (): Types => ({
  livecodes: modulesService.getUrl('livecodes/livecodes.d.ts'),
});
