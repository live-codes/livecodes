window.addEventListener('load', function () {
  const script = document.querySelector('script[type="text/commonlisp"]');
  const source = script?.innerHTML;
  if (source?.trim()) {
    (window as any).jscl.evaluateString('(progn ' + source + ')');
  }
});
