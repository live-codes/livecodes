import {
  compressToEncodedURIComponent,
  decompressFromBase64,
  decompressFromEncodedURIComponent,
} from 'lz-string';

export const compress = compressToEncodedURIComponent;
export const decompress = (compressed: string, isJSON = true) => {
  const decoded = decompressFromEncodedURIComponent(compressed);
  if (decoded) {
    if (!isJSON) return decoded;
    try {
      if (JSON.parse(decoded)) {
        return decoded;
      }
    } catch {
      //
    }
  }
  // for backward compatibility
  return decompressFromBase64(compressed);
};
