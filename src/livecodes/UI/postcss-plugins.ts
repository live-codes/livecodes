export const createPluginItem = (plugin: { name: string; title: string }) => {
  const pluginItem = document.createElement('li');
  pluginItem.classList.add('language-item', 'processor-item');
  pluginItem.innerHTML = `
        <label class="switch">
          <span>${plugin.title}</span>
          <div>
            <input id="${plugin.name}" type="checkbox" data-plugin="${plugin.name}" />
            <span class="slider round"></span>
          </div>
        </label>
        `;
  return pluginItem;
};
