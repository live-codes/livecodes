interface ModalOptions {
  size?: 'large' | 'small';
  closeButton?: boolean;
  isAsync?: boolean;
  onClose?: () => void;
  scrollToSelector?: string;
}

export const createModal = () => {
  const overlay = document.querySelector('#overlay') as HTMLElement;
  const modalContainer = document.querySelector('#modal-container') as HTMLElement;
  const modal = document.querySelector('#modal') as HTMLElement;
  let isOpening: boolean;
  let onCloseFn: () => void = () => undefined;

  const show = (
    container: HTMLElement,
    {
      size = 'large',
      closeButton = false,
      isAsync = false,
      onClose = () => undefined,
      scrollToSelector = '',
    }: ModalOptions = {},
  ) => {
    modal.innerHTML = '';
    modal.className = size;
    modal.appendChild(container);
    onCloseFn = onClose;

    if (scrollToSelector) {
      setTimeout(() => {
        const target = container.querySelector<HTMLElement>(scrollToSelector);
        container.style.scrollBehavior = 'smooth';
        if (target) {
          target.scrollIntoView();
        }
      }, 500);
    }

    if (closeButton) {
      const closeContainer = document.createElement('div');
      closeContainer.className = 'close-container';
      const closeBtn = document.createElement('button');
      closeBtn.classList.add('button');
      closeBtn.innerHTML = 'Close';
      closeBtn.onclick = close;
      closeContainer.appendChild(closeBtn);
      modal.appendChild(closeContainer);
    }

    const cornerCloseBtn = document.createElement('div');
    cornerCloseBtn.classList.add('close-button');
    // Replace with span for icon css
    const iconCSS = '<span class="icon-close-button"></span>';
    cornerCloseBtn.innerHTML = iconCSS;
    cornerCloseBtn.title = 'Esc';
    cornerCloseBtn.onclick = close;
    modal.appendChild(cornerCloseBtn);

    overlay.style.display = 'flex';
    modalContainer.style.display = 'flex';
    modal.style.display = 'flex';
    overlay.classList.remove('hidden');
    modalContainer.classList.remove('hidden');
    isOpening = true;
    // remove previous event listener if it was not cleared
    document.removeEventListener('click', onClickOutside);
    document.removeEventListener('keydown', escapeListener);
    document.addEventListener('click', onClickOutside, false);
    document.addEventListener('keydown', escapeListener, false);
    if (isAsync) {
      container.click();
    }
  };

  const close = () => {
    if (typeof onCloseFn === 'function') {
      onCloseFn();
    }
    document.removeEventListener('click', onClickOutside);
    document.removeEventListener('keydown', escapeListener);

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

  function onClickOutside(ev: Event) {
    const notificationBar = document.querySelector('.snackbar');
    if (
      !modal?.contains(ev.target as Node) &&
      !notificationBar?.contains(ev.target as Node) &&
      !isOpening
    ) {
      close();
    }
    isOpening = false;
  }

  const escapeListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && !(window as any).watchingEscape) {
      close();
      event.preventDefault();
    }
  };

  return {
    show,
    close,
  };
};
