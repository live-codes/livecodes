import { Pen } from '../models';
import { exportCodepen } from './export-codepen';
import { exportHTML } from './export-html';
import { exportJsfiddle } from './export-jsfiddle';
import { exportJSON } from './export-json';
import { exportSrc } from './export-src';

type ExportType = 'json' | 'src' | 'html' | 'codepen' | 'jsfiddle';
type ExportFunctions = {
  [key in ExportType]: (config: Pen, payload?: any) => void;
};
export const exportPen = (config: Pen, type: ExportType, payload?: any) => {
  const exportFns: ExportFunctions = {
    json: exportJSON,
    src: exportSrc,
    html: exportHTML,
    codepen: exportCodepen,
    jsfiddle: exportJsfiddle,
  };

  exportFns[type](config, payload);
};
