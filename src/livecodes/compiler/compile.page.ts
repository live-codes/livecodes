/* eslint-disable import/no-internal-modules */
import { runOutsideWorker as rescript } from '../languages/rescript';
import { runOutsideWorker as mdx } from '../languages/mdx';
import { runOutsideWorker as diagrams } from '../languages/diagrams';

(window as any).compilers = {
  rescript,
  reason: rescript,
  ocaml: rescript,
  mdx,
  diagrams,
};
