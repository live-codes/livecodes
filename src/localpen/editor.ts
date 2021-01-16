import { monaco } from './monaco';

export const createEditor = async (options: any) => {
  const { container, baseUrl } = options;

  const monacoPath = baseUrl + 'vendor/monaco-editor';

  const stylesheet = document.createElement('link');
  stylesheet.setAttribute('rel', 'stylesheet');
  stylesheet.setAttribute('href', `${monacoPath}/monaco.css`);
  document.head.appendChild(stylesheet);

  (window as any).MonacoEnvironment = {
    getWorkerUrl(_moduleId: string, label: string) {
      if (label === 'json') return `${monacoPath}/json.worker.js`;
      if (label === 'css') return `${monacoPath}/css.worker.js`;
      if (label === 'scss') return `${monacoPath}/css.worker.js`;
      if (label === 'sass') return `${monacoPath}/css.worker.js`;
      if (label === 'less') return `${monacoPath}/css.worker.js`;
      if (label === 'html') return `${monacoPath}/html.worker.js`;
      if (label === 'typescript' || label === 'javascript') {
        return `${monacoPath}/ts.worker.js`;
      }
      return `${monacoPath}/editor.worker.js`;
    },
  };

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    jsx: monaco.languages.typescript.JsxEmit.React,
    jsxFactory: 'React.createElement',
    reactNamespace: 'React',
    allowNonTsExtensions: true,
    allowJs: false,
    target: monaco.languages.typescript.ScriptTarget.Latest,
    experimentalDecorators: true,
  });

  const editor = monaco.editor.create(container, {
    ...options,
    language: options.language === 'jsx' ? 'javascript' : options.language,
  });

  if (options.theme === 'vs-light') container.style.backgroundColor = '#fff';
  if (options.theme?.startsWith('http') || options.theme?.startsWith('./')) {
    fetch(options.theme)
      .then((res) => res.json())
      .then((data) => {
        monaco.editor.defineTheme('theme', data);
        monaco.editor.setTheme('theme');
        container.style.backgroundColor = data.colors['editor.background'];
      });
  }

  return editor;
};
