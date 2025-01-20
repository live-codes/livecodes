import type { Modal, ModalOptions } from '../models';
import { hasOpenNotifications } from '../notifications';
import { isFocusable } from '../utils';
import { createAccordion } from './accordion';

export const createModal = (deps: {
  translate: (container: HTMLElement) => void;
  onClose: () => void;
}): Modal => {
  const overlay = document.querySelector('#overlay') as HTMLElement;
  const modalContainer = document.querySelector('#modal-container') as HTMLElement;
  const modal = document.querySelector('#modal') as HTMLDialogElement;
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
      autoFocus = true,
    }: ModalOptions = {},
  ) => {
    modal.className = size;
    modalContainer.innerHTML = '';
    modalContainer.appendChild(container);
    deps.translate(modal);
    onCloseFn = onClose;

    document.querySelectorAll('.menu-scroller').forEach((el) => {
      el.classList.add('hidden');
    });

    createAccordion({ container, open: true });

    if (closeButton) {
      const closeContainer = document.createElement('div');
      closeContainer.className = 'close-container';
      const closeBtn = document.createElement('button');
      closeBtn.classList.add('button');
      closeBtn.innerHTML = window.deps.translateString('generic.close', 'Close');
      closeBtn.onclick = close;
      closeContainer.appendChild(closeBtn);
      modalContainer.appendChild(closeContainer);
    }

    const cornerCloseBtn = document.createElement('button');
    cornerCloseBtn.classList.add('close-button');
    const iconCSS = '<span class="icon-close"></span>';
    cornerCloseBtn.innerHTML = iconCSS;
    cornerCloseBtn.title = 'Esc';
    cornerCloseBtn.onclick = close;
    modalContainer.appendChild(cornerCloseBtn);

    overlay.style.display = 'flex';
    if (!modal.open) {
      modal.showModal();
    }
    overlay.classList.remove('hidden');

    setTimeout(() => {
      if (scrollToSelector) {
        const target = container.querySelector<HTMLElement>(scrollToSelector);
        modalContainer.style.scrollBehavior = 'smooth';
        if (target) {
          target.scrollIntoView();
          target.focus();
        }
      } else if (autoFocus) {
        modal.focus();
      }
    }, 500);

    isOpening = true;
    // remove previous event listener if it was not cleared
    document.removeEventListener('click', onClickOutside);
    document.removeEventListener('keydown', keydownListener);
    document.addEventListener('click', onClickOutside, false);
    document.addEventListener('keydown', keydownListener, false);
    if (isAsync) {
      container.click();
    }
  };

  const close = () => {
    if (typeof onCloseFn === 'function') {
      onCloseFn();
    }
    document.removeEventListener('click', onClickOutside);
    document.removeEventListener('keydown', keydownListener);

    overlay.classList.add('hidden');
    modalContainer.innerHTML = '';
    modal.className = '';
    modal.close();
    setTimeout(() => {
      overlay.style.display = 'none';
      isOpening = false;
    }, 400);
    deps.onClose();
  };

  function onClickOutside(ev: Event) {
    const notificationsBar = modal.querySelector('.snackbars-left');
    if (
      !modalContainer?.contains(ev.target as Node) &&
      !notificationsBar?.contains(ev.target as Node) &&
      !isOpening
    ) {
      close();
    }
    requestAnimationFrame(() => {
      isOpening = false;
    });
  }

  const keydownListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (!hasOpenNotifications()) {
        close();
      }
    }
    if (event.key === 'Enter' || event.key === 'Space') {
      const activeElement = document.activeElement as HTMLElement;
      if (!isFocusable(activeElement) || activeElement.dataset.clickonenter === 'true') {
        event.preventDefault();
        activeElement?.click?.();
      }
    }
  };

  return {
    show,
    close,
  };
};
