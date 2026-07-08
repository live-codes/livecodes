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

export const buildSourceLineMap = (sourceMapStr: string): Map<number, number> => {
  const lineMap = new Map<number, number>();

  let mappings: string;
  try {
    ({ mappings } = JSON.parse(sourceMapStr) as { mappings: string });
  } catch {
    return lineMap; // invalid JSON — nothing to map
  }
  if (!mappings) return lineMap;

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
