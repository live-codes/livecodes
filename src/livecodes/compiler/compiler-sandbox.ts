export const createCompilerSandbox = (sandboxUrl: string): Promise<Window> =>
  new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.name = 'compiler';
    iframe.id = 'compiler-frame';
    // display: 'none' causes problems with mermaid.js renedering
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.visibility = 'hidden';
    iframe.style.position = 'absolute';
    iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
    iframe.src = sandboxUrl;
    document.body.appendChild(iframe);
    iframe.onload = () => {
      resolve(iframe.contentWindow as Window);
    };
  });
