import {
  FileTree,
  FileTreeEvent,
  FileTreeNodeData,
  icons,
  type FileTreeStringKey,
} from '@live-codes/file-tree';
import { customEvents } from '../events/custom-events';
import type { Config, FilesSection, SDKConfig, SidebarSectionList } from '../models';

export const createFilesTree: SidebarSectionList[number]['factory'] = async (
  container,
  { config, eventsManager, direction, getConfig },
): Promise<FilesSection> => {
  let { theme = 'dark' } = config;
  container.innerHTML = '';

  const strings: Record<FileTreeStringKey | 'refresh', string> = {
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
    refresh: window.deps.translateString('sidebar.files.refresh', 'Refresh'),
  };

  const getDataFromFiles = (files: Config['files']): FileTreeNodeData[] =>
    files.map((f) => ({ path: f.filename, type: 'file' }));

  const tree = new FileTree(container, {
    data: getDataFromFiles(config.files),
    selected: config.activeEditor,
    theme,
    direction,
    t: (key) => strings[key],
    readOnly: Boolean(config.readonly || config.lockFiles),
    toolbar: {
      custom: [
        {
          id: 'refresh',
          label: strings.refresh,
          icon: icons.refreshIcon,
          order: 1.5,
          onClick: () => refresh(),
        },
      ],
    },
  });

  tree.on('select', (ev) => {
    if (ev.source === 'api') return;
    document.dispatchEvent(
      new CustomEvent(customEvents.files, {
        detail: {
          action: 'select',
          path: ev.path,
        },
      }),
    );
  });

  const runAction = (action: 'rename' | 'copy' | 'delete') => (ev: FileTreeEvent) => {
    const changingPath = ['rename', 'copy'].includes(action);
    if (ev.source === 'api' || (changingPath && !ev.oldPath)) return;

    const fileAction = ({ path, oldPath }: { oldPath?: string; path: string }) => {
      if (changingPath && oldPath === path) return;
      document.dispatchEvent(
        new CustomEvent(customEvents.files, { detail: { action, path, oldPath } }),
      );
    };
    // delete has ev.paths for multi file delete
    // rename and copy have ev.oldPath
    const paths = ev.paths || [ev.path];
    paths.forEach((path) => {
      const node = tree.getNode(path);
      if (node?.type === 'folder') {
        tree
          .getData()
          .filter((f) => f.type === 'file' && f.path.startsWith(path + '/'))
          .forEach((f) => {
            fileAction({
              oldPath: f.path.replace(path + '/', (ev.oldPath || '') + '/'),
              path: f.path,
            });
          });
      } else if (node) {
        fileAction({
          oldPath: ev.oldPath || '',
          path: path,
        });
      }
    });
  };

  tree.on('rename', runAction('rename'));
  tree.on('move', runAction('rename'));
  tree.on('copy', runAction('copy'));

  tree.on('delete', (ev) => {
    if (ev.source === 'api') return;
    const type = tree.getNode(ev.path)?.type;
    if (!type) return;
    config = getConfig();
    if (ev.paths?.includes(config.mainFile || '') || ev.path === config.mainFile) {
      alert(window.deps.translateString('core.files.deleteMainFile', 'Cannot delete main file!'));
      ev.preventDefault();
      return;
    }
    if (
      confirm(
        window.deps.translateString('core.files.deleteFile', 'Delete: {{path}}?', {
          path: ev.paths?.join(', ') ?? ev.path,
        }),
      )
    ) {
      runAction('delete')(ev);
    } else {
      ev.preventDefault();
    }
  });

  tree.on('create', (ev) => {
    if (ev.source === 'api') return;
    document.dispatchEvent(
      new CustomEvent(customEvents.files, {
        detail: {
          action: 'create',
          path: ev.path,
        },
      }),
    );
  });

  tree.on('drop', (ev) => {
    if (ev.source === 'api') return;
    ev.preventDefault();
    document.dispatchEvent(
      new CustomEvent(customEvents.files, {
        detail: {
          action: 'drop',
          dataTransfer: ev.data,
          path: ev.path,
        },
      }),
    );
  });

  const update = ({
    files,
    activeEditor,
    action,
    path,
    oldPath,
  }: {
    files?: Config['files'];
    activeEditor?: Config['activeEditor'];
    action?: 'create' | 'rename' | 'delete';
    path?: string;
    oldPath?: string;
  }) => {
    let updated = false;

    if (action && path) {
      if (action === 'create') {
        tree.addNode({ path, type: 'file' });
        updated = true;
      }
      if (action === 'rename' && oldPath) {
        tree.moveTo(oldPath, path);
        updated = true;
      }
      if (action === 'delete') {
        tree.removeNode(path);
        updated = true;
      }
    }

    if (files && !updated) {
      // fallback to full rerender (resets the tree expand/collapse state)
      tree.setData(getDataFromFiles(files));
    }

    if (activeEditor && tree.getData().find((f) => f.path === activeEditor)) {
      tree.select(activeEditor);
    }
  };

  const refresh = () => {
    config = getConfig();
    const data: FileTreeNodeData[] = getDataFromFiles(config.files);
    tree.setData(data);
    if (config.activeEditor) tree.select(config.activeEditor);
  };

  const setTheme = (ev: CustomEventInit<SDKConfig>) => {
    if (!ev.detail) return;
    const newTheme = ev.detail.theme;
    if (newTheme && theme !== newTheme) {
      theme = newTheme;
      tree.setTheme(theme);
    }
  };

  const stopPropagation = (ev: Event) => {
    ev.stopPropagation();
  };

  eventsManager.addEventListener(document, customEvents.settings, setTheme);
  eventsManager.addEventListener(container, 'drop', stopPropagation); // avoid triggering import in app

  const destroy = () => {
    tree.destroy();
    eventsManager.removeEventListener(document, customEvents.settings, setTheme);
    eventsManager.removeEventListener(container, 'drop', stopPropagation);
  };

  return {
    name: 'files',
    title: 'Files',
    update,
    destroy,
  };
};

export default createFilesTree;
