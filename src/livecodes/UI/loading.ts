export const loadingMessage = () => {
  const loadingDiv = document.createElement('div');
  loadingDiv.innerHTML = `Loading...`;
  loadingDiv.classList.add('modal-message');
  return loadingDiv;
};
