import { Config } from '../models';
import { exportCodepen } from './export-codepen';
import { exportGithubGist } from './export-github-gist';
import { exportHTML } from './export-html';
import { exportJsbin } from './export-jsbin';
import { exportJsfiddle } from './export-jsfiddle';
import { exportJSON } from './export-json';
import { exportSrc } from './export-src';

export type ExportType = 'json' | 'src' | 'html' | 'codepen' | 'jsfiddle' | 'jsbin' | 'githubGist';
type ExportFunctions = {
  [key in ExportType]: (config: Config, payload?: any, baseUrl?: string) => void;
};
export const exportConfig = (config: Config, baseUrl: string, type: ExportType, payload?: any) => {
  const exportFns: ExportFunctions = {
    json: exportJSON,
    src: exportSrc,
    html: exportHTML,
    codepen: exportCodepen,
    jsfiddle: exportJsfiddle,
    jsbin: exportJsbin,
    githubGist: exportGithubGist,
  };

  exportFns[type](config, payload, baseUrl);
};
