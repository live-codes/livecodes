export const createNotifications = (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement;
  if (!element) {
    throw new Error('element ' + element + ' not found');
  }

  const show = () => {
    element.style.display = 'inline-block';
    element.classList.remove('hidden');
  };

  const hide = () => {
    element.classList.add('hidden');
  };

  const message = (message: string) => {
    element.innerHTML = message;
    show();
    setTimeout(() => {
      hide();
    }, 2000);
  };

  const error = (message: string) => {
    element.innerHTML = message;
    element.classList.add('error');
    show();
    setTimeout(() => {
      hide();
      element.classList.remove('error');
    }, 2000);
  };

  return {
    message,
    error,
  };
};
