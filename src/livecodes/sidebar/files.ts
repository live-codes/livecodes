import type { FilesSection, SidebarSectionList } from '../models';

export const createFilesTree: SidebarSectionList[number]['factory'] = (
  container,
  { config, baseUrl, editors, eventsManager, isEmbed },
): FilesSection => {
  setTimeout(() => {
    container.innerHTML = 'Hello';
  }, 5000);

  return {
    name: 'files',
    title: 'Files',
    icon: '',
    load: () => Promise.resolve(),
    onActivate: () => {
      //
    },
    onDeactivate: () => {
      //
    },
  };
};

export default createFilesTree;
