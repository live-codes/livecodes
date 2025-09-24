export const addCodeInStyleBlocks = (css: string, html: string) => {
  // from compiler/compile-blocks.ts#compileBlocks
  const getBlockPattern = (el: 'style', langAttr = 'lang') =>
    `(<${el}\\s*)(?:([\\s\\S]*?)${langAttr}\\s*=\\s*["']([A-Za-z0-9 _]*)["'])?((?:[^>]*)>)([\\s\\S]*?)(<\\/${el}>)`;
  const pattern = getBlockPattern('style');
  for (const arr of [...html.matchAll(new RegExp(pattern, 'g'))]) {
    const content = arr[5];
    if (content?.trim()) {
      css += `\n${content}`;
    }
  }
  return css;
};
