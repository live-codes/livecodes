import { getLanguageByAlias, getLanguageEditorId } from '../languages';
import type { Config } from '../models';
import { corsService } from '../services';
import { importFromDom } from './dom';
import { importFromImage } from './image';
import { populateConfig } from './utils';
import { importFromZip } from './zip';

const getRawCode = (content: string, lang: string): Partial<Config> => {
  const language = getLanguageByAlias(lang) || 'html';
  const editorId = getLanguageEditorId(language) || 'markup';
  return {
    [editorId]: {
      language,
      content,
    },
    activeEditor: editorId,
  };
};

export const importFromUrl = async (
  url: string,
  params: { [key: string]: string },
  config: Config,
): Promise<Partial<Config>> => {
  let res: Response;
  try {
    res = await corsService.fetch(url);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching ' + url);
    return {};
  }

  // zip file
  if (
    url.endsWith('.zip') ||
    ['application/zip', 'application/octet-stream'].includes(
      res.headers.get('Content-Type') || '',
    ) ||
    url.startsWith('data:application/zip') ||
    url.startsWith('data:application/octet-stream')
  ) {
    const zip = await res.blob();
    return importFromZip(zip, populateConfig);
  }

  // image (svg is handled as text - opens in html editor)
  if (
    (res.headers.get('Content-Type')?.startsWith('image/') &&
      !res.headers.get('Content-Type')?.includes('svg')) ||
    url.endsWith('.png') ||
    url.endsWith('.jpg') ||
    url.endsWith('.jpeg') ||
    url.endsWith('.bmp') ||
    url.endsWith('.webp') ||
    url.endsWith('.pbm') ||
    (url.startsWith('data:image/') && !url.startsWith('data:image/svg+xml'))
  ) {
    const image = await res.blob();
    return importFromImage(image) as Promise<Partial<Config>>;
  }

  const fetchedContent = await res.text();

  if (params.raw) {
    return getRawCode(fetchedContent, params.raw);
  }

  const importedFromDom = await importFromDom(fetchedContent, params, config);

  if (Object.keys(importedFromDom).length > 0) {
    return importedFromDom;
  } else if (url.startsWith('data:')) {
    const pattern = /data:(?:text|application)\/([^;,]*?);(?:\S)+/g;
    const language = [...url.matchAll(new RegExp(pattern))][0]?.[1] || 'html';
    const editorId = getLanguageEditorId(language) || 'markup';
    return {
      [editorId]: {
        language,
        content: fetchedContent || '',
      },
      activeEditor: editorId,
    };
  } else {
    // if no code was extracted, assume it is raw code
    // if there is a file extension use it else assume it is html
    const extension = url.slice(url.lastIndexOf('.') + 1);
    const language = getLanguageByAlias(extension) || 'html';
    const editorId = getLanguageEditorId(language) || 'markup';
    return {
      [editorId]: {
        language,
        content: fetchedContent || '',
      },
      activeEditor: editorId,
    };
  }
};
