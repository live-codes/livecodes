import { shareService } from '../services/share';

export const importProject = (url: string) => {
  const id = url.slice('id/'.length);
  return shareService.getProject(id);
};
