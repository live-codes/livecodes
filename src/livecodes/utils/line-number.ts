export const toPositiveLineNumber = (line: unknown): number | undefined => {
  if (typeof line !== 'number' || !Number.isFinite(line) || line <= 0) return undefined;
  return Math.trunc(line);
};
