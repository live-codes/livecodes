// ─── Types ────────────────────────────────────────────────────────────────────

export type ConsoleSource = 'markup' | 'script';

export type ConsoleDisplaySource = ConsoleSource | 'style';

export interface ConsoleCallSite {
  lineNumber?: number;
  columnNumber?: number;
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

interface SourceMapSegment {
  generatedColumn: number;
  originalLine: number;
  originalColumn: number;
}

// Map of compiled line (0-indexed) → array of segments (sorted by generatedColumn)
type DecodedSegments = Map<number, SourceMapSegment[]>;

const decodeSourceMapSegments = (sourceMapStr: string): DecodedSegments | null => {
  let mappings: string;
  try {
    mappings = JSON.parse(sourceMapStr).mappings;
  } catch {
    return null;
  }
  if (!mappings || typeof mappings !== 'string') return null;

  const segments = new Map<number, SourceMapSegment[]>();
  let generatedLine = 0;
  let generatedColumn = 0;
  let originalLine = 0;
  let originalColumn = 0;

  mappings.split(';').forEach((group) => {
    const lineSegments: SourceMapSegment[] = [];
    generatedColumn = 0; // reset on each new line
    for (const segmentStr of group.split(',')) {
      if (!segmentStr) continue;
      let pos = 0;
      const [genColDelta] = decodeVlq(segmentStr, pos);
      pos = decodeVlq(segmentStr, pos)[1];
      generatedColumn += genColDelta;
      if (pos >= segmentStr.length) continue;
      // skip sourcesIndex
      pos = decodeVlq(segmentStr, pos)[1];
      if (pos >= segmentStr.length) continue;
      const [origLineDelta] = decodeVlq(segmentStr, pos);
      pos = decodeVlq(segmentStr, pos)[1];
      originalLine += origLineDelta;
      if (pos >= segmentStr.length) continue;
      const [origColDelta] = decodeVlq(segmentStr, pos);
      originalColumn += origColDelta;
      lineSegments.push({
        generatedColumn,
        originalLine,
        originalColumn,
      });
    }
    if (lineSegments.length > 0) {
      segments.set(generatedLine, lineSegments);
    }
    generatedLine++;
  });

  return segments.size > 0 ? segments : null;
};

export const buildSourceLineMap = /* @__PURE__ */ (sourceMapStr: string): Map<number, number> => {
  const lineMap = new Map<number, number>();
  const segments = decodeSourceMapSegments(sourceMapStr);
  if (!segments) return lineMap;

  for (const [compiledLine, compiledSegments] of segments) {
    lineMap.set(compiledLine + 1, compiledSegments[0].originalLine + 1);
  }

  return lineMap;
};

// Resolves a compiled (line, column) position, both 1-indexed, to the original source position.
// Returns undefined if no source map, or the input position if not found in the map.
export const getOriginalPosition = /* @__PURE__ */ (
  sourceMapStr: string,
  compiledLine: number,
  compiledColumn: number,
): { line: number; column: number } | undefined => {
  const segments = decodeSourceMapSegments(sourceMapStr);
  if (!segments) return undefined;
  const lineSegments = segments.get(compiledLine - 1);
  if (!lineSegments) return undefined;

  // Binary search for the segment whose generatedColumn is ≤ compiledColumn
  let lo = 0;
  let hi = lineSegments.length - 1;
  let best: SourceMapSegment | undefined;
  while (lo <= hi) {
    // eslint-disable-next-line no-bitwise
    const mid = (lo + hi) >> 1;
    const seg = lineSegments[mid];
    if (seg.generatedColumn <= compiledColumn - 1) {
      best = seg;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  if (!best) return undefined;
  return {
    line: best.originalLine + 1,
    column: best.originalColumn + 1 + Math.max(0, compiledColumn - 1 - best.generatedColumn),
  };
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

const getColumnNumberFromFrame = (callerFrame: string): number | undefined => {
  const match = callerFrame.match(/:(\d+):(\d+)\)?[\s]*$/);
  return toPositiveLineNumber(Number(match?.[2]));
};

const resolveConsoleCallSiteFromDocLine = (
  docLine: number,
  callerFrame?: string,
  column?: number,
): ConsoleCallSite => {
  const { markup, script } = getOffsets();
  const externalScriptFrame = isExternalScriptFrame(callerFrame ?? '');

  if (externalScriptFrame || (!markup && !script)) {
    return {
      lineNumber: docLine,
      columnNumber: column,
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
      columnNumber: column,
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
      columnNumber: column,
      source: 'markup',
      callerFrame,
      markupOffset: markup,
      scriptOffset: script,
      externalScriptFrame,
    };
  }

  return {
    lineNumber: docLine,
    columnNumber: column,
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
  const docColumn = getColumnNumberFromFrame(callerFrame ?? '');
  if (!docLine) return { source: 'script', callerFrame };

  return resolveConsoleCallSiteFromDocLine(docLine, callerFrame, docColumn);
};

export const getConsoleCallSite = (): ConsoleCallSite => {
  try {
    const stack = new Error().stack ?? '';
    const callerFrame = getCandidateFrame(stack);
    const docLine = getLineNumberFromFrame(callerFrame);
    const docColumn = getColumnNumberFromFrame(callerFrame);
    if (!docLine) return { source: 'script', callerFrame };

    return resolveConsoleCallSiteFromDocLine(docLine, callerFrame, docColumn);
  } catch {
    return { source: 'script' };
  }
};
