import type { Config } from '../../models';
import { compileBlocks } from '../compile-blocks';

describe('compileBlocks', () => {
  const config = { processors: [] } as unknown as Config;

  test('keeps several unprocessed blocks in document order', async () => {
    const code = `
export function App() @{
  <>
    <style>.message { color: blue; }</style>
    <div class="message">Hello</div>
    <Child />
  </>
}

function Child() @{
  <>
    <style>.notice { color: gray; }</style>
    <p class="notice">Notice</p>
  </>
}
`;
    expect(await compileBlocks(code, 'style', config)).toBe(code);
  });

  test('does not take a tag inside a comment for a block', async () => {
    const code = `
// A <style> block styles the elements beside it.
/* <style> in a block comment */
const base = <style>.a { color: red; }</style>;
export function App() @{
  <>
    <style>.b { color: blue; }</style>
    <div class="b">Hello</div>
  </>
}
`;
    expect(await compileBlocks(code, 'style', config, { ignoreComments: true })).toBe(code);
  });

  test('keeps a single block untouched', async () => {
    const code = `<template><div /></template>\n<style>div { color: red; }</style>\n`;
    expect(await compileBlocks(code, 'style', config)).toBe(code);
  });
});
