import Less from 'less/lib/less';
const less = Less();
less.PluginLoader = function () {};

export const render = less.render;
