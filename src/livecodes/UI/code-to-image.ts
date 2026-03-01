import { prismThemes } from '../editor/codejar/prism-themes';
import { fonts } from '../editor/fonts';
import { codeToImageScreen } from '../html';
import type {
  CodeEditor,
  CodejarTheme,
  EditorId,
  EditorOptions,
  EventsManager,
  FormatFn,
  Modal,
  Notifications,
  SDKConfig,
} from '../models';
import {
  colorToRgba,
  copyImage,
  copyToClipboard,
  debounce,
  downloadFile,
  loadScript,
  loadStylesheet,
} from '../utils';
import { colorisBaseUrl, htmlToImageUrl, metaPngUrl } from '../vendors';

type PreviewEditorOptions = Pick<
  EditorOptions,
  'container' | 'editorTheme' | 'fontFamily' | 'fontSize' | 'lineNumbers' | 'wordWrap'
>;

type Preset = PreviewEditorOptions & {
  id: string;
  format: 'png' | 'jpg' | 'svg';
  bg1: string;
  bg2: string;
  bgDirection: `to ${'top' | 'bottom' | 'left' | 'right' | 'top right' | 'top left' | 'bottom right' | 'bottom left'}`;
  opacity: number | undefined;
  width: number;
  padding: number;
  borderRadius: number;
  shadow: boolean;
  watermark: boolean;
  windowStyle: 'mac' | 'windows' | 'none';
  scale: number;
  fileName: string;
  editorTheme: CodejarTheme;
};

const getEditorOptions = (options: Preset): PreviewEditorOptions => ({
  container: options.container,
  editorTheme: options.editorTheme,
  fontFamily: options.fontFamily,
  fontSize: options.fontSize,
  lineNumbers: options.lineNumbers,
  wordWrap: options.wordWrap,
});

