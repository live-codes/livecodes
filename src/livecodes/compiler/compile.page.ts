import { runOutsideWorker as diagrams } from '../languages/diagrams';
import { runOutsideWorker as mdx } from '../languages/mdx';
import { runOutsideWorker as postgresql } from '../languages/postgresql';
import { runOutsideWorker as rescript } from '../languages/rescript';

(window as any).compilers = {
  rescript,
  reason: rescript,
  ocaml: rescript,
  mdx,
  diagrams,
  postgresql,
};
