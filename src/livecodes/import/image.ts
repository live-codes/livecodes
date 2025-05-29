import { detectLanguage, getLanguageByAlias, getLanguageEditorId, languages } from '../languages';
import type { ContentConfig } from '../models';
import { tesseractUrl } from '../vendors';
import { importProject } from './project-id';

let Tesseract:
  | {
      createWorker: (lang: string) => Promise<{
        recognize: (blob: Blob) => Promise<{ data: { text: string } }>;
        terminate: () => void;
      }>;
    }
  | undefined;

const ocr = async (image: Blob) => {
  Tesseract = Tesseract ?? (await import(tesseractUrl)).default;
  if (!Tesseract) return '';
  const worker = await Tesseract.createWorker('eng');
  const ret = await worker.recognize(image);
  worker.terminate();
  return ret.data.text;
};

const cleanUpCode = async (code: string) => {
  if (!code?.trim()) return '';
  const lines = code.trim().split('\n');
  const [firstLine, ...rest] = lines;
  const lastLines = lines.slice(-2).join('\n');

  // detect images created by LiveCodes "Code to Image" with share URL
  const shareUrlPattern = /\?x=(id\/\S{11,20})/g;
  let projectId = [...lastLines.matchAll(new RegExp(shareUrlPattern))].at(-1)?.[1];
  if (projectId) {
    projectId = projectId.replace(/]/g, 'j');
    const alphabet = '23456789abcdefghijkmnpqrstuvwxyz';
    if (
      projectId
        .slice('id/'.length)
        .split('')
        .every((c) => alphabet.includes(c))
    ) {
      return importProject(projectId);
    }
  }

  // remove first line if it contains window buttons
  const buttonCharacters = ['0', 'C', 'N', 'J', 'X', '(', ')', '[', ']', '|'];
  const hasButtons =
    firstLine
      .slice(0, 6)
      .split('')
      .filter((c) => buttonCharacters.includes(c)).length > 2;
  if (hasButtons) {
    code = rest.join('\n');
  }

  code = code.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
  return code;
};

export const importFromImage = async (blob: Blob): Promise<Partial<ContentConfig>> => {
  try {
    const text = await ocr(blob);
    const content = await cleanUpCode(text);
    if (content && typeof content === 'object') {
      // config from share url
      return content;
    }
    const langs = languages.map((lang) => lang.name);
    const detected = await detectLanguage(content, langs);
    detected.language = getLanguageByAlias(detected.language) || detected.language;
    detected.secondBest = getLanguageByAlias(detected.secondBest) || detected.secondBest;
    // language name or filename with extension in image
    const langNamesInCode = languages
      .filter(
        (lang) =>
          content.search(new RegExp(`\\b${lang.name}\\b`, 'i')) !== -1 ||
          content.search(new RegExp(`\\b${lang.extensions[0]}\\b`, 'i')) !== -1,
      )
      .map((lang) => lang.name);
    const language =
      langNamesInCode.find((lang) => lang === detected.language || lang === detected.secondBest) ??
      langNamesInCode[0] ??
      detected.language ??
      detected.secondBest ??
      'html';

    const editorId = getLanguageEditorId(language) ?? 'markup';
    return {
      activeEditor: editorId,
      [editorId]: {
        language,
        content,
      },
    };
  } catch (error) {
    return {};
  }
};
