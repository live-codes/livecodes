export const getValidUrl = /* @__PURE__ */ (url: string) => {
  try {
    return url.startsWith('https://') ? new URL(url) : new URL('https://' + url);
  } catch (error) {
    return;
  }
};

export const hostPatterns = {
  github: /^(?:(?:http|https):\/\/)?github\.com\/(?:.*)/g,
  githubGist: /^(?:(?:http|https):\/\/)?gist\.github\.com(?:\/\S*)?\/(\w+)/g,
  gitlab: /^(?:(?:http|https):\/\/)?gitlab\.com\/(?:.*)/g,
  codepen: /^(?:(?:http|https):\/\/)?codepen\.io\/(\w+)\/pen\/(\w+)/g,
  jsbin: /^(?:(?:(?:http|https):\/\/)?(?:\w+.)?)?jsbin\.com\/((\w)+(\/\d+)?)(?:.*)/g,
  typescriptPlayground: /^(?:(?:http|https):\/\/)?(?:www\.)?typescriptlang\.org\/play(?:.*)/g,
  vuePlayground: /^(?:(?:http|https):\/\/)?play\.vuejs\.org(?:.*)/g,
  sveltePlayground: /^(?:(?:http|https):\/\/)?svelte\.dev\/repl\/(?:.*)/g,
};

export const isCompressedCode = (url: string) => url.startsWith('code/');

export const isCodepen = (url: string, pattern = new RegExp(hostPatterns.codepen)) =>
  pattern.test(url);

export const isDom = (url: string) => url.startsWith('dom/');

export const isGithubUrl = (url: string, pattern = new RegExp(hostPatterns.github)) => {
  if (!pattern.test(url)) return;
  try {
    const urlObj = getValidUrl(url);
    if (!urlObj) return;
    const pathSplit = urlObj.pathname.split('/');
    return pathSplit[3] === 'blob';
  } catch (error) {
    return;
  }
};

export const isGithub = (url: string) => isGithubDir(url) || isGithubUrl(url);

export const isGithubDir = (url: string, pattern = new RegExp(hostPatterns.github)) => {
  if (!pattern.test(url)) return;
  try {
    const urlObj = getValidUrl(url);
    if (!urlObj) return;
    let pathname = urlObj.pathname;
    if (urlObj.pathname.endsWith('/')) {
      pathname = urlObj.pathname.slice(0, -1);
    }
    const pathSplit = pathname.split('/');
    return pathSplit[3] === 'tree' || pathSplit.length === 3;
  } catch (error) {
    return;
  }
};

export const isGithubGist = (url: string, pattern = new RegExp(hostPatterns.githubGist)) =>
  pattern.test(url);

export const isGitlabUrl = (url: string, pattern = new RegExp(hostPatterns.gitlab)) => {
  if (!pattern.test(url)) return;
  try {
    const urlObj = getValidUrl(url);
    if (!urlObj) return;
    const pathSplit = urlObj.pathname.split('/');
    return pathSplit[4] === 'blob';
  } catch (error) {
    return;
  }
};

export const isGitlabDir = (url: string, pattern = new RegExp(hostPatterns.gitlab)) => {
  if (!pattern.test(url)) return;
  try {
    const urlObj = getValidUrl(url);
    if (!urlObj) return;
    let pathname = urlObj.pathname;
    if (urlObj.pathname.endsWith('/')) {
      pathname = urlObj.pathname.slice(0, -1);
    }
    const pathSplit = pathname.split('/');
    return pathSplit[4] === 'tree' || pathSplit.length === 3;
  } catch (error) {
    return;
  }
};

export const isGitlabSnippet = (url: string, pattern = new RegExp(hostPatterns.gitlab)) => {
  if (!pattern.test(url)) return;
  const urlObj = getValidUrl(url);
  if (!urlObj) return;
  const pathSplit = urlObj.pathname.split('/');
  return pathSplit[pathSplit.length - 2] === 'snippets';
};

export const isJsbin = (url: string, pattern = new RegExp(hostPatterns.jsbin)) => pattern.test(url);

export const isProjectId = (url: string) => url.startsWith('id/');

export const isTypescriptPlayground = (
  url: string,
  pattern = new RegExp(hostPatterns.typescriptPlayground),
) => pattern.test(url);

export const isVuePlayground = (url: string, pattern = new RegExp(hostPatterns.vuePlayground)) =>
  pattern.test(url);

export const isSveltePlayground = (
  url: string,
  pattern = new RegExp(hostPatterns.sveltePlayground),
) => pattern.test(url);
