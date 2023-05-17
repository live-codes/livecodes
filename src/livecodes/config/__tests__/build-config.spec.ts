// @ts-nocheck
import type { Config } from '../../models';
import { getParams, loadParamConfig } from '../build-config';
import { defaultConfig } from '../default-config';

describe('loadParamConfig', () => {
  test('?js', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, { js: '' });
    expect(output.activeEditor).toEqual('script');
  });

  test('?js=console.log("hi");', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, { js: 'console.log("hi");' });
    expect(output.script).toEqual({
      language: 'javascript',
      content: 'console.log("hi");',
    });
  });

  test('?js=console.log("hi");&html=hello world!', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      js: 'console.log("hi");',
      html: 'hello world!',
    });

    expect(output.script).toEqual({
      language: 'javascript',
      content: 'console.log("hi");',
    });
    expect(output.markup).toEqual({
      language: 'html',
      content: 'hello world!',
    });
    expect(output.activeEditor).toEqual('script');
  });

  test('?ts', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      lang: 'ts',
    });
    expect(output.script).toEqual({
      language: 'typescript',
      content: '',
    });
    expect(output.activeEditor).toEqual('script');
  });

  test('?lang=scss', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      lang: 'scss',
    });
    expect(output.style).toEqual({
      language: 'scss',
      content: '',
    });
    expect(output.activeEditor).toEqual('style');
  });

  test('?language=md', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      language: 'md',
    });
    expect(output.markup).toEqual({
      language: 'markdown',
      content: '',
    });
    expect(output.activeEditor).toEqual('markup');
  });

  test('?stylus&jsx&mdx', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      stylus: '',
      jsx: '',
      mdx: '',
    });
    expect(output.markup).toEqual({
      language: 'mdx',
      content: '',
    });
    expect(output.style).toEqual({
      language: 'stylus',
      content: '',
    });
    expect(output.script).toEqual({
      language: 'jsx',
      content: '',
    });
    expect(output.activeEditor).toEqual('style');
  });

  test('?html=hi&scss&ls', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      html: 'hi',
      scss: '',
      ls: '',
    });
    expect(output.markup).toEqual({
      language: 'html',
      content: 'hi',
    });
    expect(output.style).toEqual({
      language: 'scss',
      content: '',
    });
    expect(output.script).toEqual({
      language: 'livescript',
      content: '',
    });
    expect(output.activeEditor).toEqual('markup');
  });

  test('?html=hi&scss=body{color:blue;}&ts=//hi&lang=scss', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      html: 'hi',
      scss: 'body{color:blue;}',
      ts: '//hi',
      lang: 'scss',
    });
    expect(output.markup).toEqual({
      language: 'html',
      content: 'hi',
    });
    expect(output.style).toEqual({
      language: 'scss',
      content: 'body{color:blue;}',
    });
    expect(output.script).toEqual({
      language: 'typescript',
      content: '//hi',
    });
    expect(output.activeEditor).toEqual('style');
  });

  test('?html=hi&md=hello', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      html: 'hi',
      md: 'hello',
    });
    expect(output.markup).toEqual({
      language: 'html',
      content: 'hi',
    });
    expect(output.activeEditor).toEqual('markup');
  });

  test('?md=hello&html=hi', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      md: 'hello',
      html: 'hi',
    });
    expect(output.markup).toEqual({
      language: 'markdown',
      content: 'hello',
    });
    expect(output.activeEditor).toEqual('markup');
  });

  test('?languages=html,md,css,ts', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      languages: 'html,md,css,ts',
    });
    expect(output.languages).toEqual(['html', 'markdown', 'css', 'typescript']);
  });

  test('?languages= html, md, css, ts', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      languages: ' html, md, css, ts',
    });
    expect(output.languages).toEqual(['html', 'markdown', 'css', 'typescript']);
  });

  test('?activeEditor=style', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      activeEditor: 'style',
    });
    expect(output.activeEditor).toEqual('style');
  });

  test('?activeEditor=1', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      activeEditor: '1',
    });
    expect(output.activeEditor).toEqual('style');
  });

  test('?active=style', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      active: 'style',
    });
    expect(output.activeEditor).toEqual('style');
  });

  test('?active=1', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      active: '1',
    });
    expect(output.activeEditor).toEqual('style');
  });

  test('?tags=js,advanced,proof-of-concept', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      tags: 'js,advanced,proof-of-concept',
    });
    expect(output.tags).toEqual(['js', 'advanced', 'proof-of-concept']);
  });

  test('?tags=js, advanced, proof-of-concept', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      tags: 'js, advanced, proof-of-concept',
    });
    expect(output.tags).toEqual(['js', 'advanced', 'proof-of-concept']);
  });

  test('?stylesheets', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      stylesheets:
        'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.css,https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap-grid.css',
    });
    expect(output.stylesheets).toEqual([
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.css',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap-grid.css',
    ]);
  });

  test('?stylesheets (with spaces)', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      stylesheets:
        'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.css, https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap-grid.css',
    });
    expect(output.stylesheets).toEqual([
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.css',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap-grid.css',
    ]);
  });

  test('?scripts', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      scripts:
        'https://cdn.jsdelivr.net/npm/jquery@3.2/dist/jquery.min.js,https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js',
    });
    expect(output.scripts).toEqual([
      'https://cdn.jsdelivr.net/npm/jquery@3.2/dist/jquery.min.js',
      'https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js',
    ]);
  });

  test('?scripts (with spaces)', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      scripts:
        'https://cdn.jsdelivr.net/npm/jquery@3.2/dist/jquery.min.js, https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js',
    });
    expect(output.scripts).toEqual([
      'https://cdn.jsdelivr.net/npm/jquery@3.2/dist/jquery.min.js',
      'https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js',
    ]);
  });

  test('?tools=none', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      tools: 'none',
    });
    expect(output.tools).toEqual({
      enabled: [],
      active: '',
      status: 'none',
    });
  });

  test('?tools=open', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      tools: 'open',
    });
    expect(output.tools).toEqual({
      enabled: 'all',
      active: '',
      status: 'open',
    });
  });

  test('?console=open', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      console: 'open',
    });
    expect(output.tools).toEqual({
      enabled: 'all',
      active: 'console',
      status: 'open',
    });
  });

  test('?console=true', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, getParams('?console=true'));
    expect(output.tools).toEqual({
      enabled: 'all',
      active: 'console',
      status: 'open',
    });
  });

  test('?console', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, getParams('?console'));
    expect(output.tools).toEqual({
      enabled: 'all',
      active: 'console',
      status: 'open',
    });
  });

  test('?compiled=full', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      compiled: 'full',
    });
    expect(output.tools).toEqual({
      enabled: 'all',
      active: 'compiled',
      status: 'full',
    });
  });

  test('?compiled=open&console=open', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      compiled: 'open',
      console: 'open',
    });
    expect(output.tools).toEqual({
      enabled: 'all',
      active: 'compiled',
      status: 'open',
    });
  });

  test('?compiled=open&console=none', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      compiled: 'open',
      console: 'none',
    });
    expect(output.tools).toEqual({
      enabled: ['compiled', 'tests'],
      active: 'compiled',
      status: 'open',
    });
  });

  test('?console=none', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      console: 'none',
    });
    expect(output.tools).toEqual({
      enabled: ['compiled', 'tests'],
      active: '',
      status: 'closed',
    });
  });

  test('?tools=open&console=none&compiled=none', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      tools: 'open',
      console: 'none',
      compiled: 'none',
    });
    expect(output.tools).toEqual({
      enabled: ['tests'],
      active: '',
      status: 'open',
    });
  });

  test('?tests=open&console=none&compiled=none', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      tests: 'open',
      console: 'none',
      compiled: 'none',
    });
    expect(output.tools).toEqual({
      enabled: ['tests'],
      active: 'tests',
      status: 'open',
    });
  });

  test('?tools=tests,console|open', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      tools: 'tests,console|open',
    });
    expect(output.tools).toEqual({
      enabled: ['tests', 'console'],
      active: 'tests',
      status: 'open',
    });
  });

  test('?mode=result', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      mode: 'result',
    });
    expect(output.tools).toEqual({
      enabled: [],
      active: '',
      status: 'none',
    });
  });

  test('?mode=editor', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      mode: 'editor',
    });
    expect(output.tools).toEqual({
      enabled: [],
      active: '',
      status: 'none',
    });
  });

  test('?mode=codeblock', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      mode: 'codeblock',
    });
    expect(output.tools).toEqual({
      enabled: [],
      active: '',
      status: 'none',
    });
  });

  test('?mode=full', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      mode: 'full',
    });
    expect(output.tools).toEqual(undefined);
  });

  test('?mode=result&console=closed', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      mode: 'result',
      console: 'closed',
    });
    expect(output.tools).toEqual({
      enabled: 'all',
      active: 'console',
      status: 'closed',
    });
  });

  test('?mode=result&console=open', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      mode: 'result',
      console: 'open',
    });
    expect(output.tools).toEqual({
      enabled: 'all',
      active: 'console',
      status: 'open',
    });
  });

  test('?mode=result&compiled=open', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      mode: 'result',
      compiled: 'open',
    });
    expect(output.tools).toEqual({
      enabled: 'all',
      active: 'compiled',
      status: 'open',
    });
  });

  test('?mode=result&tools=open', () => {
    const output: Partial<Config> = loadParamConfig(defaultConfig, {
      mode: 'result',
      tools: 'open',
    });
    expect(output.tools).toEqual({
      enabled: 'all',
      active: '',
      status: 'open',
    });
  });
});
