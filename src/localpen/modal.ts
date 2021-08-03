interface ModalOptions {
  size?: 'large' | 'small';
  closeButton?: boolean;
  isAsync?: boolean;
  onClose?: () => void;
}

export const createModal = () => {
  const overlay = document.querySelector('#overlay') as HTMLElement;
  const modalContainer = document.querySelector('#modal-container') as HTMLElement;
  const modal = document.querySelector('#modal') as HTMLElement;
  let isOpening: boolean;

  const show = (
    container: HTMLElement,
    { size = 'large', closeButton = false, isAsync = false, onClose }: ModalOptions = {},
  ) => {
    modal.innerHTML = '';
    modal.className = size;
    modal.appendChild(container);

    if (closeButton) {
      const closeContainer = document.createElement('div');
      closeContainer.className = 'close-container';
      const closeBtn = document.createElement('button');
      closeBtn.className = 'button';
      closeBtn.innerHTML = 'Close';
      closeBtn.onclick = () => {
        close(onClose);
      };
      closeContainer.appendChild(closeBtn);
      modal.appendChild(closeContainer);
    }

    overlay.style.display = 'flex';
    modalContainer.style.display = 'flex';
    modal.style.display = 'flex';
    overlay.classList.remove('hidden');
    modalContainer.classList.remove('hidden');
    isOpening = true;
    document.addEventListener(
      'click',
      function onClickOutside(ev) {
        if (!modal?.contains(ev.target as Node) && !isOpening) {
          close(onClose);
          document.removeEventListener('click', onClickOutside);
        }
        isOpening = false;
      },
      false,
    );
    if (isAsync) {
      container.click();
    }
  };

  const close = (onClose?: () => void) => {
    if (typeof onClose === 'function') {
      onClose();
    }
    modal.innerHTML = '';
    modal.className = '';
    overlay.classList.add('hidden');
    modalContainer.classList.add('hidden');
    modal.style.display = 'none';
    setTimeout(() => {
      overlay.style.display = 'none';
      modalContainer.style.display = 'none';
      isOpening = false;
    }, 400);
  };

  return {
    show,
    close,
  };
};
