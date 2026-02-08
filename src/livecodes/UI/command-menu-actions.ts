import { appLanguages } from '../i18n/app-languages';
import { languageIsEnabled, processorIsEnabled } from '../languages';
import type { Config, INinjaAction, Screen, TemplateName } from '../models';
import { isMac, predefinedValues, stringUnionToArray } from '../utils/utils';
import * as UI from './selectors';

export const getCommandMenuActions = ({
  deps,
}: {
  deps: {
    getConfig: () => Config;
    loadStarterTemplate: (templateName: TemplateName) => Promise<void>;
    changeEditorSettings: (config: Partial<Config>) => void;
    changeLayout: (layout: Config['layout']) => void;
    showScreen: (screen: Screen['screen'], options?: any) => Promise<void>;
  };
}) => {
  const { getConfig, loadStarterTemplate, changeEditorSettings, changeLayout } = deps;
  const config = getConfig();

  const getContent = (content: string) =>
    config.appLanguage && config.appLanguage !== 'en' ? content : undefined;

  const actions: INinjaAction[] = [
    {
      id: 'Show',
      title: window.deps.translateString('commandMenu.show.title', 'Show …'),
      content: getContent('Show …'),
      mdIcon: 'visibility',
      children: [
        {
          id: 'Next Editor',
          title: window.deps.translateString('commandMenu.show.next', 'Show Next Editor'),
          content: getContent('Show Next Editor'),
          hotkey: 'ctrl+alt+ArrowRight',
          mdIcon: 'skip_next',
          handler: () => {
            document.dispatchEvent(
              new KeyboardEvent('keydown', {
                ctrlKey: true,
                altKey: true,
                key: 'ArrowRight',
                code: 'ArrowRight',
              }),
            );
          },
        },
        {
          id: 'Previous Editor',
          title: window.deps.translateString('commandMenu.show.previous', 'Show Previous Editor'),
          content: getContent('Show Previous Editor'),
          hotkey: 'ctrl+alt+ArrowLeft',
          mdIcon: 'skip_previous',
          handler: () => {
            document.dispatchEvent(
              new KeyboardEvent('keydown', {
                ctrlKey: true,
                altKey: true,
                key: 'ArrowLeft',
                code: 'ArrowLeft',
              }),
            );
          },
        },
        {
          id: 'Markup Editor',
          title: window.deps.translateString('commandMenu.show.markup', 'Show Markup Editor'),
          content: getContent('Show Markup Editor'),
          hotkey: 'ctrl+alt+1',
          mdIcon: 'html',
          handler: () => {
            UI.getMarkupEditorTitle()?.click();
          },
        },
        {
          id: 'Style Editor',
          title: window.deps.translateString('commandMenu.show.style', 'Show Style Editor'),
          content: getContent('Show Style Editor'),
          hotkey: 'ctrl+alt+2',
          mdIcon: 'css',
          handler: () => {
            UI.getStyleEditorTitle()?.click();
          },
        },
        {
          id: 'Script Editor',
          title: window.deps.translateString('commandMenu.show.script', 'Show Script Editor'),
          content: getContent('Show Script Editor'),
          hotkey: 'ctrl+alt+3',
          mdIcon: 'javascript',
          handler: () => {
            UI.getScriptEditorTitle()?.click();
          },
        },
        {
          id: 'Toggle Result',
          title: window.deps.translateString('commandMenu.show.result', 'Toggle Result'),
          content: getContent('Toggle Result'),
          hotkey: 'ctrl+alt+R',
          // mdIcon: 'split_scene',
          icon: icons.split_scene,
          handler: () => {
            UI.getResultButton()?.click();
          },
        },
        {
          id: 'Toggle Console',
          title: window.deps.translateString('commandMenu.show.console', 'Toggle Console'),
          content: getContent('Toggle Console'),
          hotkey: 'ctrl+alt+C',
          mdIcon: 'terminal',
          handler: () => {
            UI.getConsoleButton()?.dispatchEvent(new Event('touchstart'));
          },
        },
        {
          id: 'Maximize Console',
          title: window.deps.translateString(
            'commandMenu.show.maximizeConsole',
            'Maximize Console',
          ),
          content: getContent('Maximize Console'),
          hotkey: 'ctrl+alt+C+F',
          mdIcon: 'terminal',
          handler: () => {
            UI.getConsoleButton()?.dispatchEvent(new Event('dblclick'));
          },
        },
        {
          id: 'Toggle Compiled Code',
          title: window.deps.translateString('commandMenu.show.compiled', 'Toggle Compiled Code'),
          content: getContent('Toggle Compiled Code'),
          // mdIcon: 'code_blocks',
          icon: icons.code_blocks,
          handler: () => {
            UI.getCompiledButton()?.dispatchEvent(new Event('touchstart'));
          },
        },
        {
          id: 'Maximize Compiled Code',
          title: window.deps.translateString(
            'commandMenu.show.maximizeCompiled',
            'Maximize Compiled Code',
          ),
          content: getContent('Maximize Compiled Code'),
          icon: icons.code_blocks,
          handler: () => {
            UI.getCompiledButton()?.dispatchEvent(new Event('dblclick'));
          },
        },
        {
          id: 'Toggle Tests',
          title: window.deps.translateString('commandMenu.show.tests', 'Toggle Tests'),
          content: getContent('Toggle Tests'),
          // mdIcon: 'labs',
          icon: icons.labs,
          handler: () => {
            UI.getTestsButton()?.dispatchEvent(new Event('touchstart'));
          },
        },
        {
          id: 'Maximize Tests',
          title: window.deps.translateString('commandMenu.show.maximizeTests', 'Maximize Tests'),
          content: getContent('Maximize Tests'),
          // mdIcon: 'labs',
          icon: icons.labs,
          handler: () => {
            UI.getTestsButton()?.dispatchEvent(new Event('dblclick'));
          },
        },
        {
          id: 'Toggle Result Zoom',
          title: window.deps.translateString('commandMenu.show.zoom', 'Toggle Result Zoom'),
          content: getContent('Toggle Result Zoom'),
          hotkey: 'ctrl+alt+z',
          mdIcon: 'zoom_in',
          handler: () => {
            UI.getZoomButton()?.click();
            return { keepOpen: true };
          },
        },
        {
          id: 'Toggle Full Screen',
          title: window.deps.translateString('commandMenu.show.fullscreen', 'Toggle Full Screen'),
          content: getContent('Toggle Full Screen'),
          hotkey: 'f11',
          mdIcon: 'zoom_out_map',
          handler: () => {
            UI.getFullscreenButton()?.click();
          },
        },
        {
          id: 'Toggle Focus Mode',
          title: window.deps.translateString('commandMenu.show.focusMode', 'Toggle Focus Mode'),
          content: getContent('Toggle Focus Mode'),
          hotkey: 'ctrl+alt+F',
          mdIcon: 'crop_free',
          handler: () => {
            UI.getFocusButton()?.click();
          },
        },
      ],
    },
    {
      id: 'Select Language',
      title: window.deps.translateString('commandMenu.selectLanguage', 'Select Language'),
      content: getContent('Select Language'),
      mdIcon: 'code',
      children: window.deps.languages
        .filter((l) => languageIsEnabled(l.name, getConfig()))
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((lang) => ({
          id: 'Language: ' + lang.title,
          title: lang.longTitle ?? lang.title,
          keywords: [lang.name, lang.title, lang.longTitle, ...lang.extensions].join(', '),
          handler: async () => {
            document
              .querySelector<HTMLAnchorElement>('a[data-editor][data-lang="' + lang.name + '"]')
              ?.click();
          },
        })),
    },
    {
      id: 'Processors',
      title: window.deps.translateString('commandMenu.processors', 'Processors'),
      content: getContent('Processors'),
      // mdIcon: 'manufacturing',
      icon: icons.manufacturing,
      children: window.deps.processors
        .filter((p) => !p.hidden && processorIsEnabled(p.name, getConfig()))
        .map((processor) => ({
          id: 'Processor: ' + processor.title,
          title:
            window.deps.translateString('commandMenu.toggle', 'Toggle: ') +
            (processor.longTitle ?? processor.title),
          content: getContent('Toggle: ' + (processor.longTitle ?? processor.title)),
          keywords: [
            processor.name,
            processor.title,
            processor.longTitle,
            processor.isPostcssPlugin ? 'postcss' : '',
          ].join(' '),
          handler: async () => {
            document
              .querySelector<HTMLAnchorElement>(
                '.processor-item input[data-processor="' + processor.name + '"]',
              )
              ?.dispatchEvent(new Event('click', { bubbles: true }));
          },
        })),
    },
    {
      id: 'Starter Templates',
      title: window.deps.translateString('commandMenu.starterTemplates', 'Starter Templates'),
      content: getContent('Starter Templates'),
      mdIcon: 'library_books',
      children: stringUnionToArray<TemplateName>()(
        'blank',
        'javascript',
        'typescript',
        'react',
        'react-native',
        'vue2',
        'vue',
        'angular',
        'preact',
        'svelte',
        'solid',
        'lit',
        'stencil',
        'mdx',
        'astro',
        'riot',
        'malina',
        'jquery',
        'backbone',
        'knockout',
        'jest',
        'jest-react',
        'bootstrap',
        'tailwindcss',
        'shadcn-ui',
        'daisyui',
        'd3',
        'phaser',
        'coffeescript',
        'livescript',
        'civet',
        'clio',
        'imba',
        'rescript',
        'reason',
        'ocaml',
        'python',
        'python-wasm',
        'r',
        'ruby',
        'ruby-wasm',
        'go',
        'go-wasm',
        'php',
        'php-wasm',
        'cpp',
        'cpp-wasm',
        'java',
        'csharp-wasm',
        'perl',
        'lua',
        'lua-wasm',
        'teal',
        'fennel',
        'julia',
        'scheme',
        'commonlisp',
        'clojurescript',
        'gleam',
        'tcl',
        'markdown',
        'assemblyscript',
        'wat',
        'sql',
        'postgresql',
        'prolog',
        'minizinc',
        'blockly',
        'diagrams',
      ).map((template) => ({
        id: 'Starter template: ' + template,
        title: window.deps.translateString('commandMenu.template', 'Template') + ': ' + template,
        content: getContent('Template: ' + template),
        handler: async () => {
          await loadStarterTemplate(template);
        },
      })),
    },
    {
      id: 'Run',
      title: window.deps.translateString('commandMenu.run', 'Run'),
      content: getContent('Run'),
      hotkey: 'shift+Enter',
      mdIcon: 'play_arrow',
      handler: () => {
        UI.getRunButton()?.click();
      },
    },
    {
      id: 'Share',
      title: window.deps.translateString('menu.share', 'Share …'),
      content: getContent('Share'),
      hotkey: 'ctrl+alt+S',
      mdIcon: 'share',
      handler: () => {
        UI.getShareLink()?.click();
      },
    },
    {
      id: 'New',
      title: window.deps.translateString('menu.new', 'New …'),
      content: getContent('New'),
      hotkey: 'ctrl+alt+N',
      mdIcon: 'note_add',
      handler: () => {
        UI.getNewLink()?.click();
      },
    },
    {
      id: 'Open',
      title: window.deps.translateString('menu.open', 'Open …'),
      content: getContent('Open'),
      hotkey: 'ctrl+O',
      mdIcon: 'file_open',
      handler: () => {
        UI.getOpenLink()?.click();
      },
    },
    {
      id: 'Save',
      title: window.deps.translateString('menu.save', 'Save'),
      content: getContent('Save'),
      hotkey: 'ctrl+S',
      mdIcon: 'save',
      handler: () => {
        UI.getSaveLink()?.click();
      },
    },
    {
      id: 'Save As',
      title: window.deps.translateString('menu.saveAs.heading', 'Save as …'),
      content: getContent('Save as'),
      mdIcon: 'save_as',
      children: [
        {
          id: 'Save as a fork',
          title: window.deps.translateString(
            'commandMenu.saveAsFork',
            'Save as a Fork (New Project)',
          ),
          content: getContent('Save as a Fork (New Project)'),
          hotkey: 'ctrl+shift+S',
          mdIcon: 'save_as',
          handler: () => {
            UI.getForkLink()?.click();
          },
        },
        {
          id: 'Save as a template',
          title: window.deps.translateString('commandMenu.saveAsTemplate', 'Save as a Template'),
          content: getContent('Save as a template'),
          mdIcon: 'library_add',
          handler: async () => {
            UI.getSaveAsTemplateLink()?.click();
          },
        },
      ],
    },
    {
      id: 'Import',
      title: window.deps.translateString('menu.import', 'Import …'),
      content: getContent('Import'),
      hotkey: 'ctrl+alt+I',
      mdIcon: 'upload',
      handler: () => {
        UI.getImportLink()?.click();
      },
    },
    {
      id: 'Export',
      title: window.deps.translateString('menu.export.heading', 'Export'),
      content: getContent('Export'),
      mdIcon: 'download',
      children: [
        {
          id: 'Export as JSON',
          title: window.deps.translateString('menu.export.json', 'Export Project (JSON)'),
          content: getContent('Export Project (JSON)'),
          mdIcon: 'data_object',
          handler: () => {
            UI.getExportJSONLink()?.click();
          },
        },
        {
          id: 'Export as HTML',
          title: window.deps.translateString('menu.export.result', 'Export Result (HTML)'),
          content: getContent('Export Result (HTML)'),
          mdIcon: 'html',
          handler: () => {
            UI.getExportResultLink()?.click();
          },
        },
        {
          id: 'Export as ZIP',
          title: window.deps.translateString('menu.export.src', 'Export Source (ZIP)'),
          content: getContent('Export Source (ZIP)'),
          mdIcon: 'archive',
          handler: () => {
            UI.getExportSourceLink()?.click();
          },
        },
        {
          id: 'Export to GitHub Gist',
          title: window.deps.translateString('menu.export.gist', 'Export to GitHub Gist'),
          content: getContent('Export to GitHub Gist'),
          mdIcon: 'north_east',
          handler: () => {
            UI.getExportGithubGistLink()?.click();
          },
        },
        {
          id: 'Export to Codepen',
          title: window.deps.translateString('menu.export.codepen', 'Edit in CodePen'),
          content: getContent('Export to CodePen'),
          mdIcon: 'north_east',
          handler: () => {
            UI.getExportCodepenLink()?.click();
          },
        },
        {
          id: 'Export to Fiddle',
          title: window.deps.translateString('menu.export.jsfiddle', 'Edit in JSFiddle'),
          content: getContent('Export to JSFiddle'),
          mdIcon: 'north_east',
          handler: () => {
            UI.getExportJsfiddleLink()?.click();
          },
        },
      ],
    },
    {
      id: 'Deploy',
      title: window.deps.translateString('menu.deploy', 'Deploy …'),
      content: getContent('Deploy'),
      mdIcon: 'rocket_launch',
      handler: () => {
        UI.getDeployLink()?.click();
      },
    },
    {
      id: 'Broadcast',
      title: window.deps.translateString('menu.broadcast', 'Broadcast …'),
      content: getContent('Broadcast'),
      mdIcon: 'cell_tower',
      handler: () => {
        UI.getBroadcastLink()?.click();
      },
    },
    {
      id: 'Embed',
      title: window.deps.translateString('menu.embed', 'Embed …'),
      content: getContent('Embed'),
      mdIcon: 'aspect_ratio',
      handler: () => {
        UI.getEmbedLink()?.click();
      },
    },
    {
      id: 'Project Info',
      title: window.deps.translateString('menu.project', 'Project Info …'),
      content: getContent('Project Info'),
      mdIcon: 'info',
      handler: () => {
        UI.getProjectInfoLink()?.click();
      },
    },
    {
      id: 'Custom Settings',
      title: window.deps.translateString('menu.customSettings', 'Custom Settings …'),
      content: getContent('Custom Settings'),
      mdIcon: 'data_object',
      handler: () => {
        UI.getCustomSettingsLink()?.click();
      },
    },
    {
      id: 'External Resources',
      title: window.deps.translateString('menu.resources', 'External Resources …'),
      content: getContent('External Resources'),
      mdIcon: 'file_present',
      handler: () => {
        UI.getExternalResourcesLink()?.click();
      },
    },
    {
      id: 'Assets',
      title: window.deps.translateString('menu.assets', 'Assets …'),
      content: getContent('Assets'),
      mdIcon: 'perm_media',
      handler: () => {
        UI.getAssetsLink()?.click();
      },
    },
    {
      id: 'Code Snippets',
      title: window.deps.translateString('menu.snippets', 'Code Snippets …'),
      content: getContent('Code Snippets'),
      mdIcon: 'text_snippet',
      handler: () => {
        UI.getSnippetsLink()?.click();
      },
    },
    {
      id: 'Backup / Restore',
      title: window.deps.translateString('menu.backup', 'Backup / Restore …'),
      content: getContent('Backup / Restore'),
      // mdIcon: 'deployed_code_update',
      icon: icons.deployed_code_update,
      handler: () => {
        UI.getBackupLink()?.click();
      },
    },
    {
      id: 'Sync',
      title: window.deps.translateString('commandMenu.sync', 'Sync (beta) …'),
      content: getContent('Sync'),
      mdIcon: 'sync',
      handler: () => {
        UI.getBackupLink()?.click();
      },
    },
    {
      id: 'Welcome Screen',
      title: window.deps.translateString('menu.welcome.heading', 'Welcome …'),
      content: getContent('Welcome'),
      mdIcon: 'dashboard',
      handler: () => {
        UI.getWelcomeLink()?.click();
      },
    },
    {
      id: 'Settings',
      title: window.deps.translateString('menu.appSettings.heading', 'Settings'),
      content: getContent('Settings'),
      mdIcon: 'settings',
      children: [
        {
          id: 'Editor Settings',
          title: window.deps.translateString('menu.editorSettings', 'Editor Settings …'),
          content: getContent('Editor Settings'),
          mdIcon: 'settings',
          handler: () => {
            UI.getEditorSettingsLink()?.click();
          },
        },
        // {
        //   id: 'Enable AI Code Assistant',
        //   title: window.deps.translateString('commandMenu.enableAI', 'Enable AI Code Assistant'),
        //   content: getContent('Enable AI Code Assistant'),
        //   mdIcon: 'toggle_on',
        //   handler: () => {
        //     changeEditorSettings({ enableAI: true });
        //   },
        // },
        // {
        //   id: 'Disable AI Code Assistant',
        //   title: window.deps.translateString('commandMenu.disableAI', 'Disable AI Code Assistant'),
        //   content: getContent('Disable AI Code Assistant'),
        //   mdIcon: 'toggle_off',
        //   handler: () => {
        //     changeEditorSettings({ enableAI: false });
        //   },
        // },
        {
          id: 'Enable Auto Update',
          title: window.deps.translateString('commandMenu.enableAutoUpdate', 'Enable Auto Update'),
          content: getContent('Enable Auto Update'),
          keywords: 'autoupdate',
          mdIcon: 'update',
          handler: () => {
            changeMenuSetting('autoupdate', true);
          },
        },
        {
          id: 'Disable Auto Update',
          title: window.deps.translateString(
            'commandMenu.disableAutoUpdate',
            'Disable Auto Update',
          ),
          content: getContent('Disable Auto Update'),
          keywords: 'autoupdate',
          mdIcon: 'update_disabled',
          handler: () => {
            changeMenuSetting('autoupdate', false);
          },
        },
        {
          id: 'Enable Auto Save',
          title: window.deps.translateString('commandMenu.enableAutoSave', 'Enable Auto Save'),
          content: getContent('Enable Auto Save'),
          keywords: 'toggle_on',
          mdIcon: 'label',
          handler: () => {
            changeMenuSetting('autosave', true);
          },
        },
        {
          id: 'Disable Auto Save',
          title: window.deps.translateString('commandMenu.disableAutoSave', 'Disable Auto Save'),
          content: getContent('Disable Auto Save'),
          keywords: 'autosave',
          mdIcon: 'label_off',
          handler: () => {
            changeMenuSetting('autosave', false);
          },
        },
        {
          id: 'Enable Format On-Save',
          title: window.deps.translateString(
            'commandMenu.enableFormatOnSave',
            'Enable Format On-Save',
          ),
          content: getContent('Enable Format On-Save'),
          keywords: 'onsave',
          mdIcon: 'format_align_left',
          handler: () => {
            changeMenuSetting('formatOnsave', true);
          },
        },
        {
          id: 'Disable Format On-Save',
          title: window.deps.translateString(
            'commandMenu.disableFormatOnSave',
            'Disable Format On-Save',
          ),
          content: getContent('Disable Format On-Save'),
          keywords: 'onsave',
          mdIcon: 'filter_list_off',
          handler: () => {
            changeMenuSetting('formatOnsave', false);
          },
        },
        {
          id: 'Enable Recover Unsaved',
          title: window.deps.translateString(
            'commandMenu.enableRecoverUnsaved',
            'Enable Recover Unsaved',
          ),
          content: getContent('Enable Recover Unsaved'),
          mdIcon: 'update',
          handler: () => {
            changeMenuSetting('recoverUnsaved', true);
          },
        },
        {
          id: 'Disable Recover Unsaved',
          title: window.deps.translateString(
            'commandMenu.disableRecoverUnsaved',
            'Disable Recover Unsaved',
          ),
          content: getContent('Disable Recover Unsaved'),
          mdIcon: 'update_disabled',
          handler: () => {
            changeMenuSetting('recoverUnsaved', false);
          },
        },
        {
          id: 'Enable Vim Mode',
          title: window.deps.translateString('commandMenu.enableVim', 'Enable Vim Mode'),
          content: getContent('Enable Vim Mode'),
          mdIcon: 'edit',
          handler: () => {
            changeEditorSettings({ editorMode: 'vim' });
          },
        },
        {
          id: 'Disable Vim Mode',
          title: window.deps.translateString('commandMenu.disableVim', 'Disable Vim Mode'),
          content: getContent('Disable Vim Mode'),
          mdIcon: 'edit_off',
          handler: () => {
            changeEditorSettings({ editorMode: undefined });
          },
        },
        {
          id: 'Enable Emacs Mode',
          title: window.deps.translateString('commandMenu.enableEmacs', 'Enable Emacs Mode'),
          content: getContent('Enable Emacs Mode'),
          mdIcon: 'edit',
          handler: () => {
            changeEditorSettings({ editorMode: 'emacs' });
          },
        },
        {
          id: 'Disable Emacs Mode',
          title: window.deps.translateString('commandMenu.disableEmacs', 'Disable Emacs Mode'),
          content: getContent('Disable Emacs Mode'),
          mdIcon: 'edit_off',
          handler: () => {
            changeEditorSettings({ editorMode: undefined });
          },
        },
        {
          id: 'Responsive Layout',
          title: window.deps.translateString('commandMenu.responsiveLayout', 'Responsive Layout'),
          content: getContent('Responsive Layout'),
          // mdIcon: 'responsive_layout',
          icon: icons.responsive_layout,
          handler: () => {
            changeLayout('responsive');
          },
        },
        {
          id: 'Vertical Layout',
          title: window.deps.translateString('commandMenu.verticalLayout', 'Vertical Layout'),
          content: getContent('Vertical Layout'),
          mdIcon: 'stay_current_portrait',
          handler: () => {
            changeLayout('vertical');
          },
        },
        {
          id: 'Horizontal Layout',
          title: window.deps.translateString('commandMenu.horizontalLayout', 'Horizontal Layout'),
          content: getContent('Horizontal Layout'),
          mdIcon: 'stay_current_landscape',
          handler: () => {
            changeLayout('horizontal');
          },
        },
      ],
    },
    {
      id: 'Format Code',
      title: window.deps.translateString('commandMenu.formatCode', 'Format Code'),
      content: getContent('Format Code'),
      hotkey: 'shift+alt+f',
      mdIcon: 'format_align_left',
      handler: () => {
        UI.getFormatButton()?.click();
      },
    },
    {
      id: 'Copy Code',
      title: window.deps.translateString('commandMenu.copy', 'Copy Code'),
      content: getContent('Copy Code'),
      mdIcon: 'content_copy',
      handler: () => {
        UI.getCopyButton()?.click();
      },
    },
    {
      id: 'Copy Code as Data URL',
      title: window.deps.translateString('commandMenu.copyAsDataUrl', 'Copy Code as Data URL'),
      content: getContent('Copy Code as Data URL'),
      keywords: 'base64',
      mdIcon: 'dataset_linked',
      handler: () => {
        UI.getCopyAsUrlButton()?.click();
      },
    },
    {
      id: 'Code to Image',
      title: window.deps.translateString('app.codeToImage.hint', 'Code to Image'),
      content: getContent('Code to Image'),
      keywords: 'picture screenshot',
      mdIcon: 'camera',
      handler: () => {
        UI.getCodeToImageButton()?.click();
      },
    },
    {
      id: 'Run Tests',
      title: window.deps.translateString('commandMenu.show.runTests', 'Run Tests'),
      content: getContent('Run Tests'),
      hotkey: 'ctrl+alt+T',
      // mdIcon: 'labs',
      icon: icons.labs,
      handler: async () => {
        UI.getRunTestsButton()?.click();
      },
    },
    {
      id: 'Show result in new window',
      title: window.deps.translateString('core.result.hint', 'Show result in new window'),
      content: getContent('Show result in new window'),
      keywords: 'popup',
      mdIcon: 'open_in_new',
      handler: () => {
        UI.getResultPopupButton()?.click();
      },
    },
    {
      id: 'Focus Editor',
      title: window.deps.translateString('commandMenu.focus.editor', 'Focus Editor'),
      content: getContent('Focus Editor'),
      hotkey: 'ctrl+alt+e',
      mdIcon: 'filter_center_focus',
      handler: () => {
        document.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'E', code: 'KeyE', ctrlKey: true, altKey: true }),
        );
      },
    },
    {
      id: 'Move Focus out of Editor',
      title: window.deps.translateString(
        'commandMenu.focus.outOfEditor',
        'Move Focus out of Editor',
      ),
      content: getContent('Move Focus out of Editor'),
      hotkey: 'esc+esc',
      // mdIcon: 'reset_focus',
      icon: icons.reset_focus,
      handler: () => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape' }));
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape' }));
      },
    },
    {
      id: 'Move Focus to Home',
      title: window.deps.translateString('commandMenu.focus.home', 'Move Focus to Home'),
      content: getContent('Move Focus to Home'),
      hotkey: 'esc+esc+esc',
      // mdIcon: 'pip_exit',
      icon: icons.pip_exit,
      handler: () => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape' }));
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape' }));
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape' }));
      },
    },
    {
      id: 'Change UI Language',
      title: window.deps.translateString('commandMenu.changeUILanguage', 'Change UI Language'),
      content: getContent('Change UI Language'),
      mdIcon: 'language',
      children: Object.entries(appLanguages).map(([key, lang]) => ({
        id: 'UI Language: ' + key,
        title: lang,
        keywords: key,
        matcher: (
          _action: INinjaAction,
          { searchString }: { searchString: string; searchRegex: RegExp },
        ) => key.includes(searchString.toLowerCase()) || lang.includes(searchString),
        handler: async () => {
          document
            .querySelector<HTMLAnchorElement>('#app-menu-i18n a[data-lang="' + key + '"]')
            ?.click();
        },
      })),
    },
    {
      id: 'Change Theme',
      title: window.deps.translateString('commandMenu.changeTheme.title', 'Change Theme'),
      content: getContent('Change Theme'),
      mdIcon: 'palette',
      children: [
        {
          id: 'Light Theme',
          title: window.deps.translateString(
            'commandMenu.changeTheme.light',
            'Change to Light Theme',
          ),
          content: getContent('Change to Light Theme'),
          mdIcon: 'light_mode',
          handler: () => {
            UI.getDarkThemeButton()?.click();
            return { keepOpen: true };
          },
        },
        {
          id: 'Dark Theme',
          title: window.deps.translateString(
            'commandMenu.changeTheme.dark',
            'Change to Dark Theme',
          ),
          content: getContent('Change to Dark Theme'),
          mdIcon: 'dark_mode',
          handler: () => {
            UI.getLightThemeButton()?.click();
            return { keepOpen: true };
          },
        },
        {
          id: 'Set Theme Color',
          title: window.deps.translateString('commandMenu.theme.color', 'Set Theme Color'),
          content: getContent('Set Theme Color'),
          mdIcon: 'palette',
          handler: () => {
            UI.getCustomThemeColorInput()?.click();
          },
        },
        {
          id: 'Set Default Theme Color',
          title: window.deps.translateString(
            'commandMenu.theme.defaultColor',
            'Set Default Theme Color',
          ),
          content: getContent('Set Default Theme Color'),
          mdIcon: 'palette',
          handler: () => {
            UI.getThemeColorContainer()?.querySelector('input')?.click();
          },
        },
        {
          id: 'editor theme',
          title: window.deps.translateString('editorSettings.editorTheme', 'Editor Theme'),
          content: getContent('Editor Theme'),
          mdIcon: 'palette',
          handler: () => {
            deps.showScreen('editor-settings', {
              scrollToSelector: ':has(+ label[data-name^="editorTheme"])',
            });
          },
        },
      ],
    },
    {
      id: 'Documentation',
      title: window.deps.translateString('menu.docs', 'Documentation'),
      content: getContent('Documentation'),
      mdIcon: 'menu_book',
      children: [
        {
          id: 'Documentation Home',
          title: window.deps.translateString('menu.docs', 'Documentation'),
          content: getContent('Documentation'),
          mdIcon: 'menu_book',
          handler: () => {
            UI.getHelpMenu()?.querySelector<HTMLAnchorElement>('a[data-i18n="menu.docs"]')?.click();
            return { keepOpen: true };
          },
        },
        {
          id: 'Getting Started',
          title: window.deps.translateString('menu.getstart', 'Getting Started'),
          content: getContent('Getting Started'),
          mdIcon: 'start',
          handler: () => {
            UI.getHelpMenu()
              ?.querySelector<HTMLAnchorElement>('a[data-i18n="menu.getstart"]')
              ?.click();
            return { keepOpen: true };
          },
        },
        {
          id: 'Features',
          title: window.deps.translateString('menu.features', 'Features'),
          content: getContent('Features'),
          mdIcon: 'widgets',
          handler: () => {
            UI.getHelpMenu()
              ?.querySelector<HTMLAnchorElement>('a[data-i18n="menu.features"]')
              ?.click();
            return { keepOpen: true };
          },
        },
        {
          id: 'Configuration',
          title: window.deps.translateString('menu.config', 'Configuration'),
          content: getContent('Configuration'),
          mdIcon: 'tune',
          handler: () => {
            UI.getHelpMenu()
              ?.querySelector<HTMLAnchorElement>('a[data-i18n="menu.config"]')
              ?.click();
            return { keepOpen: true };
          },
        },
        {
          id: 'SDK',
          title: window.deps.translateString('menu.sdk', 'SDK'),
          content: getContent('SDK'),
          // mdIcon: 'deployed_code',
          icon: icons.deployed_code,
          handler: () => {
            UI.getHelpMenu()?.querySelector<HTMLAnchorElement>('a[data-i18n="menu.sdk"]')?.click();
            return { keepOpen: true };
          },
        },
        {
          id: 'LiveCodes Blog',
          title: window.deps.translateString('menu.blog', 'LiveCodes Blog'),
          content: getContent('LiveCodes Blog'),
          mdIcon: 'newspaper',
          handler: () => {
            UI.getHelpMenu()?.querySelector<HTMLAnchorElement>('a[data-i18n="menu.blog"]')?.click();
            return { keepOpen: true };
          },
        },
      ],
    },
    {
      id: 'Contribute',
      title: window.deps.translateString('commandMenu.contribute', 'Contribute'),
      content: getContent('Contribute'),
      mdIcon: 'construction',
      children: [
        {
          id: 'Source code on GitHub',
          title: window.deps.translateString('menu.source', 'Source code on GitHub'),
          content: getContent('Source code on GitHub'),
          mdIcon: 'star',
          handler: () => {
            UI.getHelpMenu()
              ?.querySelector<HTMLAnchorElement>('a[data-i18n="menu.source"]')
              ?.click();
            return { keepOpen: true };
          },
        },
        {
          id: 'Report an issue',
          title: window.deps.translateString('menu.report', 'Report an issue'),
          content: getContent('Report an issue'),
          mdIcon: 'bug_report',
          handler: () => {
            UI.getHelpMenu()
              ?.querySelector<HTMLAnchorElement>('a[data-i18n="menu.report"]')
              ?.click();
            return { keepOpen: true };
          },
        },
        {
          id: 'License',
          title: window.deps.translateString('menu.license', 'License'),
          content: getContent('License'),
          mdIcon: 'receipt_long',
          handler: () => {
            UI.getHelpMenu()
              ?.querySelector<HTMLAnchorElement>('a[data-i18n="menu.license"]')
              ?.click();
            return { keepOpen: true };
          },
        },
        {
          id: 'Sponsor',
          title: window.deps.translateString('about.sponsor.text', 'Sponsor'),
          content: getContent('Sponsor'),
          mdIcon: 'handshake',
          handler: () => {
            window.open(predefinedValues.DOCS_BASE_URL + 'sponsor', '_blank');
            return { keepOpen: true };
          },
        },
      ],
    },
  ];

  const loginAction: INinjaAction = {
    id: 'Login',
    title: window.deps.translateString('commandMenu.login', 'Login'),
    content: getContent('Login'),
    mdIcon: 'login',
    handler: () => {
      UI.getLoginLink()?.click();
    },
  };

  const logoutAction: INinjaAction = {
    id: 'Logout',
    title: window.deps.translateString('commandMenu.logout', 'Logout'),
    content: getContent('Logout'),
    mdIcon: 'logout',
    handler: () => {
      UI.getLogoutLink()?.click();
    },
  };

  const keyboardShortcutsAction: INinjaAction = {
    id: 'Keyboard',
    title: window.deps.translateString('commandMenu.keyboardShortcuts', 'Keyboard Shortcuts'),
    content: getContent('Keyboard Shortcuts'),
    mdIcon: 'keyboard',
    handler: () => {
      UI.getKeyboardShortcutsMenuLink()?.click();
    },
  };

  const aboutAction: INinjaAction = {
    id: 'About',
    title: window.deps.translateString('menu.about', 'About ...'),
    content: getContent('About'),
    mdIcon: 'contact_support',
    handler: () => {
      UI.getAboutLink()?.click();
    },
  };

  const changeMenuSetting = (setting: keyof Config, checked: boolean) => {
    const toggle = [...UI.getSettingToggles()].find((t) => t.dataset.config === setting);
    if (toggle) {
      toggle.checked = checked;
      toggle.dispatchEvent(new Event('change'));
    }
  };

  const isActionList = (list: INinjaAction[] | string[] | undefined): list is INinjaAction[] =>
    Boolean(list?.every((a) => typeof a !== 'string'));

  const traverseMenu = (
    data: INinjaAction[],
    transform: (action: INinjaAction) => INinjaAction,
  ): INinjaAction[] =>
    data.map((action) => ({
      ...transform(action),
      children: isActionList(action.children)
        ? traverseMenu(action.children, transform)
        : action.children,
    }));

  const transformAction = (action: INinjaAction): INinjaAction => ({
    ...action,
    title: !action.children?.length
      ? action.title.replace(' …', '').replace(' ...', '')
      : action.title.endsWith(' …') || action.title.endsWith(' ...')
        ? action.title
        : action.title + ' …',
    hotkey: isMac() ? action.hotkey?.replace(/ctrl/g, '⌘') : action.hotkey,
  });

  const flatten = (list: INinjaAction[]): INinjaAction[] =>
    list.flatMap((a) => [a, ...(isActionList(a.children) ? flatten(a.children) : [])]);

  const getKeyboardShortcutList = (list: INinjaAction[]) =>
    flatten(list).filter((a) => a.hotkey != null);

  const keyboardShortcuts: INinjaAction[] = [
    {
      id: 'Command Menu',
      title: window.deps.translateString('commandMenu.title', 'Command Menu'),
      content: getContent('Command Menu'),
      hotkey: 'ctrl+k',
      mdIcon: 'home',
      handler: () => {
        UI.getCommandMenuLink()?.click();
      },
    },
    ...getKeyboardShortcutList(actions),
    {
      id: 'Toggle Tab Focus Mode',
      title: window.deps.translateString(
        'commandMenu.focus.toggleTabFocusMode',
        'Toggle Tab Focus Mode',
      ),
      content: getContent('Toggle Tab Focus Mode'),
      hotkey: 'ctrl+m',
      mdIcon: 'cancel',
      handler: () => {
        window.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'M', code: 'KeyM', ctrlKey: true }),
        );
      },
    },
    {
      id: 'Close Modal/Menu',
      title: window.deps.translateString('commandMenu.closeModalMenu', 'Close Modal/Menu'),
      content: getContent('Close Modal/Menu'),
      hotkey: 'esc',
      mdIcon: 'cancel',
      handler: () => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      },
    },
  ];

  return {
    actions: traverseMenu([...actions, keyboardShortcutsAction, aboutAction], transformAction),
    keyboardShortcuts: traverseMenu(keyboardShortcuts, transformAction).map((item) => ({
      title: item.title,
      hotkey: item.hotkey || '',
    })),
    loginAction,
    logoutAction,
  };
};

