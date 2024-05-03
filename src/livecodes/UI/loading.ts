export const loadingMessage = (
  message = window.deps.translateString('loading.defaultMessage', 'Loading...'),
) => {
  const loadingDiv = document.createElement('div');
  loadingDiv.innerHTML = message;
  loadingDiv.classList.add('modal-message');
  return loadingDiv;
};
