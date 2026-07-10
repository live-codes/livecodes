import { buildSourceLineMap, decodeVlq } from '../source-map';

describe('decodeVlq', () => {
  test('decodes a single positive value', () => {
    // 'A' = 0 in base64, VLQ value 0
    expect(decodeVlq('A', 0)).toEqual([0, 1]);
  });

  test('decodes a positive single-digit VLQ', () => {
    // 'C' = 2 in base64. VLQ: low bit = sign (0 = positive), remaining = 1 → value 1
    expect(decodeVlq('C', 0)).toEqual([1, 1]);
  });

  test('decodes a negative single-digit VLQ', () => {
    // 'D' = 3 in base64. VLQ: low bit = 1 (negative), remaining = 1 → value -1
    expect(decodeVlq('D', 0)).toEqual([-1, 1]);
  });

  test('decodes a multi-character VLQ (continuation bit set)', () => {
    // 'yB' encodes value 25:
    // 'y' = 50 = 0b110010 → continuation bit set, low 5 bits = 0b10010 = 18
    // 'B' = 1  = 0b000001 → continuation bit clear, value = 1
    // combined: (1 << 5) | 18 = 50, sign bit (low) = 0 → positive → 50 >> 1 = 25
    expect(decodeVlq('yB', 0)).toEqual([25, 2]);
  });

  test('advances position correctly when starting mid-string', () => {
    const [value, nextPos] = decodeVlq('AAA', 1);
    expect(value).toBe(0);
    expect(nextPos).toBe(2);
  });

  test('stops at invalid character', () => {
    // '!' is not a base64 VLQ character → indexOf returns -1 → loop breaks immediately
    const [value, nextPos] = decodeVlq('!', 0);
    expect(value).toBe(0);
    expect(nextPos).toBe(1); // pos was incremented before the break
  });
});

describe('buildSourceLineMap', () => {
  test('returns empty map for invalid JSON', () => {
    const map = buildSourceLineMap('not json');
    expect(map.size).toBe(0);
  });

  test('returns empty map for missing mappings field', () => {
    const map = buildSourceLineMap(JSON.stringify({ version: 3 }));
    expect(map.size).toBe(0);
  });

  test('returns empty map for empty mappings string', () => {
    const map = buildSourceLineMap(JSON.stringify({ mappings: '' }));
    expect(map.size).toBe(0);
  });

  test('maps compiled line 1 to original line 1 for identity mapping', () => {
    // Minimal source map: one segment on compiled line 1
    // Segment "AAAA": col=0, sources=0, line=0, col=0 → originalLine delta=0 → line 1
    const sourceMap = JSON.stringify({ mappings: 'AAAA' });
    const map = buildSourceLineMap(sourceMap);
    expect(map.get(1)).toBe(1);
  });

  test('maps compiled lines to correct original lines across multiple compiled lines', () => {
    // TypeScript-like: 2 preamble compiled lines (no mapping), then user code starts
    // mappings: ";;AACA" → compiled line 1 empty, line 2 empty, line 3 → original line 2
    // "AACA": col=0, sources=0, line delta=+1 (from 0) → originalLine=1 → line 2 (1-indexed)
    const sourceMap = JSON.stringify({ mappings: ';;AACA' });
    const map = buildSourceLineMap(sourceMap);
    expect(map.get(1)).toBeUndefined();
    expect(map.get(2)).toBeUndefined();
    expect(map.get(3)).toBe(2);
  });

  test('only records the first segment per compiled line', () => {
    // Two segments on compiled line 1: first maps to original line 1, second to line 3
    // "AAAA,AAEA": first=line 1, second=line delta +2 → original line 3
    const sourceMap = JSON.stringify({ mappings: 'AAAA,AAEA' });
    const map = buildSourceLineMap(sourceMap);
    // First segment wins
    expect(map.get(1)).toBe(1);
  });

  test('handles a realistic TypeScript source map structure', () => {
    // Simulate: TS source has 3 lines, compiled output has 3 lines starting at the same positions
    // Each compiled line maps back to the corresponding original line
    // mappings: "AAAA;AACA;AACA"
    // Line 1: AAAA → delta=0 → original line 1
    // Line 2: AACA → delta=+1 → original line 2
    // Line 3: AACA → delta=+1 → original line 3
    const sourceMap = JSON.stringify({ mappings: 'AAAA;AACA;AACA' });
    const map = buildSourceLineMap(sourceMap);
    expect(map.get(1)).toBe(1);
    expect(map.get(2)).toBe(2);
    expect(map.get(3)).toBe(3);
  });

  test('skips segments with only one field (no source info)', () => {
    // A segment with only a generated column (no sources index, no line) should be skipped
    // "A" = only generated column field, no further fields
    const sourceMap = JSON.stringify({ mappings: 'A' });
    const map = buildSourceLineMap(sourceMap);
    expect(map.get(1)).toBeUndefined();
  });
});
