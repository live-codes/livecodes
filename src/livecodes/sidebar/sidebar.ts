import type {
  Config,
  Editors,
  EventsManager,
  Sidebar,
  SidebarSection,
  SidebarSectionList,
  SidebarSectionName,
  SidebarStatus,
} from '../models';

export const createSidebar = async ({
  config,
  baseUrl,
  editors,
  eventsManager,
  isEmbed,
  dir = 'ltr',
  setSidebar,
}: {
  config: Config;
  baseUrl: string;
  editors: Editors;
  eventsManager: EventsManager;
  isEmbed: boolean;
  dir: 'ltr' | 'rtl' | undefined;
  setSidebar: (sidebar: Config['sidebar']) => void;
}): Promise<Sidebar> => {
  const sidebar = document.getElementById('sidebar');
  const sidebarButtons = document.getElementById('sidebar-buttons');
  const sidebarContent = document.getElementById('sidebar-content');

  if (!sidebarButtons || !sidebarContent) {
    return createFakeSidebar({ config });
  }

  const fullList: SidebarSectionList = [
    {
      name: 'files',
      // factory: createFilesTree,
      factory: baseUrl + '{{hash:files.js}}',
    },
  ];

  const isMultiFile = config.files.length > 0;
  const isEnabled = (section: SidebarSectionList[number]) =>
    section.name === 'files' && !isMultiFile
      ? false
      : config.sidebar.enabled === 'all' || config.sidebar.enabled?.includes(section.name) === true;

  const sectionList: SidebarSectionList = fullList.filter(isEnabled);

  let status: SidebarStatus | undefined;
  let activeSection: SidebarSection['name'] | null = sectionList[0]?.name || null;

  const populateSections = (
    config: Config,
    baseUrl: string,
    editors: Editors,
    eventsManager: EventsManager,
    isEmbed: boolean,
  ): Promise<SidebarSection[]> => {
    // create the elements synchronously to preserve order
    for (const section of sectionList) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.section = section.name;
      sidebarButtons?.appendChild(btn);

      const content = document.createElement('div');
      content.classList.add('sidebar-panel');
      if (activeSection !== section.name) {
        content.classList.add('hidden');
      }
      content.dataset.section = section.name;
      content.innerHTML = `<div class="sidebar-loading">${window.deps.translateString('generic.loading', 'Loading...')}</div>`;
      sidebarContent?.appendChild(content);
    }

    return Promise.all(
      sectionList.map(async (section) => {
        const container = document.querySelector<HTMLElement>(
          `#sidebar-content > .sidebar-panel[data-section="${section.name}"]`,
        );
        if (!container) throw new Error(`Sidebar section ${section.name} not found`);

        const factory =
          typeof section.factory === 'string'
            ? (await import(section.factory)).default
            : section.factory;

        const sidebarSection = await factory(container, {
          config,
          baseUrl,
          editors,
          eventsManager,
          isEmbed,
          dir,
        });

        const btn: HTMLButtonElement | null = document.querySelector(
          `#sidebar-buttons > button[data-section="${section.name}"]`,
        );
        if (btn) {
          btn.innerHTML = sidebarSection.icon || `<i class="icon-${section.name}"></i>`;
          btn.title = sidebarSection.title;
          btn.dataset.i18n = `app.${section.name}.hint`;
          btn.dataset.i18nProp = 'title';
          btn.addEventListener('click', () => {
            if (activeSection === section.name && status === 'open') {
              close();
            } else {
              open(section.name);
            }
          });
        }

        return sidebarSection;
      }),
    );
  };

  const allSections = await populateSections(config, baseUrl, editors, eventsManager, isEmbed);
  const sections = [...allSections];

  const setHidden = (hide: boolean) => {
    if (hide) {
      sidebar?.classList.add('hidden');
    } else {
      sidebar?.classList.remove('hidden');
    }
    status = 'none';
    updateConfig();
  };

  const updateConfig = () => {
    // setSidebar({
    //   ...config.sidebar,
    //   enabled:
    //     sections.length === allSections.length ? 'all' : sections.map((section) => section.name),
    //   active: activeSection || undefined,
    //   status,
    // });
  };

  const setActiveSection = (name: SidebarSection['name'] | null) => {
    activeSection = name;

    document.querySelectorAll<HTMLElement>('#sidebar-buttons > button').forEach((btn) => {
      if (btn.dataset.section === name) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    document
      .querySelectorAll<HTMLElement>('#sidebar-content > .sidebar-panel')
      .forEach((container) => {
        if (container.dataset.section === name) {
          container.classList.add('active');
        } else {
          container.classList.remove('active');
        }
      });

    sections.forEach((section) => {
      if (section.name === name) {
        section.onActivate();
      } else {
        section.onDeactivate();
      }
    });
    updateConfig();
  };

  const open = (name?: SidebarSection['name']) => {
    sidebarContent?.classList.add('open');
    setActiveSection(name || 'files');
    status = 'open';
  };

  const close = () => {
    sidebarContent?.classList.remove('open');
    sections.forEach((section) => section.onDeactivate());
    status = 'closed';
    setTimeout(() => setActiveSection(null), 300);
  };

  const load = async () => {
    const initialLoad = status === undefined;
    activeSection = config.sidebar.active || sections[0]?.name;
    status = config.sidebar.status || 'closed';
    if (initialLoad) {
      if (status === 'none' || sections.length === 0) {
        setHidden(true);
        if (sidebarButtons) {
          sidebarButtons.style.pointerEvents = 'none';
        }
      } else {
        setHidden(false);
        if (sidebarButtons) {
          sidebarButtons.style.pointerEvents = 'auto';
        }
        await Promise.all(sections.map((section) => section.load()));
      }
    }
    if (status === 'open') {
      open(activeSection);
    } else if (status === 'closed') {
      close();
    }
  };

  const disableSection = (name: SidebarSection['name']) => {
    const id = sections.findIndex((s) => s?.name === name);
    if (id === -1) return;
    const section = sections[id];
    if (activeSection === section.name) {
      const newId = id === sections.length - 1 ? id - 1 : id + 1;
      setActiveSection(sections[newId].name);
    }
    delete sections[id];
    if (name in api) {
      delete api[name];
    }
    const sectionButton = document.querySelector<HTMLElement>(
      '#sidebar-buttons [data-section="' + name + '"]',
    );
    if (sectionButton) {
      sectionButton.classList.remove('active');
      sectionButton.classList.add('hidden');
    }
    if (sections.filter((t) => t).length === 0) {
      setHidden(true);
    }
    updateConfig();
  };

  const enableSection = (name: SidebarSection['name']) => {
    // wrong title
    const id = allSections.findIndex((s) => s.name === name);
    if (id === -1) return;
    // already enabled
    if (sections.find((s) => s?.name === name)) return;

    api[name] = allSections[id] as any;
    sections[id] = allSections[id];

    if (sections.length === 1) {
      setActiveSection(name);
    }

    const sectionButton = document.querySelector<HTMLElement>(
      '#sidebar-buttons [data-section="' + name + '"]',
    );
    if (sectionButton) {
      sectionButton.classList.remove('hidden');
    }
    updateConfig();
  };

  const destroy = () => {
    sidebarButtons.innerHTML = '';
    sidebarContent.innerHTML = '';

    sections.forEach((section) => section.destroy?.());
  };

  await load();

  const api: Sidebar = {
    load,
    open,
    close,
    hide: () => setHidden(true),
    getStatus: () => status ?? '',
    getActiveSection: () => activeSection ?? 'files',
    setActiveSection,
    disableSection,
    enableSection,
    // files
    ...sectionList.reduce(
      (acc, section, index) => ({ ...acc, [section.name]: sections[index] }),
      {},
    ),
    destroy,
  };

  return api;
};

const noop = () => undefined;

export const createFakeSidebar = ({ config }: { config: Config }): Sidebar => ({
  load: async () => undefined,
  open: noop,
  close: noop,
  hide: noop,
  getStatus: () => config.sidebar.status ?? '',
  getActiveSection: () => (config.sidebar.active ?? '') as SidebarSectionName,
  setActiveSection: noop,
  disableSection: noop,
  enableSection: noop,
  destroy: noop,
});
