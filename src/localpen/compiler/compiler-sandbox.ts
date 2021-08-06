export const createCompilerSandbox = (sandboxUrl: string): Promise<Window> =>
  new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.name = 'compiler';
    iframe.id = 'compiler-frame';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.style.display = 'none';
    iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
    iframe.src = sandboxUrl;
    document.body.appendChild(iframe);
    iframe.onload = () => {
      resolve(iframe.contentWindow as Window);
    };
  });
