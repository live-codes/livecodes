import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import type { StoryDef } from '../storybook/common';

const basePath = 'storybook';
const definitionsPath = path.join(basePath, '_stories');
const frameworks = ['preact', 'react', 'solid', 'svelte', 'vue', 'web-components'];

// TODO: fix this
const solidSDK = fs.readFileSync(path.join('src', 'sdk', 'solid.ts'), 'utf8');
const patchedSolidSDK =
  '/* eslint-disable */\n' +
  solidSDK.replaceAll('./index', 'livecodes').replaceAll('./models', 'livecodes');
fs.writeFileSync(path.join(basePath, 'solid', 'src', 'solid.ts'), patchedSolidSDK, 'utf8');

const readDefs = async (dir: string) => {
  const definitions: Array<{ name: string; title: string; stories: StoryDef }> = [];
  const items = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.ts') || fs.statSync(path.join(dir, name)).isDirectory());

  for (const name of items) {
    if (fs.statSync(path.join(dir, name)).isDirectory()) {
      definitions.push(...(await readDefs(path.join(dir, name))));
    } else {
      const storyName = name.replace('.ts', '');
      definitions.push({
        name: storyName,
        title: path.relative(definitionsPath, path.join(dir, storyName)).replaceAll(path.sep, '/'),
        stories: (await import('../' + path.join(dir, name))).default,
      });
    }
  }
  return definitions;
};
const storyDefs = await readDefs(definitionsPath);

const createStories = (def: { name: string; title: string; stories: StoryDef }): string =>
  `// AUTO-GENERATED — do not edit

/* eslint-disable */
import { defaultMeta, livecodesStory, type LiveCodes, type Meta } from '#src';

export default {
  ...defaultMeta,
  title: '${def.title}',
} satisfies Meta<typeof LiveCodes>;

${Object.entries(def.stories)
  .map(
    ([name, story]) =>
      `export const ${name} = livecodesStory(${JSON.stringify(story.props)});` +
      (story.storyName ? `\n${name}.storyName = '${story.storyName}';` : ''),
  )
  .join('\n')}
`;

for (const def of storyDefs) {
  const stories = createStories(def);
  for (const fw of frameworks) {
    const parentDir = path.dirname(def.title);
    const outPath = path.join(basePath, fw, 'stories', parentDir, `${def.name}.stories.ts`);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, stories);
  }
}

exec('npx prettier --write storybook/**/*.stories.ts', (error, stdout, stderr) => {
  if (error) {
    console.error(`failed to format stories: ${error}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
