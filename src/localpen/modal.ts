export const createModal = () => {
  const overlay = document.querySelector('#overlay') as HTMLElement;
  const modalContainer = document.querySelector('#modal-container') as HTMLElement;
  const modal = document.querySelector('#modal') as HTMLElement;
  let isOpen: boolean;

  const show = (container: Element, className = '') => {
    modal.innerHTML = '';
    modal.className = className;
    modal.appendChild(container);

    overlay.style.display = 'flex';
    modalContainer.style.display = 'flex';
    modal.style.display = 'flex';
    overlay.classList.remove('hidden');
    modalContainer.classList.remove('hidden');
    isOpen = true;
    document.addEventListener('click', clickOutside, false);
  };

  const close = () => {
    modal.innerHTML = '';
    modal.className = '';
    overlay.classList.add('hidden');
    modalContainer.classList.add('hidden');
    modal.style.display = 'none';
    document.removeEventListener('click', clickOutside, false);
    setTimeout(() => {
      overlay.style.display = 'none';
      modalContainer.style.display = 'none';
    }, 400);
  };

  function clickOutside(event: Event) {
    if (!modal.contains(event.target as Node) && !isOpen) {
      close();
    }
    isOpen = false;
  }

  return {
    show,
    close,
  };
};
