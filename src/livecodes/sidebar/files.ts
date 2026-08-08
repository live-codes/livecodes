import { FileTree, type FileTreeStringKey } from '@live-codes/file-tree';
import { customEvents } from '../events/custom-events';
import type { Config, FilesSection, SDKConfig, SidebarSectionList } from '../models';

export const createFilesTree: SidebarSectionList[number]['factory'] = async (
  container,
  { config, editors, eventsManager, isEmbed, dir },
): Promise<FilesSection> => {
  let { theme = 'dark' } = config;
  container.innerHTML = '';

  const strings: Record<FileTreeStringKey, string> = {
    newFile: window.deps.translateString('sidebar.files.newFile', 'New File'),
    newFolder: window.deps.translateString('sidebar.files.newFolder', 'New Folder'),
    expandAll: window.deps.translateString('sidebar.files.expandAll', 'Expand All'),
    collapseAll: window.deps.translateString('sidebar.files.collapseAll', 'Collapse All'),
    copy: window.deps.translateString('sidebar.files.copy', 'Copy'),
    cut: window.deps.translateString('sidebar.files.cut', 'Cut'),
    paste: window.deps.translateString('sidebar.files.paste', 'Paste'),
    copyPath: window.deps.translateString('sidebar.files.copyPath', 'Copy Path'),
    rename: window.deps.translateString('sidebar.files.rename', 'Rename'),
    delete: window.deps.translateString('sidebar.files.delete', 'Delete'),
  };

  const tree = new FileTree(container, {
    data: config.files.map((f) => ({ ...f, path: f.filename, type: 'file' })),
    selected: 'src/index.ts',
    theme,
    direction: dir,
    t: (key) => strings[key],
    readOnly: Boolean(config.readonly || config.lockFiles),
  });

  eventsManager.addEventListener(
    document,
    customEvents.settings,
    (ev: CustomEventInit<SDKConfig>) => {
      if (!ev.detail) return;
      const newTheme = ev.detail.theme;
      if (newTheme && theme !== newTheme) {
        theme = newTheme;
        tree.setTheme(theme);
      }
    },
  );

  tree.on('select', (ev) => {});
  tree.on('rename', (ev) => {});
  tree.on('delete', (ev) => {});
  tree.on('move', (ev) => {});
  tree.on('copy', (ev) => {});
  tree.on('create', (ev) => {});
  tree.on('drop', (ev) => {});

  const update = ({
    files,
    activeEditor,
  }: {
    files?: Config['files'];
    activeEditor?: Config['activeEditor'];
  }) => {
    if (files) {
      tree.setData(files.map((f) => ({ ...f, path: f.filename, type: 'file' })));
    }
    if (activeEditor) {
      tree.select(activeEditor);
    }
  };

  return {
    name: 'files',
    title: 'Files',
    icon: '',
    load: () => Promise.resolve(),
    update,
    destroy: () => tree.destroy(),
  };
};

export default createFilesTree;
