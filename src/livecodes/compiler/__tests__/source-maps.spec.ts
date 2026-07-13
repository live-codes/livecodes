import { buildSourceLineMap, decodeVlq, toPositiveLineNumber } from '../source-maps';

describe('toPositiveLineNumber', () => {
  test('returns the integer for a positive number', () => {
    // Arrange
    const input = 7;

    // Act
    const result = toPositiveLineNumber(input);

    // Assert
    expect(result).toBe(7);
  });

  test('truncates a positive float to its integer part', () => {
    // Arrange
    const input = 3.9;

    // Act
    const result = toPositiveLineNumber(input);

    // Assert
    expect(result).toBe(3);
  });

  test('returns undefined for zero', () => {
    expect(toPositiveLineNumber(0)).toBeUndefined();
  });

  test('returns undefined for a negative number', () => {
    expect(toPositiveLineNumber(-1)).toBeUndefined();
  });

  test('returns undefined for NaN', () => {
    expect(toPositiveLineNumber(NaN)).toBeUndefined();
  });

  test('returns undefined for Infinity', () => {
    expect(toPositiveLineNumber(Infinity)).toBeUndefined();
  });

  test('returns undefined for a string', () => {
    expect(toPositiveLineNumber('7')).toBeUndefined();
  });

  test('returns undefined for undefined', () => {
    expect(toPositiveLineNumber(undefined)).toBeUndefined();
  });

  test('returns undefined for null', () => {
    expect(toPositiveLineNumber(null)).toBeUndefined();
  });
});

describe('decodeVlq', () => {
  test('decodes a single positive value', () => {
    // Arrange
    // 'A' = 0 in base64, VLQ value 0
    const input = 'A';
    const startPos = 0;

    // Act
    const result = decodeVlq(input, startPos);

    // Assert
    expect(result).toEqual([0, 1]);
  });

  test('decodes a positive single-digit VLQ', () => {
    // Arrange
    // 'C' = 2 in base64. VLQ: low bit = sign (0 = positive), remaining = 1 → value 1
    const input = 'C';
    const startPos = 0;

    // Act
    const result = decodeVlq(input, startPos);

    // Assert
    expect(result).toEqual([1, 1]);
  });

  test('decodes a negative single-digit VLQ', () => {
    // Arrange
    // 'D' = 3 in base64. VLQ: low bit = 1 (negative), remaining = 1 → value -1
    const input = 'D';
    const startPos = 0;

    // Act
    const result = decodeVlq(input, startPos);

    // Assert
    expect(result).toEqual([-1, 1]);
  });

  test('decodes a multi-character VLQ (continuation bit set)', () => {
    // Arrange
    // 'yB' encodes value 25:
    // 'y' = 50 = 0b110010 → continuation bit set, low 5 bits = 0b10010 = 18
    // 'B' = 1  = 0b000001 → continuation bit clear, value = 1
    // combined: (1 << 5) | 18 = 50, sign bit (low) = 0 → positive → 50 >> 1 = 25
    const input = 'yB';
    const startPos = 0;

    // Act
    const result = decodeVlq(input, startPos);

    // Assert
    expect(result).toEqual([25, 2]);
  });

  test('advances position correctly when starting mid-string', () => {
    // Arrange
    const input = 'AAA';
    const startPos = 1;

    // Act
    const [value, nextPos] = decodeVlq(input, startPos);

    // Assert
    expect(value).toBe(0);
    expect(nextPos).toBe(2);
  });

  test('stops at invalid character', () => {
    // Arrange
    // '!' is not a base64 VLQ character → indexOf returns -1 → loop breaks immediately
    const input = '!';
    const startPos = 0;

    // Act
    const [value, nextPos] = decodeVlq(input, startPos);

    // Assert
    expect(value).toBe(0);
    expect(nextPos).toBe(1); // pos was incremented before the break
  });
});

describe('buildSourceLineMap', () => {
  test('returns empty map for invalid JSON', () => {
    // Arrange
    const input = 'not json';

    // Act
    const map = buildSourceLineMap(input);

    // Assert
    expect(map.size).toBe(0);
  });

  test('returns empty map for missing mappings field', () => {
    // Arrange
    const input = JSON.stringify({ version: 3 });

    // Act
    const map = buildSourceLineMap(input);

    // Assert
    expect(map.size).toBe(0);
  });

  test('returns empty map for empty mappings string', () => {
    // Arrange
    const input = JSON.stringify({ mappings: '' });

    // Act
    const map = buildSourceLineMap(input);

    // Assert
    expect(map.size).toBe(0);
  });

  test('maps compiled line 1 to original line 1 for identity mapping', () => {
    // Arrange
    // Minimal source map: one segment on compiled line 1
    // Segment "AAAA": col=0, sources=0, line=0, col=0 → originalLine delta=0 → line 1
    const input = JSON.stringify({ mappings: 'AAAA' });

    // Act
    const map = buildSourceLineMap(input);

    // Assert
    expect(map.get(1)).toBe(1);
  });

  test('maps compiled lines to correct original lines across multiple compiled lines', () => {
    // Arrange
    // TypeScript-like: 2 preamble compiled lines (no mapping), then user code starts
    // mappings: ";;AACA" → compiled line 1 empty, line 2 empty, line 3 → original line 2
    // "AACA": col=0, sources=0, line delta=+1 (from 0) → originalLine=1 → line 2 (1-indexed)
    const input = JSON.stringify({ mappings: ';;AACA' });

    // Act
    const map = buildSourceLineMap(input);

    // Assert
    expect(map.get(1)).toBeUndefined();
    expect(map.get(2)).toBeUndefined();
    expect(map.get(3)).toBe(2);
  });

  test('only records the first segment per compiled line', () => {
    // Arrange
    // Two segments on compiled line 1: first maps to original line 1, second to line 3
    // "AAAA,AAEA": first=line 1, second=line delta +2 → original line 3
    const input = JSON.stringify({ mappings: 'AAAA,AAEA' });

    // Act
    const map = buildSourceLineMap(input);

    // Assert
    // First segment wins
    expect(map.get(1)).toBe(1);
  });

  test('handles a realistic TypeScript source map structure', () => {
    // Arrange
    // Simulate: TS source has 3 lines, compiled output has 3 lines starting at the same positions
    // Each compiled line maps back to the corresponding original line
    // mappings: "AAAA;AACA;AACA"
    // Line 1: AAAA → delta=0 → original line 1
    // Line 2: AACA → delta=+1 → original line 2
    // Line 3: AACA → delta=+1 → original line 3
    const input = JSON.stringify({ mappings: 'AAAA;AACA;AACA' });

    // Act
    const map = buildSourceLineMap(input);

    // Assert
    expect(map.get(1)).toBe(1);
    expect(map.get(2)).toBe(2);
    expect(map.get(3)).toBe(3);
  });

  test('skips segments with only one field (no source info)', () => {
    // Arrange
    // A segment with only a generated column (no sources index, no line) should be skipped
    // "A" = only generated column field, no further fields
    const input = JSON.stringify({ mappings: 'A' });

    // Act
    const map = buildSourceLineMap(input);

    // Assert
    expect(map.get(1)).toBeUndefined();
  });
});
