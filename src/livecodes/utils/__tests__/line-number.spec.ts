import { toPositiveLineNumber } from '../line-number';

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
