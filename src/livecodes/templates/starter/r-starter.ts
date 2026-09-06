import type { Template } from '../../models';

export const rStarter: Template = {
  name: 'r',
  aliases: ['r-lang', 'rlang'],
  title: window.deps.translateString('templates.starter.r', 'R Starter'),
  thumbnail: 'assets/templates/r.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div id="output">Loading...</div>

<script>
  // livecodes.r.config = {
  //   container: '#output',
  //   canvasHeight: 309,
  //   canvasWidth: 500,
  //   canvasPointSize: 12,
  //   canvasBackground: 'transparent',
  // };
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
head(iris)

PW <- iris$Petal.Width
PL <- iris$Petal.Length
species <- iris$Species
speciesID <- as.numeric(iris$Species)

fit <- lm(PW ~ PL)
summary(fit)

plot(PL, PW,
     pch = speciesID,
     col = speciesID,
     main = "Petal Width vs Length",
     xlab = "Petal Length",
     ylab = "Petal Width")
legend("topleft",
       levels(species),
       pch = 1:3,
       col = 1:3)


## This will take some time to load the packages

# library(dplyr)
# library(ggplot2)

# head(diamonds)

# diamonds %>%
#   filter(depth > 60) %>%
#   group_by(cut) %>%
#   summarize(mean_price = mean(price)) %>%
#   ggplot(aes(x = cut, y = mean_price, fill = cut)) +
#       geom_bar(stat = "identity")
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
