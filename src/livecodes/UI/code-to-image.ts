/* eslint-disable import/no-internal-modules */
import type { createEventsManager } from '../events';
import type { createModal } from '../modal';
import type { createNotifications } from '../notifications';
import type { CodeEditor, Config, EditorId, EditorOptions, FormatFn, UserConfig } from '../models';
import { codeToImageScreen } from '../html';
import { fonts } from '../editor/fonts';
import { prismThemes } from '../editor/codejar/prism-themes';
import { copyToClipboard, downloadFile, loadScript, loadStylesheet } from '../utils';
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
  baseUrl,
  currentUrl,
  editorId,
  modal,
  notifications,
  eventsManager,
  deps,
}: {
  baseUrl: string;
  currentUrl: string;
  editorId: EditorId;
  modal: ReturnType<typeof createModal>;
  notifications: ReturnType<typeof createNotifications>;
  eventsManager: ReturnType<typeof createEventsManager>;
  deps: {
    getUserConfig: () => UserConfig;
    createEditor: (options: PreviewEditorOptions) => Promise<CodeEditor>;
    getFormatFn: () => Promise<FormatFn>;
    changeSettings: (newConfig: Partial<UserConfig>) => void;
    getShareUrl: (config: Partial<Config>) => Promise<string>;
  };
}) => {
  const userConfig = deps.getUserConfig();

  const div = document.createElement('div');
  div.innerHTML = codeToImageScreen.replace(/{{baseUrl}}/g, baseUrl);
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

    eventsManager.addEventListener(
      codeToImageContainer.querySelector<HTMLElement>('#code-to-img-copy-link'),
      'click',
      (ev) => {
        ev.preventDefault();
        const code = ed.getValue();
        if (copyToClipboard(code)) {
          notifications.success('Code copied to clipboard!');
        } else {
          notifications.error('Failed to copy code to clipboard');
        }
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
        '#4a90e2',
      ],
    });
    Coloris({ el: '#code-to-img-bg2' });
  });
  loadStylesheet(colorisBaseUrl + 'coloris.css');

  const editor = await initializeEditor(editorOptions);

  const windowControls = document.createElement('div');
  windowControls.id = 'code-to-img-window-controls';
  windowControls.innerHTML = `
  <span id="code-to-img-mac" class="window-buttons"><svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle><circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle><circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle></g></svg></span>
  <span id="code-to-img-title" class="window-title" spellcheck="false" contenteditable="true"></span>
  <span id="code-to-img-windows" class="window-buttons"><svg width="58" height="14" viewBox="0 0 58 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 7H11" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"></path><path d="M35 1H25C24.4477 1 24 1.44772 24 2V12C24 12.5523 24.4477 13 25 13H35C35.5523 13 36 12.5523 36 12V2C36 1.44772 35.5523 1 35 1Z" stroke="#878787"></path><path d="M47 2L57 12" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"></path><path d="M47 12L57 2" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
`;
  edirtorContainer.querySelector('pre')?.prepend(windowControls);
  const watermark = backgroundEl.querySelector<HTMLElement>('#code-to-img-watermark')!;

  const updateWatermark = (url: string) => {
    watermark.innerHTML = `
    <img src="${baseUrl}assets/images/livecodes-logo.svg" alt="LiveCodes logo" />
    ${url}
  `;
  };
  updateWatermark(currentUrl);

  const getCodeConfig = (): Partial<Config> => {
    const language = editor.getLanguage();
    return {
      title: windowControls.querySelector('#code-to-img-title')!.textContent || '',
      activeEditor: editorId,
      [editorId]: {
        language,
        content: editor.getValue(),
      },
    };
  };
  let cachedConfig: Partial<Config> | undefined;

  let formData: PreviewEditorOptions;

  const getFormData = () => {
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

    return formData;
  };

  const adjustSize = (formData: PreviewEditorOptions, initialLoad: boolean) => {
    backgroundEl.style.padding = formData.padding + 'px';
    backgroundEl.style.margin = 64 - formData.padding + 'px';
    if (initialLoad) {
      setTimeout(() => {
        // wait till the editor is rendered
        formData.width = (backgroundEl.offsetWidth / backgroundEl.parentElement!.offsetWidth) * 100;
        form[`code-to-img-width`].value = formData.width;
      }, 50);
    } else {
      backgroundEl.style.width = formData.width + '%';
      edirtorContainer.style.width = backgroundEl.offsetWidth - formData.padding * 2 + 'px';
    }
  };
  const updateOptions = async (initialLoad = false) => {
    const formData = getFormData();

    editor.changeSettings(formData as any);

    adjustSize(formData, initialLoad);

    const color1 = formData.bg1 || '#f5f5dc';
    const color2 = formData.bg2 || color1;
    const direction = formData.bgDirection || 'to bottom';
    backgroundEl.style.backgroundImage = `linear-gradient(${direction}, ${color1}, ${color2})`;

    edirtorContainer.style.borderRadius = formData.borderRadius + 'px';
    edirtorContainer.querySelector('pre')!.style.borderRadius = formData.borderRadius + 'px';
    edirtorContainer.querySelector('code')!.style.borderRadius = formData.borderRadius + 'px';

    edirtorContainer.classList.toggle('shadow', Boolean(formData.shadow));

    watermark.hidden = !formData.watermark;
    watermark.classList.toggle('shadow', Boolean(formData.shadow));

    windowControls.style.display = formData.windowStyle === 'none' ? 'none' : 'flex';
    windowControls.querySelector<HTMLElement>('#code-to-img-windows')!.style.visibility =
      formData.windowStyle === 'windows' ? 'visible' : 'hidden';
    windowControls.querySelector<HTMLElement>('#code-to-img-mac')!.style.visibility =
      formData.windowStyle === 'mac' ? 'visible' : 'hidden';

    if (formData.watermark && !cachedConfig) {
      // only first time
      updateShareLink();
    }
  };

  const updateShareLink = async () => {
    const newConfig = getCodeConfig();
    if (formData.watermark && JSON.stringify(cachedConfig) !== JSON.stringify(newConfig)) {
      cachedConfig = newConfig;
      const url = await deps.getShareUrl(newConfig);
      updateWatermark(url);
    }
  };

  eventsManager.addEventListener(form, 'input', () => updateOptions());
  updateOptions(true);

  eventsManager.addEventListener(window, 'resize', () => adjustSize(getFormData(), false));

  const htmlToImagePromise = loadScript(htmlToImageUrl, 'htmlToImage');

  const getImageUrl = async () => {
    const htmlToImage: any = await htmlToImagePromise;
    await updateShareLink();

    const container = backgroundEl;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const scale = formData.scale || 1;

    const methodNames: any = {
      png: 'toPng',
      jpg: 'toJpeg',
      svg: 'toSvg',
    };

    return htmlToImage[methodNames[formData.format] || 'toPng'](container, {
      quality: 1,
      width: width * scale,
      height: height * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        margin: '0',
        width: `${width}px`,
        height: `${height}px`,
      },
    });
  };

  const saveBtn = codeToImageContainer.querySelector<HTMLButtonElement>('#code-to-img-save-btn')!;
  eventsManager.addEventListener(saveBtn, 'click', async () => {
    saveBtn.disabled = true;
    getImageUrl()
      .then((dataUrl: string) => {
        downloadFile(formData.fileName, formData.format || 'png', dataUrl);
      })
      .catch(() => {
        notifications.error('Failed to save image.');
      })
      .finally(() => {
        saveBtn.disabled = false;
      });
  });

  const shareBtn = codeToImageContainer.querySelector<HTMLButtonElement>('#code-to-img-share-btn')!;
  eventsManager.addEventListener(shareBtn, 'click', () => {
    shareBtn.disabled = true;
    getImageUrl()
      .then(async (dataUrl: string) => {
        const blob = await fetch(dataUrl).then((res) => res.blob());
        const data = {
          files: [
            new File([blob], `${formData.fileName}.${formData.format || 'png'}`, {
              type: blob.type,
            }),
          ],
          title: 'LiveCodes Code to Image',
        };
        await navigator.share(data);
      })
      .catch(() => {
        notifications.error('Failed to share image.');
      })
      .finally(() => {
        shareBtn.disabled = false;
      });
  });
};

const presets = [{ bg1: '#823bb9', bg2: '#f4a261', theme: 'doutone-dark' }];
