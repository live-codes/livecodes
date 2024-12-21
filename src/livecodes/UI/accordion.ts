export const createAccordion = ({
  container = document,
  single,
  open,
}: {
  container: HTMLElement | Document;
  single?: boolean;
  open?: boolean;
}) => {
  const toggle = (title: HTMLElement) => {
    const panel = title.nextElementSibling;
    if (!panel || !(panel instanceof HTMLElement) || !panel.classList.contains('panel')) return;

    if (title.classList.contains('active')) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    } else {
      panel.style.maxHeight = '';
    }
  };

  const accordions = container.querySelectorAll('.accordion');
  accordions.forEach((accordion) => {
    const titles = accordion.querySelectorAll<HTMLElement>('.title');
    let isOpen = false;
    titles.forEach((title) => {
      if (title.classList.contains('active')) {
        toggle(title);
        isOpen = true;
      }
      title.addEventListener('click', (ev) => {
        ev.preventDefault();
        title.classList.toggle('active');
        toggle(title);
        if (
          (single ?? accordion.classList.contains('single')) &&
          title.classList.contains('active')
        ) {
          titles.forEach((t) => {
            if (t !== title) {
              t.classList.remove('active');
              toggle(t);
            }
          });
        }
      });
    });
    if (open && !isOpen) {
      titles[0].classList.add('active');
      toggle(titles[0]);
    }
  });
};
