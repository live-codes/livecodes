/**
 * Returns the name of the last HTML/JSX tag that is open at the end of the supplied text,
 * if any. The text should be the content before the cursor (it may span multiple lines).
 *
 * When `isJsx` is `true`, a `<` preceded by an identifier or a closing bracket is treated
 * as a comparison operator rather than the start of a tag.
 */
export const getUnclosedTag = /* @__PURE__ */ (text: string, isJsx = false): string | undefined => {
  // tags before the last `>` are closed; look for an opening tag after it
  let tagStart = text.indexOf('<', text.lastIndexOf('>') + 1);

  while (tagStart !== -1) {
    const tagText = text.slice(tagStart);
    const tag = /^<([a-zA-Z][\w-]*)/.exec(tagText)?.[1];
    const charBeforeTag = text[tagStart - 1];

    if (tag && !tagText.trimEnd().endsWith('/')) {
      // `<` preceded by an identifier or a closing bracket is a comparison operator (e.g. `i<j`)
      if (!isJsx || !charBeforeTag || !/[\w$)\].]/.test(charBeforeTag)) {
        return tag;
      }
    }

    tagStart = text.indexOf('<', tagStart + 1);
  }

  return undefined;
};
