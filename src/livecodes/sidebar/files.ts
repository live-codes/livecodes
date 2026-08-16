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

  const data: FileTreeNodeData[] = config.files.map((f) => ({ path: f.filename, type: 'file' }));
  const selected = config.activeEditor
    ? data.find((f) => f.path === config.activeEditor)?.path
    : undefined;
  const tree = new FileTree(container, {
    data,
    selected,
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
    document.dispatchEvent(
      new CustomEvent(customEvents.files, {
        detail: {
          action: 'drop',
          data: ev.data,
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
      tree.setData(files.map((f) => ({ ...f, path: f.filename, type: 'file' })));
    }

    if (activeEditor && tree.getData().find((f) => f.path === activeEditor)) {
      tree.select(activeEditor);
    }
  };

  const refresh = () => {
    config = getConfig();
    const d: FileTreeNodeData[] = config.files.map((f) => ({
      path: f.filename,
      type: 'file',
    }));
    const s = config.activeEditor ? d.find((f) => f.path === config.activeEditor)?.path : undefined;
    tree.setData(d);
    if (s) tree.select(s);
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
