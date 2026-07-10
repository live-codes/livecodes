import { toPositiveLineNumber } from '../utils/line-number';

const toUserLine = (docLine: number, offset: number): number | undefined => {
  if (!offset) return undefined;
  return toPositiveLineNumber(docLine - offset);
};

const getMarkupInlineScriptStartLines = () => {
  const scriptTags = Array.from(
    document.body?.querySelectorAll<HTMLScriptElement>(
      'script[data-livecodes-markup-script-line]',
    ) ?? [],
  );
  return scriptTags
    .map((script) => Number(script.dataset.livecodesMarkupScriptLine))
    .filter((line) => Number.isFinite(line) && line > 0)
    .sort((a, b) => a - b);
};

const getCurrentMarkupScriptStartLine = () => {
  const script = document.currentScript as HTMLScriptElement | null;
  if (!script) return undefined;
  const startLine = Number(script.dataset.livecodesMarkupScriptLine);
  return toPositiveLineNumber(startLine);
};

const getCurrentMarkupScriptStackBase = (): number => {
  const script = document.currentScript as HTMLScriptElement | null;
  if (!script) return 1;
  return Number(script.dataset.livecodesMarkupScriptStackBase) || 1;
};

export const getMarkupInlineScriptLine = (
  docLine: number,
  markupOffset: number,
): number | undefined => {
  const currentScriptStartLine = getCurrentMarkupScriptStartLine();
  if (currentScriptStartLine) {
    const stackBase = getCurrentMarkupScriptStackBase();
    return toPositiveLineNumber(currentScriptStartLine + docLine - stackBase);
  }

  if (docLine < markupOffset) {
    const firstScriptStartLine = getMarkupInlineScriptStartLines()[0];
    if (firstScriptStartLine) {
      return toPositiveLineNumber(firstScriptStartLine + docLine - 1);
    }
  }

  return toUserLine(docLine, markupOffset);
};
