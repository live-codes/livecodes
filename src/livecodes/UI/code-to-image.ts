/* eslint-disable import/no-internal-modules */
import type { createEventsManager } from '../events';
import type { createModal } from '../modal';
import type { createNotifications } from '../notifications';
import type { CodeEditor, EditorOptions, FormatFn, UserConfig } from '../models';
import { codeToImageScreen } from '../html';
import { fonts } from '../editor/fonts';
import { prismThemes } from '../editor/codejar/prism-themes';
import { downloadFile, loadScript, loadStylesheet } from '../utils';
import { colorisBaseUrl, htmlToImageUrl } from '../vendors';

type PreviewEditorOptions = Pick<
  EditorOptions,
  'container' | 'editorTheme' | 'fontFamily' | 'fontSize' | 'lineNumbers' | 'wordWrap'
> & {
  format: 'png' | 'jpg' | 'svg';
  width: number;
  padding: number;
  borderRadius: number;
  shadow: boolean;
  scale: number;
};

export const createCodeToImageUI = async ({
  modal,
  notifications,
  eventsManager,
  deps,
}: {
  modal: ReturnType<typeof createModal>;
  notifications: ReturnType<typeof createNotifications>;
  eventsManager: ReturnType<typeof createEventsManager>;
  deps: {
    getUserConfig: () => UserConfig;
    createEditor: (options: PreviewEditorOptions) => Promise<CodeEditor>;
    getFormatFn: () => Promise<FormatFn>;
    changeSettings: (newConfig: Partial<UserConfig>) => void;
  };
}) => {
  const userConfig = deps.getUserConfig();

  const div = document.createElement('div');
  div.innerHTML = codeToImageScreen;
  const codeToImageContainer = div.firstChild as HTMLElement;
  modal.show(codeToImageContainer, { isAsync: true, size: 'full' });

  const edirtorContainer = codeToImageContainer.querySelector<HTMLElement>(
    '#code-to-img-preview-container',
  );
  const backgroundEl = codeToImageContainer.querySelector<HTMLElement>(
    '#code-to-img-preview-background',
  )!;

  const form = codeToImageContainer.querySelector<HTMLFormElement>('#code-to-img-form');
  if (!edirtorContainer || !form) return;

  const editorOptions: PreviewEditorOptions = {
    container: edirtorContainer,
    editorTheme: 'dracula',
    fontFamily: 'fira-code',
    fontSize: 14,
    lineNumbers: false,
    wordWrap: true,
    format: 'png',
    width: 70,
    padding: 48,
    borderRadius: 5,
    shadow: true,
    scale: 1,
  };

  const initializeEditor = async (options: PreviewEditorOptions) => {
    const ed = await deps.createEditor(options);
    deps.getFormatFn().then((fn) => {
      setTimeout(() => {
        ed.registerFormatter(fn);
      }, 500);
    });

    eventsManager.addEventListener(
      codeToImageContainer.querySelector<HTMLElement>('#code-to-img-format-link'),
      'click',
      (ev) => {
        ev.preventDefault();
        ed.format();
      },
    );
    return ed;
  };

  const editorThemesSelect = form.querySelector<HTMLSelectElement>('#code-to-img-editorTheme')!;
  prismThemes.forEach((theme) => {
    const option = document.createElement('option');
    option.text = theme.title;
    option.value = theme.name;
    editorThemesSelect.appendChild(option);
  });

  const fontFamilySelect = form.querySelector<HTMLSelectElement>('#code-to-img-fontFamily')!;
  fonts.forEach((font) => {
    const option = document.createElement('option');
    option.text = font.name;
    option.value = font.id;
    fontFamilySelect.appendChild(option);
  });

  Object.keys(editorOptions).forEach((key) => {
    const field = form[`code-to-img-${key}`];
    if (!field) return;
    if (field.type === 'checkbox') {
      field.checked = (editorOptions as any)[key];
    } else {
      field.value = String((editorOptions as any)[key]);
    }
  });

  import(colorisBaseUrl + 'esm/coloris.min.js').then((colorisModule) => {
    const Coloris = colorisModule.default;
    Coloris.init();
    Coloris({
      el: '#code-to-img-bg1',
      parent: '.modal-container',
      swatches: [
        '#264653',
        '#2a9d8f',
        '#e9c46a',
        '#f4a261',
        '#e76f51',
        '#d62828',
        '#023e8a',
        '#0077b6',
        '#0096c7',
        '#00b4d8',
        '#48cae4',
        '#f5f5dc',
      ],
    });
    Coloris({ el: '#code-to-img-bg2' });
  });
  loadStylesheet(colorisBaseUrl + 'coloris.css');

  const editor = await initializeEditor(editorOptions);

  let formData: PreviewEditorOptions;
  const updateOptions = async (initialLoad = false) => {
    formData = Array.from(new FormData(form)).reduce(
      (acc, [name, value]) => ({
        ...acc,
        [name.replace('code-to-img-', '')]:
          value === 'true'
            ? true
            : value === 'false'
            ? false
            : value === ''
            ? undefined
            : !isNaN(Number(value))
            ? Number(value)
            : value,
      }),
      {} as PreviewEditorOptions,
    );

    const booleanFields = ['lineNumbers'];
    booleanFields.forEach((key) => {
      if (!(key in formData)) {
        (formData as any)[key] = false;
      }
    });

    editor.changeSettings(formData as any);

    backgroundEl.style.padding = formData.padding + 'px';
    backgroundEl.style.margin = 64 - formData.padding + 'px';
    if (initialLoad) {
      setTimeout(() => {
        // wait till the editor is rendered
        formData.width = (backgroundEl.offsetWidth / backgroundEl.parentElement!.offsetWidth) * 100;

        form[`code-to-img-width`].value = formData.width;

        edirtorContainer.classList.toggle('shadow', Boolean(formData.shadow));
      }, 50);
    } else {
      const color1 = formData.bg1 || '#f5f5dc';
      const color2 = formData.bg2 || color1;
      const direction = formData.bgDirection || 'to bottom';
      backgroundEl.style.backgroundImage = `linear-gradient(${direction}, ${color1}, ${color2})`;

      backgroundEl.style.width = formData.width + '%';
      edirtorContainer.style.width = backgroundEl.offsetWidth - formData.padding * 2 + 'px';

      backgroundEl.style.borderRadius = formData.borderRadius + 'px';
      edirtorContainer.style.borderRadius = formData.borderRadius + 'px';
      edirtorContainer.querySelector('pre')!.style.borderRadius = formData.borderRadius + 'px';
      edirtorContainer.querySelector('code')!.style.borderRadius = formData.borderRadius + 'px';

      edirtorContainer.classList.toggle('shadow', Boolean(formData.shadow));
    }
  };

  eventsManager.addEventListener(form, 'input', () => updateOptions());
  updateOptions(true);

  const htmlToImagePromise = loadScript(htmlToImageUrl, 'htmlToImage');
  const saveBtn = codeToImageContainer.querySelector<HTMLButtonElement>('#code-to-img-save-btn')!;
  eventsManager.addEventListener(saveBtn, 'click', async () => {
    saveBtn.disabled = true;
    const htmlToImage: any = await htmlToImagePromise;

    const container = backgroundEl;
    const width = container.offsetWidth + formData.padding * 2;
    const height = container.offsetHeight + formData.padding * 2;
    const scale = formData.scale || 1;

    const methodNames: any = {
      png: 'toPng',
      jpg: 'toJpeg',
      svg: 'toSvg',
    };
    htmlToImage[methodNames[formData.format] || 'toPng'](container, {
      quality: 1,
      width: width * scale,
      height: height * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${container.offsetWidth}px`,
        height: `${container.offsetHeight}px`,
      },
    })
      .then(function (dataUrl: string) {
        downloadFile('code-to-image', formData.format || 'png', dataUrl);
      })
      .catch(() => {
        notifications.error('Failed to save image.');
      })
      .finally(() => {
        saveBtn.disabled = false;
      });
  });
};