const icons = {
  split_scene: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h200v80H160v480h200v80H160Zm280 80v-800h80v80h280q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H520v80h-80Zm80-160h280v-480H520v480Zm-360 0v-480 480Zm640 0v-480 480Z"/></svg>`,
  code_blocks: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="m384-336 56-57-87-87 87-87-56-57-144 144 144 144Zm192 0 144-144-144-144-56 57 87 87-87 87 56 57ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>`,
  labs: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M480-80q-83 0-141.5-58.5T280-280v-360q-33 0-56.5-23.5T200-720v-80q0-33 23.5-56.5T280-880h400q33 0 56.5 23.5T760-800v80q0 33-23.5 56.5T680-640v360q0 83-58.5 141.5T480-80ZM280-720h400v-80H280v80Zm200 560q50 0 85-35t35-85H480v-80h120v-80H480v-80h120v-120H360v360q0 50 35 85t85 35ZM280-720v-80 80Z"/></svg>`,
  deployed_code_update: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="m720-80 120-120-28-28-72 72v-164h-40v164l-72-72-28 28L720-80ZM480-800 243-663l237 137 237-137-237-137ZM120-321v-318q0-22 10.5-40t29.5-29l280-161q10-5 19.5-8t20.5-3q11 0 21 3t19 8l280 161q19 11 29.5 29t10.5 40v159h-80v-116L479-434 200-596v274l240 139v92L160-252q-19-11-29.5-29T120-321ZM720 0q-83 0-141.5-58.5T520-200q0-83 58.5-141.5T720-400q83 0 141.5 58.5T920-200q0 83-58.5 141.5T720 0ZM480-491Z"/></svg>`,
  reset_focus: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M480-320v-100q0-25 17.5-42.5T540-480h100v60H540v100h-60Zm60 240q-25 0-42.5-17.5T480-140v-100h60v100h100v60H540Zm280-240v-100H720v-60h100q25 0 42.5 17.5T880-420v100h-60ZM720-80v-60h100v-100h60v100q0 25-17.5 42.5T820-80H720Zm111-480h-83q-26-88-99-144t-169-56q-117 0-198.5 81.5T200-480q0 72 32.5 132t87.5 98v-110h80v240H160v-80h94q-62-50-98-122.5T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q129 0 226.5 79.5T831-560Z"/></svg>`,
  pip_exit: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M160-160q-33 0-56.5-23.5T80-240v-280h80v280h640v-480H440v-80h360q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm523-140 57-57-124-123h104v-80H480v240h80v-103l123 123ZM80-600v-200h280v200H80Zm400 120Z"/></svg>`,
  responsive_layout: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M120-120v-520h200v-200h520v720H120Zm520-80h120v-560H400v120h240v440Zm-240 0h160v-360H400v360Zm-200 0h120v-360H200v360Zm440-440v80-80Zm-320 80Zm240 0Zm80-80Z"/></svg>`,
  deployed_code: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Zm320-228Z"/></svg>`,
  manufacturing: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="m234-480-12-60q-12-5-22.5-10.5T178-564l-58 18-40-68 46-40q-2-13-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T222-820l12-60h80l12 60q12 5 22.5 10.5T370-796l58-18 40 68-46 40q2 13 2 26t-2 26l46 40-40 68-58-18q-11 8-21.5 13.5T326-540l-12 60h-80Zm40-120q33 0 56.5-23.5T354-680q0-33-23.5-56.5T274-760q-33 0-56.5 23.5T194-680q0 33 23.5 56.5T274-600ZM592-40l-18-84q-17-6-31.5-14.5T514-158l-80 26-56-96 64-56q-2-18-2-36t2-36l-64-56 56-96 80 26q14-11 28.5-19.5T574-516l18-84h112l18 84q17 6 31.5 14.5T782-482l80-26 56 96-64 56q2 18 2 36t-2 36l64 56-56 96-80-26q-14 11-28.5 19.5T722-124l-18 84H592Zm56-160q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/></svg>`,
};