export const createCodeToImageUI = async ({
  baseUrl,
  currentUrl,
  fileName,
  editorId,
  modal,
  notifications,
  eventsManager,
  deps,
}: {
  baseUrl: string;
  currentUrl: string;
  fileName: string;
  editorId: EditorId;
  modal: Modal;
  notifications: Notifications;
  eventsManager: EventsManager;
  deps: {
    createEditor: (options: PreviewEditorOptions) => Promise<CodeEditor>;
    getFormatFn: () => Promise<FormatFn>;
    getShareUrl: (config: Partial<SDKConfig>, shortUrl?: boolean) => Promise<string>;
    getSavedPreset: () => Partial<Preset> | undefined;
    savePreset: (preset: Partial<Preset>) => void;
  };
}) => {
  const div = document.createElement('div');
  div.innerHTML = codeToImageScreen.replace(/{{baseUrl}}/g, baseUrl);
  const codeToImageContainer = div.firstChild as HTMLElement;

  const edirtorContainer = codeToImageContainer.querySelector<HTMLElement>(
    '#code-to-img-preview-container',
  );
  const backgroundEl = codeToImageContainer.querySelector<HTMLElement>(
    '#code-to-img-preview-background',
  )!;

  const form = codeToImageContainer.querySelector<HTMLFormElement>('#code-to-img-form');
  if (!edirtorContainer || !form) return;
  const presetsContainer = form.querySelector('#presets-container')!;

  const defaultPreset: Preset = {
    id: 'default',
    container: edirtorContainer,
    bg1: '#f5f5dc',
    bg2: '',
    bgDirection: 'to bottom right',
    opacity: 0.9,
    windowStyle: 'none',
    watermark: false,
    editorTheme: 'dracula',
    fontFamily: 'fira-code',
    fontSize: 14,
    lineNumbers: false,
    wordWrap: true,
    borderRadius: 5,
    shadow: true,
    width: 70,
    padding: 48,
    format: 'png',
    scale: 1,
    fileName,
  };

  const selectPreset = (id: string) => {
    presetsContainer.querySelectorAll<HTMLElement>('.preset').forEach((p) => {
      if (p.dataset.id === id) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  };

  const updateCustomPreset = (id: string) => {
    const preset = getFormData();
    const customPreset = presets.find((preset) => preset.id === 'custom');
    if (!customPreset) return;
    (Object.keys(preset) as Array<keyof Preset>)
      .filter((key) => key !== 'id')
      .forEach((key) => {
        (customPreset as any)[key] = preset[key];
      });

    if (id === 'custom') {
      deps.savePreset(customPreset);
    } else {
      deps.savePreset({ id });
    }
  };

  const applyPreset = (preset: Partial<Preset>) => {
    const fullPreset: Preset = {
      ...defaultPreset,
      ...preset,
    };
    const excludedKeys = ['container', 'width', 'fileName'];
    const keys = Object.keys(fullPreset) as Array<keyof Preset>;
    keys
      .filter((key) => !excludedKeys.includes(key) && form[`code-to-img-${key}`] != null)
      .forEach((key) => {
        const field = form[`code-to-img-${key}`];
        if (field.type === 'checkbox') {
          field.checked = fullPreset[key];
        } else {
          field.value = String(fullPreset[key]);
        }
        if (key === 'bg1' || key === 'bg2') {
          // update coloris thumbnail color

          // for some reason this event bubbling prevents editor auto-sizing
          // field.dispatchEvent(new Event('input', { bubbles: true }));

          // so manually setting it
          const parent = field.parentNode;
          if (parent.classList.contains('clr-field')) {
            parent.style.color = field.value;
          }
        }
        if (key === 'opacity' && fullPreset.opacity == null) {
          field.value = '1';
        }
      });
    updateOptions(/* reset = */ true);

    selectPreset(fullPreset.id);
  };

  const populatePresets = () => {
    presets.forEach((preset) => {
      const presetBtn = document.createElement('btn');
      presetBtn.classList.add('preset');
      presetBtn.dataset.id = preset.id;
      if (preset.id === 'custom') {
        presetBtn.textContent = window.deps.translateString('generic.custom', 'Custom');
      } else {
        const img = document.createElement('img');
        img.src = `${baseUrl}assets/code-to-img/${preset.id}.jpg`;
        presetBtn.appendChild(img);
      }
      presetBtn.addEventListener('click', () => {
        applyPreset(preset);
        updateCustomPreset(preset.id);
      });
      presetBtn.tabIndex = 0;
      eventsManager.addEventListener(presetBtn, 'keydown', (ev: KeyboardEvent) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          presetBtn.click();
        }
      });
      presetsContainer.appendChild(presetBtn);
    });
  };
  populatePresets();
  modal.show(codeToImageContainer, { isAsync: true, size: 'full' });

  const initializeEditor = async (options: Preset) => {
    const ed = await deps.createEditor(getEditorOptions(options));
    if (ed.getValue().trim() === '') {
      editorId = 'script';
      ed.setLanguage('tsx', defaultCode);
    }
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

  Object.keys(defaultPreset).forEach((key) => {
    const field = form[`code-to-img-${key}`];
    if (!field) return;
    if (field.type === 'checkbox') {
      field.checked = (defaultPreset as any)[key];
    } else {
      field.value = String((defaultPreset as any)[key]);
    }
  });

  import(colorisBaseUrl + 'esm/coloris.min.js').then((colorisModule) => {
    const Coloris = colorisModule.default;
    Coloris.init();
    Coloris({
      el: '#code-to-img-bg1',
      parent: '.modal-screen-container',
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

  const editor = await initializeEditor(defaultPreset);

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

  const getCodeConfig = (): Partial<SDKConfig> => ({
    title: windowControls.querySelector('#code-to-img-title')!.textContent || '',
    activeEditor: editorId,
    [editorId]: {
      language: editor.getLanguage(),
      content: editor.getValue(),
    },
  });
  let cachedConfig: Partial<SDKConfig> | undefined;

  let formData: Preset;

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
      {} as Preset,
    );

    const booleanFields = ['lineNumbers', 'wordWrap', 'shadow', 'watermark'];
    booleanFields.forEach((key) => {
      if (!(key in formData)) {
        (formData as any)[key] = false;
      }
    });

    return formData;
  };

  const adjustSize = (formData: Preset, initialLoad: boolean) => {
    backgroundEl.style.padding = formData.padding + 'px';
    backgroundEl.style.margin = 64 - formData.padding + 'px';
    if (initialLoad) {
      setTimeout(() => {
        // wait till the editor is rendered
        formData.width = (backgroundEl.offsetWidth / backgroundEl.parentElement!.offsetWidth) * 100;
        form[`code-to-img-width`].value = formData.width;
      }, 150);
    } else {
      const color1 = formData.bg1 || '#f5f5dc';
      const color2 = formData.bg2 || color1;
      const direction = formData.bgDirection || 'to bottom';
      backgroundEl.style.backgroundImage = `linear-gradient(${direction}, ${color1}, ${color2})`;

      backgroundEl.style.width = formData.width + '%';
      edirtorContainer.style.width = backgroundEl.offsetWidth - formData.padding * 2 + 'px';
    }
  };

  const updateOptions = async (reset = false) => {
    const formData = getFormData();
    editor.changeSettings(formData as any);
    adjustSize(formData, reset);

    const color1 = formData.bg1 || '#f5f5dc';
    const color2 = formData.bg2 || color1;
    const direction = formData.bgDirection || 'to bottom';
    backgroundEl.style.backgroundImage = `linear-gradient(${direction}, ${color1}, ${color2})`;

    edirtorContainer.style.borderRadius = formData.borderRadius + 'px';
    edirtorContainer.querySelector('pre')!.style.borderRadius = formData.borderRadius + 'px';
    edirtorContainer.querySelector('code')!.style.borderRadius = formData.borderRadius + 'px';

    const editorBackground = edirtorContainer.querySelector<HTMLElement>('pre')!;
    const editorCode = edirtorContainer.querySelector<HTMLElement>('code')!;

    const applyOpacity = () => {
      editorBackground.style.background = '';
      editorCode.style.background = '';
      if (formData.opacity === 1) return;

      const { r, g, b } = colorToRgba(getComputedStyle(editorBackground).backgroundColor);
      editorBackground.style.background = `rgba(${r}, ${g}, ${b}, ${formData.opacity})`;
      editorCode.style.background = `rgba(${r}, ${g}, ${b}, 0)`;
    };

    // wait till the theme styles are applied
    setTimeout(applyOpacity, 50);
    setTimeout(applyOpacity, 200);
    setTimeout(applyOpacity, 500);
    setTimeout(applyOpacity, 1000);
    setTimeout(applyOpacity, 2000);

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
      const url = await deps.getShareUrl(newConfig, /* shortUrl = */ true);
      updateWatermark(url);
    }
  };

  const debouncedUpdateOptions = debounce(updateOptions, 500);
  eventsManager.addEventListener(form, 'input', (e: any) => {
    if (e?.target?.id === 'code-to-img-editorTheme') {
      form['code-to-img-opacity'].value = '1';
    }
    if (e?.target?.id === 'code-to-img-opacity') {
      debouncedUpdateOptions();
    } else {
      updateOptions();
    }
    if (!['fileName', 'width'].map((n) => 'code-to-img-' + n).includes(e?.target?.name)) {
      updateCustomPreset('custom');
      selectPreset('custom');
    }
  });
  updateOptions(/* reset = */ true);

  eventsManager.addEventListener(window, 'resize', () => adjustSize(getFormData(), true));

  const htmlToImagePromise = loadScript(htmlToImageUrl, 'htmlToImage');
  const metaPngPromise = loadScript(metaPngUrl, 'MetaPNG');

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

    let dataUrl = await htmlToImage[methodNames[formData.format] || 'toPng'](container, {
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

    if (formData.format === 'png') {
      try {
        const metaPng: any = await metaPngPromise;
        const newConfig = getCodeConfig();
        let url: string | undefined;
        if (formData.watermark && JSON.stringify(cachedConfig) === JSON.stringify(newConfig)) {
          url = watermark.innerText.trim();
        } else {
          url = await deps.getShareUrl(newConfig, formData.watermark);
        }
        dataUrl = metaPng.addMetadataFromBase64DataURI(dataUrl, 'LiveCodes URL', url);
      } catch {
        // could not add PNG metadata
      }
    }

    return dataUrl;
  };

  const saveBtn = codeToImageContainer.querySelector<HTMLButtonElement>('#code-to-img-save-btn')!;
  eventsManager.addEventListener(saveBtn, 'click', async () => {
    saveBtn.disabled = true;
    saveBtn.classList.add('disabled');
    const btnText = saveBtn.innerText;
    saveBtn.innerText = window.deps.translateString('core.generating', 'Generating...');
    getImageUrl()
      .then((dataUrl: string) => {
        downloadFile(formData.fileName, formData.format || 'png', dataUrl);
      })
      .catch(() => {
        notifications.error(
          window.deps.translateString('core.error.failedToSaveImage', 'Failed to save image'),
        );
      })
      .finally(() => {
        saveBtn.disabled = false;
        saveBtn.classList.remove('disabled');
        saveBtn.innerText = btnText;
      });
  });

  const menu = codeToImageContainer.querySelector<HTMLElement>('#code-to-img-share-menu')!;
  const menuBtn = codeToImageContainer.querySelector<HTMLElement>('#code-to-img-menu-btn')!;
  eventsManager.addEventListener(menuBtn, 'click', () => {
    const currentDisplay = menu.style.display;
    menu.style.display = currentDisplay === 'block' ? 'none' : 'block';
  });
  eventsManager.addEventListener(document, 'click', (e) => {
    // click outside handler
    if (!menu || !menuBtn) return;
    if (e.target !== menuBtn && !menuBtn.contains(e.target as Node)) {
      menu.style.display = 'none';
    }
  });

  const shareBtn = codeToImageContainer.querySelector<HTMLElement>('#code-to-img-share-btn')!;
  eventsManager.addEventListener(shareBtn, 'click', () => {
    const btnText = shareBtn.innerText;
    shareBtn.innerText = window.deps.translateString('core.generating', 'Generating...');
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
        notifications.error(
          window.deps.translateString('core.error.failedToShareImage', 'Failed to share image'),
        );
      })
      .finally(() => {
        shareBtn.innerText = btnText;
      });
  });

  const copyImageBtn = codeToImageContainer.querySelector<HTMLElement>(
    '#code-to-img-copy-img-btn',
  )!;
  eventsManager.addEventListener(copyImageBtn, 'click', () => {
    const btnText = copyImageBtn.innerText;
    copyImageBtn.innerText = window.deps.translateString('core.generating', 'Generating...');
    getImageUrl()
      .then(async (dataUrl: string) => {
        const blob = await fetch(dataUrl).then((res) => res.blob());
        const imageCopied = await copyImage(blob, formData.format || 'png');
        if (imageCopied) {
          notifications.success(
            window.deps.translateString('core.copy.copiedImage', 'Image copied to clipboard.'),
          );
          return;
        }
      })
      .catch(() => {
        notifications.error(
          window.deps.translateString('core.error.failedToCopyImage', 'Failed to copy image'),
        );
      })
      .finally(() => {
        copyImageBtn.innerText = btnText;
      });
  });

  const copyCodeBtn = codeToImageContainer.querySelector<HTMLElement>(
    '#code-to-img-copy-code-btn',
  )!;
  eventsManager.addEventListener(copyCodeBtn, 'click', (ev) => {
    ev.preventDefault();
    const code = editor.getValue();
    if (copyToClipboard(code)) {
      notifications.success(
        window.deps.translateString('core.copy.copied', 'Code copied to clipboard'),
      );
    } else {
      notifications.error(
        window.deps.translateString('core.error.failedToCopyCode', 'Failed to copy code'),
      );
    }
  });

  const savedPreset = deps.getSavedPreset();
  if (!savedPreset) {
    applyPreset(presets[0]);
  } else if (savedPreset.id === 'custom') {
    applyPreset(savedPreset);
  } else {
    applyPreset(presets.find((preset) => preset.id === savedPreset.id) || presets[0]);
  }
};

const presets: Array<Partial<Preset> & { id: string }> = [
  {
    id: 'preset_1',
    bg1: '#4a90e2',
    bg2: '#c162f5',
    bgDirection: 'to bottom left',
    editorTheme: 'one-dark',
    shadow: true,
    windowStyle: 'mac',
  },
  {
    id: 'preset_2',
    bg1: '#48cae4',
    bg2: '#f562f5',
    bgDirection: 'to bottom right',
    editorTheme: 'laserwave',
    shadow: true,
  },
  {
    id: 'preset_3',
    bg1: '#823bb9',
    bg2: '#f4a261',
    bgDirection: 'to bottom right',
    editorTheme: 'duotone-dark',
    windowStyle: 'mac',
    shadow: true,
  },
  {
    id: 'preset_4',
    bg1: '#c3ac75',
    bg2: '#ff8e38',
    borderRadius: 15,
    shadow: true,
    editorTheme: 'darcula',
    opacity: 0.95,
    fontFamily: 'fira-code',
  },
  {
    id: 'preset_5',
    bg1: '#f5f5dc',
    bg2: '',
    bgDirection: 'to bottom right',
    editorTheme: 'dracula',
    shadow: true,
  },
  {
    id: 'preset_6',
    bg1: '#deecdd',
    bg2: '#c1dfc4',
    bgDirection: 'to bottom',
    shadow: true,
    editorTheme: 'tomorrow',
    opacity: 1,
    windowStyle: 'none',
    fontFamily: 'nova-mono',
  },
  {
    id: 'preset_7',
    bg1: '#fd978b',
    bg2: '#f9748f',
    windowStyle: 'mac',
    shadow: true,
    editorTheme: 'holi-theme',
    opacity: 0.85,
  },
  {
    id: 'preset_8',
    bg1: '#e94057',
    bg2: '#a52c78',
    bgDirection: 'to bottom left',
    shadow: true,
    editorTheme: 'funky',
    opacity: 0.95,
  },
  {
    id: 'preset_9',
    bg1: '#4cb88e',
    bg2: '#1e6267',
    bgDirection: 'to bottom',
    shadow: true,
    editorTheme: 'holi-theme',
    fontFamily: 'cascadia-code',
  },
  {
    id: 'preset_10',
    bg1: '#07a2a2',
    bg2: '',
    editorTheme: 'a11y-dark',
    shadow: true,
  },
  {
    id: 'preset_11',
    bg1: '#4a90e2',
    bg2: '',
    editorTheme: 'dracula',
    fontFamily: 'monaspace-radon',
    shadow: false,
  },
  {
    id: 'preset_12',
    bg1: '#48cae4',
    bg2: '#0096c7',
    shadow: true,
    editorTheme: 'shades-of-purple',
    windowStyle: 'mac',
    fontFamily: 'monofur',
    fontSize: 16,
  },
  {
    id: 'preset_13',
    bg1: '#111c28',
    bg2: '#111c28',
    padding: 10,
    borderRadius: 0,
    shadow: false,
    editorTheme: 'coldark-dark',
    windowStyle: 'none',
    fontFamily: 'monaspace-krypton',
  },
  {
    id: 'preset_14',
    bg1: '#f2daa1',
    bg2: '#998149',
    shadow: true,
    editorTheme: 'gruvbox-light',
    fontFamily: 'jetbrains-mono',
  },
  {
    id: 'preset_15',
    bg1: '#494949',
    bg2: '#494949',
    editorTheme: 'coldark-cold',
    opacity: 1,
    shadow: true,
    windowStyle: 'windows',
  },
  {
    id: 'preset_16',
    bg1: '#243b55',
    bg2: '#141e30',
    bgDirection: 'to right',
    shadow: true,
    editorTheme: 'vs',
    opacity: 0.95,
    windowStyle: 'none',
    fontFamily: 'sf-mono',
  },
  {
    id: 'preset_17',
    bg1: '#ffffff',
    bg2: '#e2efff',
    shadow: true,
    editorTheme: 'coy-without-shadows',
    opacity: 1,
    fontFamily: 'hack',
  },
  {
    id: 'custom',
  },
];

const defaultCode = `
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
`.trimStart();
