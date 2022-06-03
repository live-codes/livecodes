import { Processors } from '../models';
import { postcss } from './postcss';
export * from './postcss';

export const processors: Processors[] = [postcss];
