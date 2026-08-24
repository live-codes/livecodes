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
  // Set for multi-file projects: the file the call site belongs to (matches
  // the `//# sourceURL=<filename>` injected by the result page, and the key in
  // CompileInfo.sourceMaps). When present, `lineNumber` is that file's
  // module-local compiled line, to be mapped through that file's own source map.
  filename?: string;
}

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

// Extracts the frame's URL token (the file the frame belongs to), e.g.
//   "    at fn (tax-calculator.ts:12:5)"  → "tax-calculator.ts"
//   "  utils.ts:5:1"                      → "utils.ts"
// Used for multi-file call sites, where each module is a data URL carrying
// `//# sourceURL=<filename>`.
const getFrameUrl = (callerFrame: string): string | undefined => {
  const match = callerFrame.match(/\(?([^\s()]+):\d+:\d+\)?[\s]*$/);
  if (!match) return undefined;
  let url = match[1];
  // strip surrounding parens and leading path decorations from sourceURL
  url = url.replace(/^\(/, '').replace(/\)$/, '');
  url = url.replace(/^[~/]*(\.\/)*/, '');
  return url || undefined;
};

// A filename extracted from the frame is only a usable multi-file source key when
// the frame is a bare sourceURL (module-local), not an external/data URL or an
// unknown builtin frame. Plain JS files are excluded: single-file uses
// `//# sourceURL=script.js`, and only non-JS source files carry per-file maps.
const isSourceUrlFilename = (url: string): boolean =>
  url.length > 0 &&
  !url.startsWith('data:') &&
  !isExternalScriptFrame(url) &&
  !/\.m?js$/i.test(url) && // skip plain JS (single-file bootstrapper)
  !/^[a-zA-Z][\w+.-]*:/.test(url) && // some scheme prefix (http://, blob:, etc.)
  url.includes('.') && // require an extension, e.g. utils.ts
  !url.endsWith(':');

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
  // Prefer a frame naming a real sourceURL file (multi-file projects), so an
  // external `.js` bootstrapper or frame doesn't shadow the user's file.
  const sourceUrlFrame = codeFrames.find((frame) => isSourceUrlFilename(getFrameUrl(frame) ?? ''));
  return sourceUrlFrame ?? codeFrames.find(isExternalScriptFrame) ?? codeFrames[0] ?? '';
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
  const { markup: markupOffset, script: scriptOffset } = getOffsets();
  const externalScriptFrame = isExternalScriptFrame(callerFrame ?? '');

  // Multi-file call sites: each module is injected as its own data URL carrying
  // `//# sourceURL=<filename>`, so the frame names a bare file and its line is
  // module-local (mapped through that file's own source map). Single-file inline
  // scripts instead rely on document offsets, so only use this branch when a
  // real sourceURL filename is present.
  const frameUrl = callerFrame ? getFrameUrl(callerFrame) : undefined;
  if (frameUrl && isSourceUrlFilename(frameUrl)) {
    return {
      lineNumber: docLine,
      columnNumber: column,
      source: 'script',
      callerFrame,
      markupOffset,
      scriptOffset,
      externalScriptFrame,
      filename: frameUrl,
    };
  }

  if (externalScriptFrame || (!markupOffset && !scriptOffset)) {
    return {
      lineNumber: docLine,
      columnNumber: column,
      source: 'script',
      callerFrame,
      markupOffset,
      scriptOffset,
      externalScriptFrame,
    };
  }

  if (scriptOffset > 0) {
    const source: ConsoleSource = docLine >= scriptOffset ? 'script' : 'markup';
    const lineNumber =
      source === 'script'
        ? toUserLine(docLine, scriptOffset) ?? docLine
        : getMarkupInlineScriptLine(docLine, markupOffset) ?? docLine;
    return {
      lineNumber,
      columnNumber: column,
      source,
      callerFrame,
      markupOffset: markupOffset,
      scriptOffset,
      externalScriptFrame,
    };
  }

  if (markupOffset > 0) {
    return {
      lineNumber: getMarkupInlineScriptLine(docLine, markupOffset) ?? docLine,
      columnNumber: column,
      source: 'markup',
      callerFrame,
      markupOffset,
      scriptOffset,
      externalScriptFrame,
    };
  }

  return {
    lineNumber: docLine,
    columnNumber: column,
    source: 'script',
    callerFrame,
    markupOffset,
    scriptOffset,
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
