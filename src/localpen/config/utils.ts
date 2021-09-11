import { ContentPen, Pen } from '../models';

export const getContentConfig = (config: Pen): ContentPen => ({
  title: config.title,
  description: config.description,
  tags: config.tags,
  activeEditor: config.activeEditor,
  languages: config.languages,
  markup: config.markup,
  style: config.style,
  script: config.script,
  stylesheets: config.stylesheets,
  scripts: config.scripts,
  cssPreset: config.cssPreset,
  processors: config.processors,
  customSettings: config.customSettings,
  imports: config.imports,
  types: config.types,
  version: config.version,
});
