import { highlightjsStylesUrl, mermaidCdnUrl } from '../../vendors';

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('pre.mermaid')) {
    const script = document.createElement('script');
    script.src = mermaidCdnUrl;
    script.type = 'module';
    document.body.appendChild(script);
  }
  if (document.querySelector('code.hljs')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = highlightjsStylesUrl;
    document.head.appendChild(link);
  }
});
