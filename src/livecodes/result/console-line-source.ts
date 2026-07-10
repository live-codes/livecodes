import { getMarkupInlineScriptLine } from './markup-script-lines';
import type { ConsoleCallSite, ConsoleErrorSite, ConsoleSource } from './result-types';

const toPositiveLineNumber = (line: number | undefined): number | undefined => {
  if (typeof line !== 'number' || !Number.isFinite(line) || line <= 0) return undefined;
  return Math.trunc(line);
};

const getOffsets = () => ({
  markup: Number(document.body?.dataset?.livecodesMarkupLineOffset ?? 0),
  script: Number(document.body?.dataset?.livecodesScriptLineOffset ?? 0),
});

const toUserLine = (docLine: number, offset: number): number | undefined => {
  if (!offset) return undefined;
  return toPositiveLineNumber(docLine - offset);
};

const isExternalScriptFrame = (frame: string) =>
  /data:text\/javascript/i.test(frame) ||
  /blob:/i.test(frame) ||
  /\.[cm]?js(?:[?#][^)\s]*)?:\d+:\d+\)?[\s]*$/i.test(frame);

const getCandidateFrame = (stack: string) => {
  const frames = stack.split('\n').filter(Boolean);
  const codeFrames = frames.filter(
    (frame, index) =>
      index > 0 &&
      !/result-utils(?:\.[\w-]+)?\.js/i.test(frame) &&
      frame.match(/:(\d+):\d+\)?[\s]*$/),
  );
  return codeFrames.find(isExternalScriptFrame) ?? codeFrames[0] ?? '';
};

export const getConsoleCallSite = (): ConsoleCallSite => {
  try {
    const stack = new Error().stack ?? '';
    const callerFrame = getCandidateFrame(stack);
    const match = callerFrame.match(/:(\d+):\d+\)?[\s]*$/);
    if (!match) return { source: 'script', callerFrame };

    const docLine = toPositiveLineNumber(Number(match[1]));
    if (!docLine) return { source: 'script', callerFrame };

    const { markup, script } = getOffsets();
    const externalScriptFrame = isExternalScriptFrame(callerFrame);

    if (externalScriptFrame || (!markup && !script)) {
      return {
        lineNumber: docLine,
        source: 'script',
        callerFrame,
        markupOffset: markup,
        scriptOffset: script,
        externalScriptFrame,
      };
    }

    if (script > 0) {
      const source: ConsoleSource = docLine >= script ? 'script' : 'markup';
      const lineNumber =
        source === 'script'
          ? toUserLine(docLine, script) ?? docLine
          : getMarkupInlineScriptLine(docLine, markup) ?? docLine;
      return {
        lineNumber,
        source,
        callerFrame,
        markupOffset: markup,
        scriptOffset: script,
        externalScriptFrame,
      };
    }

    if (markup > 0) {
      return {
        lineNumber: getMarkupInlineScriptLine(docLine, markup) ?? docLine,
        source: 'markup',
        callerFrame,
        markupOffset: markup,
        scriptOffset: script,
        externalScriptFrame,
      };
    }

    return {
      lineNumber: docLine,
      source: 'script',
      callerFrame,
      markupOffset: markup,
      scriptOffset: script,
      externalScriptFrame,
    };
  } catch {
    return { source: 'script' };
  }
};

export const getConsoleErrorSite = (error: ErrorEvent): ConsoleErrorSite => {
  const rawLine = toPositiveLineNumber(error.lineno || undefined);
  const externalScript = isExternalScriptFrame(error.filename ?? '');
  const { markup, script } = getOffsets();
  const source = (() => {
    if (!rawLine) return 'script' as ConsoleSource;
    if (externalScript) return 'script' as ConsoleSource;
    if (!markup && !script) return 'script' as ConsoleSource;
    if (script > 0) return rawLine >= script ? 'script' : 'markup';
    if (markup > 0) return 'markup' as ConsoleSource;
    return 'script' as ConsoleSource;
  })();
  const lineNumber =
    !rawLine || externalScript
      ? rawLine
      : source === 'script'
        ? toUserLine(rawLine, script) ?? rawLine
        : getMarkupInlineScriptLine(rawLine, markup) ?? rawLine;

  return {
    lineNumber,
    source,
    rawLine,
    markupOffset: markup,
    scriptOffset: script,
    externalScript,
  };
};
