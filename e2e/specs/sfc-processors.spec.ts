import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp, waitForEditorFocus } from '../helpers';

test.describe('Preprocessors', () => {
  test('in Vue', async ({ page, getTestUrl }) => {
    const sfc = `
<template lang="pug">
ul
  each val, index in ['hello', 'p', 'u', 'g']
    li(class= (index === 0 ? "primary" : undefined))
      span= (index === 0 ? val + " {{msg}}" : val)
</template>
<script lang="ts">
  const msg: string = "world!";
  export default { data() { return { msg } } };
</script>

<style lang="scss" scoped>
  $primary-color: rgb(255, 0, 0);
  .primary { color: $primary-color; }
</style>

<style lang="stylus">
li
  color rgb(0, 0, 255)
</style>
`;

    await page.goto(getTestUrl({ vue: encodeURIComponent(sfc) }));

    const { getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForResultUpdate();

    expect(await getResult().innerText(':nth-match(li, 1)')).toContain('hello world!');
    expect(await getResult().innerText(':nth-match(li, 2)')).toContain('p');
    expect(await getResult().innerText(':nth-match(li, 3)')).toContain('u');
    expect(await getResult().innerText(':nth-match(li, 4)')).toContain('g');
    expect(await getResult().$eval(':nth-match(li, 1)', (e) => getComputedStyle(e).color)).toBe(
      'rgb(255, 0, 0)',
    );
    expect(await getResult().$eval(':nth-match(li, 2)', (e) => getComputedStyle(e).color)).toBe(
      'rgb(0, 0, 255)',
    );
  });

  test('in Svelte', async ({ page, getTestUrl }) => {
    //     const sfc = `
    // <script lang="ts">
    //   export const msg: string = 'world!';
    // </script>

    // <template lang="pug">
    // ul
    //   each val, index in ['hello', 'p', 'u', 'g']
    //     li(class= (index === 0 ? "primary" : undefined))
    //       span= (index === 0 ? val + " {msg}" : val)
    // </template>

    // <style lang="scss" scoped>
    // $primary-color: rgb(255, 0, 0);
    // .primary {
    //     color: $primary-color;
    //   }
    // </style>
    // `;

    await page.goto(getTestUrl({ x: 'id/eizjn66v746' }));

    const { getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForResultUpdate({ timeout: 20000 });

    expect(await getResult().innerText(':nth-match(li, 1)')).toContain('hello world!');
    expect(await getResult().innerText(':nth-match(li, 2)')).toContain('p');
    expect(await getResult().innerText(':nth-match(li, 3)')).toContain('u');
    expect(await getResult().innerText(':nth-match(li, 4)')).toContain('g');
    expect(await getResult().$eval(':nth-match(li, 1)', (e) => getComputedStyle(e).color)).toBe(
      'rgb(255, 0, 0)',
    );
    expect(await getResult().$eval(':nth-match(li, 2)', (e) => getComputedStyle(e).color)).toBe(
      'rgb(0, 0, 0)',
    );
  });

  test('in Riot.js', async ({ page, getTestUrl }) => {
    const sfc = `
demo
  ul
    each val, index in ['hello', 'p', 'u', 'g']
      li(class= (index === 0 ? "primary" : undefined))
        span= (index === 0 ? val + " {this.state.msg}" : val)
  style(type= "scss") $primary-color: rgb(255, 0, 0); .primary { color: $primary-color; }
  script(type= "ts") export default {onBeforeMount(props, state) {const msg: string = 'world!'; this.state = {msg}}}
`.trimStart();

    await page.goto(
      getTestUrl({
        html: encodeURIComponent('<demo></demo>'),
        riot: encodeURIComponent(sfc),
      }),
    );

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{ "riot": { "template": "pug" } }`);
    await app.click('button:has-text("Load"):visible');

    await waitForResultUpdate();

    expect(await getResult().innerText(':nth-match(li, 1)')).toContain('hello world!');
    expect(await getResult().innerText(':nth-match(li, 2)')).toContain('p');
    expect(await getResult().innerText(':nth-match(li, 3)')).toContain('u');
    expect(await getResult().innerText(':nth-match(li, 4)')).toContain('g');
    expect(await getResult().$eval(':nth-match(li, 1)', (e) => getComputedStyle(e).color)).toBe(
      'rgb(255, 0, 0)',
    );
    expect(await getResult().$eval(':nth-match(li, 2)', (e) => getComputedStyle(e).color)).toBe(
      'rgb(0, 0, 0)',
    );
  });
});
