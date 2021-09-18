import { Pen } from '../models';
import { exportCodepen } from './export-codepen';
import { exportGithubGist } from './export-github-gist';
import { exportHTML } from './export-html';
import { exportJsfiddle } from './export-jsfiddle';
import { exportJSON } from './export-json';
import { exportSrc } from './export-src';

type ExportType = 'json' | 'src' | 'html' | 'codepen' | 'jsfiddle' | 'githubGist';
type ExportFunctions = {
  [key in ExportType]: (config: Pen, payload?: any, baseUrl?: string) => void;
};
export const exportPen = (config: Pen, baseUrl: string, type: ExportType, payload?: any) => {
  const exportFns: ExportFunctions = {
    json: exportJSON,
    src: exportSrc,
    html: exportHTML,
    codepen: exportCodepen,
    jsfiddle: exportJsfiddle,
    githubGist: exportGithubGist,
  };

  exportFns[type](config, payload, baseUrl);
};
