import { Processors } from '../models';
import { postcss } from './processor-postcss';

export const processors: Processors[] = [postcss];
