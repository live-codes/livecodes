import { Template } from '../../models';

export const rStarter: Template = {
  name: 'r',
  title: 'R Starter',
  thumbnail: 'assets/templates/r.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div id="output">Loading...</div>

<script>
  livecodes.r.config = {
    container: '#output',
    canvasHeight: 309,
    canvasWidth: 500,
  };
</script>
`.trimStart(),
  },
  style: {
    language: 'css',
    content: '',
  },
  script: {
    language: 'r',
    content: `
library(dplyr)
library(ggplot2)

head(diamonds)

diamonds %>%
  filter(depth > 60) %>%
  group_by(cut) %>%
  summarize(mean_price = mean(price)) %>%
  ggplot(aes(x = cut, y = mean_price, fill = cut)) +
      geom_bar(stat = "identity")
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
