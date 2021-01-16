// clear previously set global variables
(function () {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  const currentWindowVariables = Object.getOwnPropertyNames(window);
  const results = currentWindowVariables.filter(
    (prop) => !iframe.contentWindow.hasOwnProperty(prop),
  );
  results.forEach((variable) => {
    delete window[variable];
  });
  document.body.removeChild(iframe);
})();
