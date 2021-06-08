import { shareService } from '../services';

export const isProjectId = (url: string) => url.startsWith('id/');

export const importProject = (url: string) => {
  const id = url.slice(3);
  return shareService.getProject(id);
};
