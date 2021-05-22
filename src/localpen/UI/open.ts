export const createOpenItem = (
  item: { id: string; title: string; lastModified: number },
  list: HTMLElement,
) => {
  const li = document.createElement('li');
  list.appendChild(li);

  const link = document.createElement('a');
  link.href = '#';
  link.dataset.id = item.id;
  link.classList.add('open-project-link');
  link.innerHTML = `
    <div class="open-title">${item.title}</div>
    <div class="modified-date"><span>Last modified: </span>${new Date(
      item.lastModified,
    ).toLocaleString()}</div>
  `;
  li.appendChild(link);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  li.appendChild(deleteButton);

  return { link, deleteButton };
};
