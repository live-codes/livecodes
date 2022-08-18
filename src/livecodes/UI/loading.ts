export const loadingMessage = (message = 'Loading...') => {
  const loadingDiv = document.createElement('div');
  loadingDiv.innerHTML = message;
  loadingDiv.classList.add('modal-message');
  return loadingDiv;
};
