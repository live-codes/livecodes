/* eslint-disable import/no-internal-modules */
import { runOutsideWorker as rescript } from '../languages/lang-rescript';
import { runOutsideWorker as graph } from '../languages/lang-graph';

(window as any).compilers = {
  rescript,
  reason: rescript,
  ocaml: rescript,
  graph,
};
