// ─── Types ────────────────────────────────────────────────────────────────────

export type ConsoleSource = 'markup' | 'script';

export type ConsoleDisplaySource = ConsoleSource | 'style';

export interface ConsoleCallSite {
  lineNumber?: number;
  source: ConsoleSource;
  callerFrame?: string;
  markupOffset?: number;
  scriptOffset?: number;
  externalScriptFrame?: boolean;
}

export const isConsoleDisplaySource = (source: unknown): source is ConsoleDisplaySource =>
  source === 'markup' || source === 'style' || source === 'script';

// ─── Line number utilities ─────────────────────────────────────────────────────

export const toPositiveLineNumber = (line: unknown): number | undefined => {
  if (typeof line !== 'number' || !Number.isFinite(line) || line <= 0) return undefined;
  return Math.trunc(line);
};

// ─── Source map decoder ────────────────────────────────────────────────────────

const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export const decodeVlq = (str: string, pos: number): [value: number, nextPos: number] => {
  let result = 0;
  let shift = 0;
  let digit: number;
  do {
    digit = BASE64_CHARS.indexOf(str[pos++]);
    if (digit < 0) break;
    result += (digit % 32) * 2 ** shift; // low 5 bits, shifted into position
    shift += 5;
  } while (digit >= 32); // bit 5 is the continuation flag
  const value = result % 2 === 1 ? -Math.floor(result / 2) : Math.floor(result / 2);
  return [value, pos];
};

// Returns the original line delta for a segment, or null if the segment lacks source info.
// Source map segments have up to 5 VLQ fields: generatedCol, sourcesIndex, originalLine,
// originalCol, namesIndex. We need at least 3 fields to get the original line.
const decodeOriginalLineDelta = (segment: string): number | null => {
  if (!segment) return null;
  let pos = 0;
  [, pos] = decodeVlq(segment, pos); // skip: generated column
  if (pos >= segment.length) return null;
  [, pos] = decodeVlq(segment, pos); // skip: sources index
  if (pos >= segment.length) return null;
  return decodeVlq(segment, pos)[0]; // original line delta
};

export const buildSourceLineMap = /* @__PURE__ */ (sourceMapStr: string): Map<number, number> => {
  const lineMap = new Map<number, number>();

  let mappings: string;
  try {
    mappings = JSON.parse(sourceMapStr).mappings;
  } catch {
    return lineMap; // invalid JSON — nothing to map
  }
  if (!mappings || typeof mappings !== 'string') return lineMap;

  let originalLine = 0;
  mappings.split(';').forEach((group, compiledLine) => {
    for (const segment of group.split(',')) {
      const delta = decodeOriginalLineDelta(segment);
      if (delta === null) continue;
      originalLine += delta; // delta is relative to previous segment across all lines
      if (!lineMap.has(compiledLine + 1)) {
        lineMap.set(compiledLine + 1, originalLine + 1); // convert 0-indexed to 1-indexed
      }
    }
  });

  return lineMap;
};

// ─── Markup inline-script line resolver ───────────────────────────────────────

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
  const script = document.currentScript;
  if (!script) return undefined;
  const startLine = Number(script.dataset.livecodesMarkupScriptLine);
  return toPositiveLineNumber(startLine);
};

const getCurrentMarkupScriptStackBase = (): number => {
  const script = document.currentScript;
  if (!script) return 1;
  return Number(script.dataset.livecodesMarkupScriptStackBase) || 1;
};

const getMarkupInlineScriptLine = (docLine: number, markupOffset: number): number | undefined => {
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

// ─── Console call-site detector ───────────────────────────────────────────────

const getOffsets = () => ({
  markup: Number(document.body?.dataset?.livecodesMarkupLineOffset ?? 0),
  script: Number(document.body?.dataset?.livecodesScriptLineOffset ?? 0),
});

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

const getLineNumberFromFrame = (callerFrame: string): number | undefined => {
  const match = callerFrame.match(/:(\d+):\d+\)?[\s]*$/);
  return toPositiveLineNumber(Number(match?.[1]));
};

const resolveConsoleCallSiteFromDocLine = (
  docLine: number,
  callerFrame?: string,
): ConsoleCallSite => {
  const { markup, script } = getOffsets();
  const externalScriptFrame = isExternalScriptFrame(callerFrame ?? '');

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
};

export const getConsoleCallSiteFromError = (
  lineNumber: unknown,
  stack?: string,
): ConsoleCallSite => {
  const callerFrame = stack ? getCandidateFrame(stack) : undefined;
  const docLine = getLineNumberFromFrame(callerFrame ?? '') ?? toPositiveLineNumber(lineNumber);
  if (!docLine) return { source: 'script', callerFrame };

  return resolveConsoleCallSiteFromDocLine(docLine, callerFrame);
};

export const getConsoleCallSite = (): ConsoleCallSite => {
  try {
    const stack = new Error().stack ?? '';
    const callerFrame = getCandidateFrame(stack);
    const docLine = getLineNumberFromFrame(callerFrame);
    if (!docLine) return { source: 'script', callerFrame };

    return resolveConsoleCallSiteFromDocLine(docLine, callerFrame);
  } catch {
    return { source: 'script' };
  }
};
